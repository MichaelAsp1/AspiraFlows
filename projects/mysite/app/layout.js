import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import DisableZoom from "./DisableZoom";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://aspiraflows.com"),
  title: {
    default: "AspiraFlows – Outreach & Analytics Engine",
    template: "%s | AspiraFlows",
  },
  description:
    "Automated outreach, inbox integration, and performance analytics.",
  // No icons or manifest here – Next.js will use favicon/icon/apple-icon/manifest files in /app
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full bg-gray-50">
      <body className="relative flex min-h-[100svh] flex-col text-gray-900 overflow-x-hidden">
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
              url: "https://aspiraflows.com",
              logo: "https://aspiraflows.com/logo.png",
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
