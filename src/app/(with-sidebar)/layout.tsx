import { ReactNode } from "react";
import TopNav from "@/components/layout/TopNav";
import WithSidebarClient from "@/components/layout/WithSidebarClient";

interface WithSidebarLayoutProps {
  children: ReactNode;
}

export default function WithSidebarLayout({
  children,
}: WithSidebarLayoutProps) {
  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <TopNav />
      <WithSidebarClient>{children}</WithSidebarClient>
    </div>
  );
}
