"use client";

import { createContext, useContext } from "react";

// Create context for companies section
interface CompaniesContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewType: "list" | "grid" | "table";
  setViewType: (type: "list" | "grid" | "table") => void;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(
  undefined
);

export const useCompaniesContext = () => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error("useCompaniesContext must be used within CompaniesLayout");
  }
  return context;
};

export { CompaniesContext };
export type { CompaniesContextType };
