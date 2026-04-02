"use client";

import { useState } from "react";

export function RequestDocsButton({
  subId,
  subName,
}: {
  subId: string;
  subName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleRequest() {
    setLoading(true);
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subcontractor_id: subId }),
    });

    if (res.ok) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleRequest}
      disabled={loading || sent}
      className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400"
    >
      {sent ? "Sent!" : loading ? "Sending..." : "Request Docs"}
    </button>
  );
}
