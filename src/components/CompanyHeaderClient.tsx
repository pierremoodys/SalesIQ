"use client";

import React from "react";
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
  const { isChatOpen, toggleChat } = useChatStore();

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
