import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertSync - Credential Compliance Autopilot",
  description:
    "Automated credential tracking so contractors never put an unlicensed sub on a job site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
