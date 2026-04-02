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

  const { subcontractor_id } = await request.json();

  // Verify the sub belongs to the user's org
  const { data: sub } = await supabase
    .from("subcontractors")
    .select(
      `
      *,
      organizations!inner (name, owner_id)
    `
    )
    .eq("id", subcontractor_id)
    .single();

  if (!sub) {
    return NextResponse.json(
      { error: "Subcontractor not found" },
      { status: 404 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const org = (sub as any).organizations as {
    name: string;
    owner_id: string;
  };

  if (org.owner_id !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Refresh the magic link token (extend expiry by 30 days)
  await supabase
    .from("subcontractors")
    .update({
      token_expires_at: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    })
    .eq("id", sub.id);

  // In production, this would send an email/SMS via Resend/Twilio.
  // For now, we generate the portal link that would be sent.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const portalUrl = `${request.nextUrl.origin}/portal?token=${(sub as any).magic_link_token}`;

  return NextResponse.json({
    success: true,
    portal_url: portalUrl,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message: `Notification would be sent to ${(sub as any).email}`,
  });
}
