import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://aspiraflows.com"),
  title: { default: "AspiraFlows – Outreach & Analytics Engine", template: "%s | AspiraFlows" },
  description: "Automated outreach, inbox integration, and performance analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
