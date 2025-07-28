import { useQuery } from "@tanstack/react-query";

interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

export interface Company {
  id: string;
  uuid: string;
  name: string;
  description: string;
  logoUrl?: string;
  tracked: boolean;
  tags: CompanyTag[];
}

interface CompaniesData {
  companies: Company[];
}

interface CompaniesFilters {
  search?: string;
  tracked?: boolean;
  tags?: string[];
}

// Fetch all companies
async function fetchCompanies(): Promise<CompaniesData> {
  const response = await fetch("/api/companies");
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  return response.json();
}

// Hook for getting all companies
export function useCompanies(filters?: CompaniesFilters) {
  return useQuery({
    queryKey: ["companies", filters],
    queryFn: fetchCompanies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => {
      if (!filters) return data;

      let filteredCompanies = data.companies;

      // Filter by search term
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCompanies = filteredCompanies.filter(
          (company) =>
            company.name.toLowerCase().includes(searchLower) ||
            company.description.toLowerCase().includes(searchLower)
        );
      }

      // Filter by tracked status
      if (filters.tracked !== undefined) {
        filteredCompanies = filteredCompanies.filter(
          (company) => company.tracked === filters.tracked
        );
      }

      // Filter by tags
      if (filters.tags && filters.tags.length > 0) {
        filteredCompanies = filteredCompanies.filter((company) =>
          filters.tags!.some((filterTag) =>
            company.tags.some((tag) => tag.type === filterTag)
          )
        );
      }

      return { ...data, companies: filteredCompanies };
    },
  });
}

// Hook for getting a single company by UUID
export function useCompany(uuid: string) {
  return useQuery({
    queryKey: ["company", uuid],
    queryFn: fetchCompanies,
    enabled: !!uuid,
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => {
      const company = data.companies.find((c) => c.uuid === uuid);
      if (!company) {
        throw new Error(`Company with UUID ${uuid} not found`);
      }
      return company;
    },
  });
}
