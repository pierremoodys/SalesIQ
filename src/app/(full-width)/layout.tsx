import { ReactNode } from "react";
import TopNav from "@/components/layout/TopNav";

interface FullWidthLayoutProps {
  children: ReactNode;
}

export default function FullWidthLayout({ children }: FullWidthLayoutProps) {
  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <TopNav />
      <div
        className="flex-1 min-h-0"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
