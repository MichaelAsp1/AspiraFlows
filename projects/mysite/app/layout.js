// app/layout.js
import './globals.css'; // if you use Tailwind/global styles
import React from 'react';

export const metadata = {
  title: 'AspiraFlows',
  description: 'AI job-matching and outreach automation to reduce time-to-interview.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
