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
          <MagnifyingGlassIcon
            className="h-5 w-5"
            style={{ color: "var(--color-text-muted)" }}
          />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search companies..."
          className="block w-full pl-10 pr-3 py-2 border-b text-sm focus:outline-none transition-colors duration-200"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "transparent",
            color: "var(--color-text)",
          }}
        />
      </div>

      {/* View Switcher - Right Side */}
      <div
        className="ml-6 border rounded-lg overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <RadioGroup
          value={viewType}
          onChange={onViewTypeChange}
          className="flex space-x-1"
        >
          {viewOptions.map((option) => (
            <RadioGroupOption
              key={option.value}
              value={option.value}
              className="relative flex items-center justify-center px-3 py-2 cursor-pointer transition-all duration-200 focus:outline-none"
            >
              {({ checked }) => (
                <div
                  style={{
                    backgroundColor: checked
                      ? "var(--color-secondary)"
                      : "var(--color-surface)",
                    color: checked
                      ? "var(--color-text-inverse)"
                      : "var(--color-text)",
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <option.icon
                    className="w-5 h-5"
                    style={{
                      color: checked
                        ? "var(--color-text-inverse)"
                        : "var(--color-text-muted)",
                    }}
                  />
                  <span className="sr-only">{option.label}</span>
                </div>
              )}
            </RadioGroupOption>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default CompaniesFilter;
