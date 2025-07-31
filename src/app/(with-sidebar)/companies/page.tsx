"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  CompanyListItem,
  CompanyListGrid,
  CompanyListTable,
  CompaniesFilter,
} from "@/components/ui";
import { updateCompanyTracking } from "@/lib/api";
import { generateCompanyUrl } from "@/lib/utils";
import { useCompaniesContext } from "@/contexts/CompaniesContext";
import { useCompanies } from "@/hooks/useCompanies";

export default function CompaniesPage() {
  const { searchQuery, setSearchQuery, viewType, setViewType } =
    useCompaniesContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use React Query to fetch companies with filtering
  const {
    data: companiesData,
    isLoading,
    error,
  } = useCompanies({
    search: searchQuery,
    tracked: true, // Only show tracked companies
  });

  const companies = companiesData?.companies || [];

  const handleTrackingChange = async (
    companyId: string,
    isTracked: boolean
  ) => {
    try {
      // Update the JSON file via API
      await updateCompanyTracking(companyId, isTracked);
      // Invalidate and refetch companies data
      queryClient.invalidateQueries({ queryKey: ["companies"] });
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

  // Since we're already filtering in the useCompanies hook, we can use companies directly
  // But keep the search filtering for additional client-side filtering if needed
  const filteredCompanies = companies;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading companies</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Controls */}
      <div className="">
        <CompaniesFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewType={viewType}
          onViewTypeChange={setViewType}
        />
      </div>

      {/* Companies Content */}
      {filteredCompanies.length > 0 ? (
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
