"use client";

import { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import LeftNav from "@/components/layout/LeftNav";
import TopNav from "@/components/layout/TopNav";

interface WithSidebarLayoutProps {
  children: ReactNode;
}

export default function WithSidebarLayout({
  children,
}: WithSidebarLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50">
      <TopNav />
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
          <Panel id="main-content" className="min-w-0 bg-white">
            <div className="h-full">{children}</div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
