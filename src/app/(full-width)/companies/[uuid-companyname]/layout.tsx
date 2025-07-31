import { getChatState, toggleChatAction } from "@/lib/chat-server-actions";
import {
  PageHeader,
  DropdownMenuItem,
  ChatConfig,
} from "@/components/pageHeader";
import { ROUTES } from "@/config/routes";
import CompanyDetailContentClient from "@/components/layout/CompanyDetailContentClient";
import { getCompanyByUuid } from "@/lib/serverData";
import { notFound } from "next/navigation";

interface CompanyDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    "uuid-companyname": string;
  }>;
}

// Parse UUID from the combined parameter
const parseCompanyParam = (param: string) => {
  const match = param.match(/^(c-[a-f0-9-]+)-(.+)$/);
  if (match) {
    return { uuid: match[1] };
  }
  return { uuid: null };
};

export default async function CompanyDetailLayout({
  children,
  params,
}: CompanyDetailLayoutProps) {
  // Get company data from params
  const resolvedParams = await params;
  const { uuid } = parseCompanyParam(resolvedParams["uuid-companyname"]);

  if (!uuid) {
    notFound();
  }

  // Fetch company data for header
  const company = await getCompanyByUuid(uuid);
  
  if (!company) {
    notFound();
  }

  // Get chat state from server
  const { isChatOpen, chatPanelSize } = await getChatState();

  // Create bound server action with company-specific route
  const companyRoute = `/companies/${resolvedParams["uuid-companyname"]}`;
  const boundToggleChatAction = toggleChatAction.bind(null, companyRoute);

  const menuItems: DropdownMenuItem[] = [
    {
      id: "edit-company",
      label: "Edit Company",
      icon: "pencil",
    },
    {
      id: "share-company",
      label: "Share Company",
      icon: "share",
    },
    {
      id: "view-reports",
      label: "View Reports",
      icon: "eye",
    },
    {
      id: "delete-company",
      label: "Delete Company",
      icon: "trash",
    },
  ];

  const chatConfig: ChatConfig = {
    title: "Company analysis",
    description: `Ask me anything about ${company.name}'s performance, financials, or market position.`,
    placeholder: `Ask about ${company.name}`,
    icon: "building-office-2",
  };

  return (
    <div className="h-full flex flex-col">
      {/* Server-rendered header */}
      <div className="flex-shrink-0">
        <PageHeader
          variant="company-detail"
          companyInfo={company}
          backButton={{
            url: ROUTES.COMPANIES.LIST,
            label: "Back to companies",
          }}
          isChatOpen={isChatOpen}
          toggleChatAction={boundToggleChatAction}
          chatConfig={chatConfig}
          menuItems={menuItems}
        />
      </div>

      {/* Client-side interactive content */}
      <CompanyDetailContentClient
        initialChatOpen={isChatOpen}
        initialChatSize={chatPanelSize}
        companyName={company.name}
      >
        {children}
      </CompanyDetailContentClient>
    </div>
  );
}