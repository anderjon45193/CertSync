-- CertSync Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Enums
create type credential_status as enum ('valid', 'expiring_soon', 'expired', 'missing');
create type credential_type as enum ('license', 'insurance_coi', 'bond', 'epa_608', 'backflow', 'osha', 'other');
create type trade_type as enum ('plumbing', 'electrical', 'hvac', 'roofing', 'general', 'fire_protection', 'mechanical', 'other');
create type plan_tier as enum ('starter', 'pro', 'business');

-- Organizations (GC companies)
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  plan plan_tier not null default 'starter',
  max_subs integer not null default 15,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subcontractors
create table subcontractors (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  trade trade_type not null default 'other',
  jurisdiction text,
  magic_link_token uuid not null default uuid_generate_v4(),
  token_expires_at timestamptz not null default (now() + interval '30 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Credentials (licenses, COIs, bonds, certifications)
create table credentials (
  id uuid primary key default uuid_generate_v4(),
  subcontractor_id uuid not null references subcontractors(id) on delete cascade,
  type credential_type not null,
  label text not null,
  credential_number text,
  issuing_authority text,
  jurisdiction text,
  issued_at date,
  expires_at date,
  coverage_limit numeric,
  document_url text,
  status credential_status not null default 'missing',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Projects
create table projects (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  address text,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Project-Subcontractor assignments
create table project_subs (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  subcontractor_id uuid not null references subcontractors(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(project_id, subcontractor_id)
);

-- Indexes
create index idx_subcontractors_org on subcontractors(organization_id);
create index idx_subcontractors_token on subcontractors(magic_link_token);
create index idx_credentials_sub on credentials(subcontractor_id);
create index idx_credentials_expires on credentials(expires_at);
create index idx_credentials_status on credentials(status);
create index idx_projects_org on projects(organization_id);
create index idx_project_subs_project on project_subs(project_id);
create index idx_project_subs_sub on project_subs(subcontractor_id);

-- Row Level Security
alter table organizations enable row level security;
alter table subcontractors enable row level security;
alter table credentials enable row level security;
alter table projects enable row level security;
alter table project_subs enable row level security;

-- Policies: Organization owners can manage their data
create policy "Users can view own organizations"
  on organizations for select
  using (auth.uid() = owner_id);

create policy "Users can insert own organizations"
  on organizations for insert
  with check (auth.uid() = owner_id);

create policy "Users can update own organizations"
  on organizations for update
  using (auth.uid() = owner_id);

create policy "Users can view org subcontractors"
  on subcontractors for select
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "Users can manage org subcontractors"
  on subcontractors for all
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "Users can view org credentials"
  on credentials for select
  using (subcontractor_id in (
    select s.id from subcontractors s
    join organizations o on s.organization_id = o.id
    where o.owner_id = auth.uid()
  ));

create policy "Users can manage org credentials"
  on credentials for all
  using (subcontractor_id in (
    select s.id from subcontractors s
    join organizations o on s.organization_id = o.id
    where o.owner_id = auth.uid()
  ));

create policy "Users can view org projects"
  on projects for select
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "Users can manage org projects"
  on projects for all
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "Users can view org project_subs"
  on project_subs for select
  using (project_id in (
    select p.id from projects p
    join organizations o on p.organization_id = o.id
    where o.owner_id = auth.uid()
  ));

create policy "Users can manage org project_subs"
  on project_subs for all
  using (project_id in (
    select p.id from projects p
    join organizations o on p.organization_id = o.id
    where o.owner_id = auth.uid()
  ));

-- Function to auto-update credential status based on expiration
create or replace function update_credential_status()
returns trigger as $$
begin
  if NEW.expires_at is null then
    NEW.status := 'missing';
  elsif NEW.expires_at < current_date then
    NEW.status := 'expired';
  elsif NEW.expires_at < current_date + interval '30 days' then
    NEW.status := 'expiring_soon';
  else
    NEW.status := 'valid';
  end if;
  return NEW;
end;
$$ language plpgsql;

create trigger credential_status_trigger
  before insert or update of expires_at on credentials
  for each row execute function update_credential_status();

-- Function to auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  NEW.updated_at := now();
  return NEW;
end;
$$ language plpgsql;

create trigger organizations_updated_at before update on organizations
  for each row execute function update_updated_at();
create trigger subcontractors_updated_at before update on subcontractors
  for each row execute function update_updated_at();
create trigger credentials_updated_at before update on credentials
  for each row execute function update_updated_at();
create trigger projects_updated_at before update on projects
  for each row execute function update_updated_at();

-- Storage bucket for credential documents
insert into storage.buckets (id, name, public) values ('credentials', 'credentials', false);

create policy "Authenticated users can upload credentials"
  on storage.objects for insert
  with check (bucket_id = 'credentials' and auth.role() = 'authenticated');

create policy "Users can view own org credential files"
  on storage.objects for select
  using (bucket_id = 'credentials' and auth.role() = 'authenticated');
