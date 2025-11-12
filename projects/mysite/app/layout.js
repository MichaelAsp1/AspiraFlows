import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import DisableZoom from "./DisableZoom";

export const metadata = {
  metadataBase: new URL("https://aspiraflows.com"),
  title: {
    default: "AspiraFlows – Outreach & Analytics Engine",
    template: "%s | AspiraFlows",
  },
  description: "Automated outreach, inbox integration, and performance analytics.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,      // ← add this
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full bg-gray-50">
      <body className="relative flex min-h-[100svh] flex-col text-gray-900 overflow-x-hidden">
        {/* full-bleed backgrounds to avoid white gutters */}
        <div className="pointer-events-none fixed inset-0 -z-30 bg-gray-50" />
        <div className="pointer-events-none fixed inset-0 -z-30 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
        <div className="pointer-events-none fixed -z-40 top-1/3 left-1/4 h-[200svh] w-[200svw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-indigo-300/20 via-purple-200/10 to-blue-300/20 blur-[200px]" />

        <DisableZoom />   {/* ← add this */}

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
