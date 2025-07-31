"use client";

import React, { useEffect } from "react";
import { CompaniesPageHeader } from "@/components/pageHeader";
import { useChatStore } from "@/stores/chatStore";
import type { Company } from "@/lib/serverData";

interface CompanyHeaderClientProps {
  company: Company;
  backUrl?: string;
}

export default function CompanyHeaderClient({
  company,
  backUrl = "/companies",
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

  return (
    <CompaniesPageHeader
      variant="company-detail"
      company={company}
      backUrl={backUrl}
      onToggleChat={toggleChat}
      isChatOpen={isChatOpen}
    />
  );
}
