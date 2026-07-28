import type { Metadata } from "next";
import AuthProvider from "@/lib/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Helping Hands Team Trust",
    template: "%s | Helping Hands Team Trust",
  },
  description:
    "Helping Hands Team Trust — Empowering underprivileged students through education, scholarships, and community support in Mangalore, Karnataka.",
  keywords: [
    "Helping Hands",
    "Trust",
    "Charity",
    "Education",
    "Scholarships",
    "Mangalore",
    "Karnataka",
    "NGO",
  ],
  openGraph: {
    title: "Helping Hands Team Trust",
    description:
      "Empowering underprivileged students through education and community support.",
    type: "website",
    locale: "en_IN",
    siteName: "Helping Hands Team Trust",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
