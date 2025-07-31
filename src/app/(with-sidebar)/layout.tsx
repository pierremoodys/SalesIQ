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
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50">
      <TopNav />
      <WithSidebarClient>{children}</WithSidebarClient>
    </div>
  );
}
