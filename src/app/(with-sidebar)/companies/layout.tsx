import { getChatState, toggleChatAction } from "@/lib/chat-server-actions";
import { PageHeader, DropdownMenuItem } from "@/components/pageHeader";
// Icons are now handled via string identifiers
import CompaniesContentClient from "@/components/layout/CompaniesContentClient";
import { ROUTES } from "@/config/routes";

interface CompaniesLayoutProps {
  children: React.ReactNode;
}

export default async function CompaniesLayout({
  children,
}: CompaniesLayoutProps) {
  // Get chat state from server
  const { isChatOpen, chatPanelSize } = await getChatState();

  // Create bound server actions
  const boundToggleChatAction = toggleChatAction.bind(
    null,
    ROUTES.COMPANIES.LIST
  );

  const menuItems: DropdownMenuItem[] = [
    {
      id: "upload",
      label: "Upload",
      icon: "document-arrow-up",
      url: ROUTES.UPLOAD,
    },
    {
      id: "connect",
      label: "Connect",
      icon: "link",
      url: ROUTES.CONNECT,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Server-rendered header */}
      <div className="flex-shrink-0">
        <PageHeader
          variant="simple"
          icon="building-office-2"
          title="Your companies"
          isChatOpen={isChatOpen}
          toggleChatAction={boundToggleChatAction}
          chatConfig={{
            title: "Add or edit companies",
            description:
              "Tell me about the size, industry, location of the companies you want to start tracking.",
            placeholder: "Search for companies",
            icon: "plus",
          }}
          menuItems={menuItems}
        />
      </div>

      {/* Client-side interactive content */}
      <CompaniesContentClient
        initialChatOpen={isChatOpen}
        initialChatSize={chatPanelSize}
      >
        {children}
      </CompaniesContentClient>
    </div>
  );
}
