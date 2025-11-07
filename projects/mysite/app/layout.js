import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://aspiraflows.com"),
  title: {
    default: "AspiraFlows – Outreach & Analytics Engine",
    template: "%s | AspiraFlows",
  },
  description: "Automated outreach, inbox integration, and performance analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="relative flex flex-col min-h-screen text-gray-900 bg-gray-50 overflow-x-hidden">
        {/* 🌤️ Ambient background layers (subtle, professional) */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
        <div className="pointer-events-none absolute -z-30 top-[35%] left-[25%] h-[80rem] w-[80rem] bg-gradient-to-tr from-indigo-300/20 via-purple-200/10 to-blue-300/20 blur-[160px]" />

        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
