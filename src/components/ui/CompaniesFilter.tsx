"use client";

import React from "react";
import { RadioGroup, RadioGroupOption } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ListBulletIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type ViewType = "list" | "grid" | "table";

interface CompaniesFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewType: ViewType;
  onViewTypeChange: (viewType: ViewType) => void;
  className?: string;
}

const viewOptions = [
  {
    value: "list" as const,
    label: "List view",
    icon: ListBulletIcon,
  },
  {
    value: "grid" as const,
    label: "Grid view",
    icon: Squares2X2Icon,
  },
  {
    value: "table" as const,
    label: "Table view",
    icon: TableCellsIcon,
  },
];

const CompaniesFilter: React.FC<CompaniesFilterProps> = ({
  searchQuery,
  onSearchChange,
  viewType,
  onViewTypeChange,
  className = "",
}) => {
  return (
    <div
      className={cn("flex justify-between items-center py-4 px-8", className)}
    >
      {/* Search Input - Left Side */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search companies..."
          className="
            block w-full pl-10 pr-3 py-2 
            border border-gray-300 rounded-lg 
             text-sm
            placeholder-gray-500 
            focus:outline-none focus:ring-2 focus:ring-bright-blue-700 focus:border-bright-blue-700
            transition-colors duration-200
          "
        />
      </div>

      {/* View Switcher - Right Side */}
      <div className="ml-6 border border-gray-300 rounded-lg overflow-hidden">
        <RadioGroup
          value={viewType}
          onChange={onViewTypeChange}
          className="flex space-x-1"
        >
          {viewOptions.map((option) => (
            <RadioGroupOption
              key={option.value}
              value={option.value}
              className={({ checked }) =>
                cn(
                  "relative flex items-center justify-center px-3 py-2 cursor-pointer transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-bright-blue-700 focus:ring-offset-2",
                  checked
                    ? "bg-bright-blue-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                )
              }
            >
              {({ checked }) => (
                <>
                  <option.icon
                    className={cn(
                      "w-5 h-5",
                      checked ? "text-white" : "text-gray-600"
                    )}
                  />
                  <span className="sr-only">{option.label}</span>
                </>
              )}
            </RadioGroupOption>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default CompaniesFilter;
