// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import DisableZoom from "./DisableZoom";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aspiraflows.com"),
  title: {
    default: "AspiraFlows – AI Job Search Engine",
    template: "%s | AspiraFlows",
  },
  description:
    "The AI job search engine that actually gets replies. Find the right roles, reach real decision-makers, and get more interviews with personalised outreach sequences.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "AspiraFlows – AI Job Search Engine",
    description:
      "Find the right roles, reach real decision-makers, and get more interviews with the AI job search engine that actually gets replies.",
    url: "/",
    siteName: "AspiraFlows",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AspiraFlows – AI Job Search Engine",
    description:
      "AI-powered job discovery and outreach that actually gets replies.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full bg-gray-50">
      <body className="relative flex min-h-[100svh] flex-col text-gray-900">
        {/* ---- Structured data for Google (logo) ---- */}
        <Script
          id="aspiraflows-org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AspiraFlows",
              url: "https://www.aspiraflows.com",
              logo: "https://www.aspiraflows.com/logo.png",
            }),
          }}
        />

        {/* full-bleed backgrounds to avoid white gutters */}
        <div className="pointer-events-none fixed inset-0 -z-30 bg-gray-50" />
        <div className="pointer-events-none fixed inset-0 -z-30 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
        {/* lighter, cheaper glow */}
        <div className="pointer-events-none fixed inset-0 -z-40 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.25),transparent_60%)]" />

        <DisableZoom />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
