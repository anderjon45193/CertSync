import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Verify the organization belongs to this user
  const { data: org } = await supabase
    .from("organizations")
    .select("id, max_subs, plan")
    .eq("id", body.organization_id)
    .eq("owner_id", user.id)
    .single();

  if (!org) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  // Check sub limit
  const { count } = await supabase
    .from("subcontractors")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", org.id);

  if (count !== null && count >= org.max_subs) {
    return NextResponse.json(
      { error: "Subcontractor limit reached. Please upgrade your plan." },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("subcontractors")
    .insert({
      organization_id: body.organization_id,
      company_name: body.company_name,
      contact_name: body.contact_name,
      email: body.email,
      phone: body.phone || null,
      trade: body.trade,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: org } = await supabase
    .from("organizations")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!org) {
    return NextResponse.json({ error: "No organization" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("subcontractors")
    .select(
      `
      *,
      credentials (*)
    `
    )
    .eq("organization_id", org.id)
    .order("company_name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
