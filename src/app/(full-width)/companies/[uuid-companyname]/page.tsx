import React from "react";
import { notFound } from "next/navigation";
import {
  getCompanyByUuid,
  getMarkdownContent,
  getAllCompanyParams,
} from "@/lib/serverData";
import CompanyContentClient from "@/components/CompanyContentClient";
import CompanyHeaderClient from "@/components/CompanyHeaderClient";

interface CompanyPageProps {
  params: Promise<{
    "uuid-companyname": string;
  }>;
}

// Parse UUID and company name from the combined parameter
const parseCompanyParam = (param: string) => {
  // Split by the first hyphen after the UUID pattern
  // UUID format: c-550e8400-e29b-41d4-a716-446655440001
  const match = param.match(/^(c-[a-f0-9-]+)-(.+)$/);

  if (match) {
    return {
      uuid: match[1],
      companyName: match[2]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    };
  }

  // Fallback if parsing fails
  return {
    uuid: null,
    companyName: param
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  };
};

// Generate static params for all companies
export async function generateStaticParams() {
  try {
    const params = await getAllCompanyParams();
    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Server component that fetches data
export default async function CompanyPage({ params }: CompanyPageProps) {
  try {
    // Get UUID from params
    const resolvedParams = await params;
    const { uuid } = parseCompanyParam(resolvedParams["uuid-companyname"]);

    if (!uuid) {
      notFound();
    }

    // Server-side data fetching
    const company = await getCompanyByUuid(uuid);

    if (!company) {
      notFound();
    }

    // Pre-process all markdown content on server
    const [reportContent, salesPitchContent, reachOutContent] =
      await Promise.all([
        getMarkdownContent(company.name, "report"),
        getMarkdownContent(company.name, "sales-pitch"),
        getMarkdownContent(company.name, "reach-out"),
      ]);

    return (
      <div className="h-full flex flex-col">
        {/* Company Header - Client-rendered for chat integration */}
        <div className="flex-shrink-0">
          <CompanyHeaderClient company={company} backUrl="/companies" />
        </div>

        {/* Interactive Content - Client-rendered */}
        <CompanyContentClient
          reportContent={reportContent}
          salesPitchContent={salesPitchContent}
          reachOutContent={reachOutContent}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading company page:", error);
    notFound();
  }
}
