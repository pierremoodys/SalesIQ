"use client";

import { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import LeftNav from "@/components/layout/LeftNav";

interface WithSidebarClientProps {
  children: ReactNode;
}

export default function WithSidebarClient({
  children,
}: WithSidebarClientProps) {
  return (
    <div className="flex-1 min-h-0">
      <PanelGroup
        direction="horizontal"
        autoSaveId="with-sidebar-layout"
        className="h-full"
      >
        {/* Left Navigation Sidebar */}
        <Panel
          id="left-nav"
          defaultSize={16}
          minSize={12}
          maxSize={25}
          className="min-w-0"
        >
          <LeftNav />
        </Panel>

        {/* Resize Handle for Left Nav */}
        <PanelResizeHandle />

        {/* Main Content Area */}
        <Panel
          id="main-content"
          className="min-w-0"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div className="h-full">{children}</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
