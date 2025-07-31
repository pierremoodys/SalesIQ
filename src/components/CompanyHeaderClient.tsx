"use client";

import React, { useEffect } from "react";
import {
  PageHeader,
  DropdownMenuItem,
  ChatConfig,
} from "@/components/pageHeader";
import {
  BuildingOffice2Icon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useChatStore } from "@/stores/chatStore";
import type { Company } from "@/lib/serverData";
import { ROUTES } from "@/config/routes";

interface CompanyHeaderClientProps {
  company: Company;
  backUrl?: string;
}

export default function CompanyHeaderClient({
  company,
  backUrl = ROUTES.COMPANIES.LIST,
}: CompanyHeaderClientProps) {
  const { isChatOpen, toggleChat, setChatAvailable } = useChatStore();

  // Set chat availability for company detail page with company context
  useEffect(() => {
    setChatAvailable(true, {
      page: "company-detail",
      companyName: company.name,
      companyId: company.id,
    });

    // Cleanup: disable chat when leaving this component
    return () => setChatAvailable(false);
  }, [setChatAvailable, company.name, company.id]);

  const menuItems: DropdownMenuItem[] = [
    {
      id: "edit-company",
      label: "Edit Company",
      icon: PencilIcon,
      onClick: () => console.log("Edit company:", company.name),
    },
    {
      id: "share-company",
      label: "Share Company",
      icon: ShareIcon,
      onClick: () => console.log("Share company:", company.name),
    },
    {
      id: "view-reports",
      label: "View Reports",
      icon: EyeIcon,
      onClick: () => console.log("View reports for:", company.name),
    },
    {
      id: "delete-company",
      label: "Delete Company",
      icon: TrashIcon,
      onClick: () => console.log("Delete company:", company.name),
    },
  ];

  const chatConfig: ChatConfig = {
    title: "Company analysis",
    description: `Ask me anything about ${company.name}'s performance, financials, or market position.`,
    placeholder: `Ask about ${company.name}`,
    icon: BuildingOffice2Icon,
  };

  return (
    <PageHeader
      variant="company-detail"
      companyInfo={company}
      backButton={{
        url: backUrl,
        label: "Back to companies",
      }}
      onToggleChat={toggleChat}
      isChatOpen={isChatOpen}
      chatConfig={chatConfig}
      menuItems={menuItems}
    />
  );
}
