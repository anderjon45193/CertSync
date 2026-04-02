import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const formData = await request.formData();

  const token = formData.get("token") as string;
  const type = formData.get("type") as string;
  const label = formData.get("label") as string;
  const credentialNumber = formData.get("credential_number") as string | null;
  const expiresAt = formData.get("expires_at") as string | null;
  const document = formData.get("document") as File | null;

  if (!token || !type || !label) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Look up the sub by magic link token
  const { data: sub } = await supabase
    .from("subcontractors")
    .select("id")
    .eq("magic_link_token", token)
    .gte("token_expires_at", new Date().toISOString())
    .single();

  if (!sub) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }

  let documentUrl: string | null = null;

  // Upload document if provided
  if (document && document.size > 0) {
    const ext = document.name.split(".").pop();
    const path = `${sub.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("credentials")
      .upload(path, document);

    if (!uploadError) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("credentials").getPublicUrl(path);
      documentUrl = publicUrl;
    }
  }

  const { data, error } = await supabase
    .from("credentials")
    .insert({
      subcontractor_id: sub.id,
      type,
      label,
      credential_number: credentialNumber || null,
      expires_at: expiresAt || null,
      document_url: documentUrl,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
