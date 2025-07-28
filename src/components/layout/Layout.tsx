"use client";

import { useState, ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import ChatPanel from "./ChatPanel";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50">
      <TopNav onToggleChat={toggleChat} isChatOpen={isChatOpen} />
      <PanelGroup direction="horizontal" autoSaveId="main-layout">
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
        <Panel id="main-content" className="flex flex-col min-w-0">
          <PanelGroup direction="vertical">
            {/* Content Area with Chat */}
            <Panel id="content-area" className="min-h-0">
              <PanelGroup direction="horizontal">
                {/* Main Content */}
                <Panel
                  id="page-content"
                  defaultSize={isChatOpen ? 75 : 100}
                  className="min-w-0 bg-white"
                >
                  <div className="h-full overflow-auto">{children}</div>
                </Panel>

                {/* Chat Panel (conditionally rendered) */}
                {isChatOpen && (
                  <>
                    {/* Resize Handle for Chat */}
                    <PanelResizeHandle />

                    {/* Chat Panel */}
                    <Panel
                      id="chat-panel"
                      defaultSize={25}
                      minSize={20}
                      maxSize={40}
                      className="min-w-0"
                    >
                      <ChatPanel onClose={closeChat} />
                    </Panel>
                  </>
                )}
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
