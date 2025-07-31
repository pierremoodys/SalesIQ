import { ReactNode } from "react";
import TopNav from "@/components/layout/TopNav";

interface FullWidthLayoutProps {
  children: ReactNode;
}

export default function FullWidthLayout({ children }: FullWidthLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50">
      <TopNav />
      <div className="flex-1 min-h-0 bg-white">
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
