import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Organization — Ivinco",
  description: "Virtual organization structure, departments, and board of directors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
