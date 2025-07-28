"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CompanyListItem,
  CompanyListGrid,
  CompanyListTable,
} from "@/components/ui";
import { fetchCompanies, updateCompanyTracking } from "@/lib/api";
import { generateCompanyUrl } from "@/lib/utils";
import { useCompaniesContext } from "./layout";

interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

interface Company {
  id: string;
  uuid: string;
  name: string;
  description: string;
  logoUrl?: string;
  tracked: boolean;
  tags: CompanyTag[];
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, viewType } = useCompaniesContext();
  const router = useRouter();

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const companiesData = await fetchCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Failed to load companies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const handleTrackingChange = async (
    companyId: string,
    isTracked: boolean
  ) => {
    try {
      // Update the JSON file via API
      await updateCompanyTracking(companyId, isTracked);

      // Update local state
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === companyId
            ? { ...company, tracked: isTracked }
            : company
        )
      );
    } catch (error) {
      console.error("Failed to update company tracking:", error);
      // You might want to show a toast or error message here
    }
  };

  const handleCompanyClick = (companyId: string) => {
    // Find the company by ID to get both UUID and name for URL generation
    const company = companies.find((c) => c.id === companyId);

    if (company) {
      const companyUrl = generateCompanyUrl(company.uuid, company.name);
      router.push(companyUrl);
    } else {
      console.error("Company not found:", companyId);
    }
  };

  // Filter companies based on search query
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      searchQuery === "" ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isTracked = company.tracked;

    return matchesSearch && isTracked;
  });

  return (
    <div>
      {/* Companies Content */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading companies...</p>
        </div>
      ) : filteredCompanies.length > 0 ? (
        <>
          {/* List View */}
          {viewType === "list" && (
            <div className="p-4">
              <div className="overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {filteredCompanies.map((company) => (
                    <CompanyListItem
                      key={company.uuid}
                      company={company}
                      isTracked={company.tracked}
                      onTrackingChange={handleTrackingChange}
                      onClick={handleCompanyClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewType === "grid" && (
            <CompanyListGrid
              companies={filteredCompanies}
              onTrackingChange={handleTrackingChange}
              onClick={handleCompanyClick}
            />
          )}

          {/* Table View */}
          {viewType === "table" && (
            <div className="p-4">
              <CompanyListTable
                companies={filteredCompanies}
                onTrackingChange={handleTrackingChange}
                onClick={handleCompanyClick}
              />
            </div>
          )}
        </>
      ) : searchQuery ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No companies found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your search or add more companies to your tracking
            list.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No companies are currently being tracked.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Add companies to your tracking list to see them here.
          </p>
        </div>
      )}
    </div>
  );
}
