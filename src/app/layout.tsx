import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/layout";

export const metadata: Metadata = {
  title: "SalesIQ - Moody's Analytics",
  description: "Sales Intelligence and Credit Analytics Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
