export type CredentialStatus = "valid" | "expiring_soon" | "expired" | "missing";

export type CredentialType =
  | "license"
  | "insurance_coi"
  | "bond"
  | "epa_608"
  | "backflow"
  | "osha"
  | "other";

export type TradeType =
  | "plumbing"
  | "electrical"
  | "hvac"
  | "roofing"
  | "general"
  | "fire_protection"
  | "mechanical"
  | "other";

export type PlanTier = "starter" | "pro" | "business";

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          owner_id: string;
          plan: PlanTier;
          max_subs: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          owner_id: string;
          plan?: PlanTier;
          max_subs?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          owner_id?: string;
          plan?: PlanTier;
          max_subs?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subcontractors: {
        Row: {
          id: string;
          organization_id: string;
          company_name: string;
          contact_name: string;
          email: string;
          phone: string | null;
          trade: TradeType;
          jurisdiction: string | null;
          magic_link_token: string;
          token_expires_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          company_name: string;
          contact_name: string;
          email: string;
          phone?: string | null;
          trade?: TradeType;
          jurisdiction?: string | null;
          magic_link_token?: string;
          token_expires_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          company_name?: string;
          contact_name?: string;
          email?: string;
          phone?: string | null;
          trade?: TradeType;
          jurisdiction?: string | null;
          magic_link_token?: string;
          token_expires_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subcontractors_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      credentials: {
        Row: {
          id: string;
          subcontractor_id: string;
          type: CredentialType;
          label: string;
          credential_number: string | null;
          issuing_authority: string | null;
          jurisdiction: string | null;
          issued_at: string | null;
          expires_at: string | null;
          coverage_limit: number | null;
          document_url: string | null;
          status: CredentialStatus;
          verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subcontractor_id: string;
          type: CredentialType;
          label: string;
          credential_number?: string | null;
          issuing_authority?: string | null;
          jurisdiction?: string | null;
          issued_at?: string | null;
          expires_at?: string | null;
          coverage_limit?: number | null;
          document_url?: string | null;
          status?: CredentialStatus;
          verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subcontractor_id?: string;
          type?: CredentialType;
          label?: string;
          credential_number?: string | null;
          issuing_authority?: string | null;
          jurisdiction?: string | null;
          issued_at?: string | null;
          expires_at?: string | null;
          coverage_limit?: number | null;
          document_url?: string | null;
          status?: CredentialStatus;
          verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "credentials_subcontractor_id_fkey";
            columns: ["subcontractor_id"];
            isOneToOne: false;
            referencedRelation: "subcontractors";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          address: string | null;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          address?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          address?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      project_subs: {
        Row: {
          id: string;
          project_id: string;
          subcontractor_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          subcontractor_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          subcontractor_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_subs_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_subs_subcontractor_id_fkey";
            columns: ["subcontractor_id"];
            isOneToOne: false;
            referencedRelation: "subcontractors";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      credential_status: CredentialStatus;
      credential_type: CredentialType;
      trade_type: TradeType;
      plan_tier: PlanTier;
    };
  };
}
