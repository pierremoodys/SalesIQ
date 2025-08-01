import React from "react";
import { getChatState, toggleChatAction } from "@/lib/chat-server-actions";
import {
  PageHeader,
  DropdownMenuItem,
  ChatConfig,
} from "@/components/pageHeader";
import { ROUTES } from "@/config/routes";
import UploadContentClient from "@/components/layout/UploadContentClient";

interface UploadLayoutProps {
  children: React.ReactNode;
}

export default async function UploadLayout({ children }: UploadLayoutProps) {
  // Get chat state from server
  const { isChatOpen, chatPanelSize } = await getChatState();

  console.log("🏗️ UploadLayout: isChatOpen =", isChatOpen);

  // Create bound server action
  const boundToggleChatAction = toggleChatAction.bind(null, ROUTES.UPLOAD);

  const menuItems: DropdownMenuItem[] = [
    {
      id: "upload-help",
      label: "Upload Help",
      icon: "question-mark-circle",
    },
    {
      id: "clear-all",
      label: "Clear All Files",
      icon: "trash",
    },
  ];

  const chatConfig: ChatConfig = {
    title: "Upload assistant",
    description:
      "I can help you with file uploads, processing, or troubleshooting upload issues.",
    placeholder: "Ask about uploading files",
    icon: "document-arrow-up",
  };

  return (
    <div className="h-full flex flex-col">
      {/* Server-rendered header */}
      <div className="flex-shrink-0">
        <PageHeader
          variant="upload"
          title="Upload file"
          backButton={{
            url: ROUTES.HOME,
            label: "Back",
          }}
          isChatOpen={isChatOpen}
          toggleChatAction={boundToggleChatAction}
          chatConfig={chatConfig}
          menuItems={menuItems}
        />
      </div>

      {/* Client-side interactive content */}
      <UploadContentClient
        initialChatOpen={isChatOpen}
        initialChatSize={chatPanelSize}
      >
        {children}
      </UploadContentClient>
    </div>
  );
}
