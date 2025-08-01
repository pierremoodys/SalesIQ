import { getChatState, toggleChatAction } from "@/lib/chat-server-actions";
import { PageHeader, DropdownMenuItem } from "@/components/pageHeader";
import { ROUTES } from "@/config/routes";
import NotificationsContentClient from "@/components/layout/NotificationsContentClient";

interface NotificationsLayoutProps {
  children: React.ReactNode;
}

export default async function NotificationsLayout({
  children,
}: NotificationsLayoutProps) {
  // Get chat state from server
  const { isChatOpen, chatPanelSize } = await getChatState();

  // Create bound server action
  const boundToggleChatAction = toggleChatAction.bind(
    null,
    ROUTES.NOTIFICATIONS
  );

  const menuItems: DropdownMenuItem[] = [
    {
      id: "mark-all-read",
      label: "Mark All as Read",
      icon: "check",
    },
    {
      id: "notification-settings",
      label: "Notification Settings",
      icon: "cog",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Server-rendered header */}
      <div className="flex-shrink-0">
        <PageHeader
          variant="simple"
          icon="bell"
          title="Notifications"
          isChatOpen={isChatOpen}
          toggleChatAction={boundToggleChatAction}
          chatConfig={{
            title: "Research notifications",
            description:
              "You can research notifications, trends, and get insights about company activities.",
            placeholder: "Ask about notifications",
            icon: "document-text",
          }}
          menuItems={menuItems}
        />
      </div>

      {/* Client-side interactive content */}
      <NotificationsContentClient
        initialChatOpen={isChatOpen}
        initialChatSize={chatPanelSize}
      >
        {children}
      </NotificationsContentClient>
    </div>
  );
}
