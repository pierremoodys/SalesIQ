import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a URL-friendly string from a company name
 * @param name - The company name
 * @returns URL-friendly string with spaces replaced by hyphens and lowercase
 */
export function slugifyCompanyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Generates a company page URL in the format /companies/uuid-companyname
 * @param uuid - The company UUID
 * @param name - The company name
 * @returns The formatted URL path
 */
export function generateCompanyUrl(uuid: string, name: string): string {
  const slugifiedName = slugifyCompanyName(name);
  return `/companies/${uuid}-${slugifiedName}`;
}
