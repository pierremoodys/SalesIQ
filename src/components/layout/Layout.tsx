"use client";

import { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50">
      <TopNav />
      <div className="flex-1 min-h-0">
        <PanelGroup
          direction="horizontal"
          autoSaveId="main-layout"
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
