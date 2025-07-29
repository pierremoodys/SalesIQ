import fs from "fs";
import path from "path";

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

export interface MarkdownHeading {
  id: string;
  text: string;
  level: number;
}

export interface ProcessedMarkdownContent {
  content: string;
  headings: MarkdownHeading[];
}

export async function getCompaniesFromFile(): Promise<Company[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "companies.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data: CompaniesData = JSON.parse(fileContent);
    return data.companies;
  } catch (error) {
    console.error("Error reading companies from file:", error);
    throw error;
  }
}

export async function getCompanyByUuid(uuid: string): Promise<Company | null> {
  try {
    const companies = await getCompaniesFromFile();
    return companies.find((company) => company.uuid === uuid) || null;
  } catch (error) {
    console.error("Error finding company by UUID:", error);
    return null;
  }
}

export async function getMarkdownContent(
  companyName: string = "Volt Motors",
  section: "report" | "sales-pitch" | "reach-out" = "report",
  markdownPath: string = "/data/company-report-template.md"
): Promise<ProcessedMarkdownContent> {
  try {
    const filePath = path.join(process.cwd(), "public", markdownPath);
    let content = fs.readFileSync(filePath, "utf8");

    // Replace company name placeholder
    if (companyName !== "Volt Motors") {
      content = content.replace(/Volt Motors/g, companyName);
    }

    // Filter content by section
    const filteredContent = filterContentBySection(content, section);

    // Extract headings
    const headings = extractHeadingsFromMarkdown(filteredContent);

    return {
      content: filteredContent,
      headings,
    };
  } catch (error) {
    console.error("Error reading markdown content:", error);
    throw error;
  }
}

// Helper function to generate static params for all companies
export async function getAllCompanyParams() {
  try {
    const companies = await getCompaniesFromFile();
    return companies.map((company) => ({
      "uuid-companyname": `${company.uuid}-${company.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    }));
  } catch (error) {
    console.error("Error generating company params:", error);
    return [];
  }
}

// Filter markdown content by section
function filterContentBySection(
  content: string,
  section: "report" | "sales-pitch" | "reach-out"
): string {
  const lines = content.split("\n");

  // Find section boundaries
  let reportStart = -1;
  let salesPitchStart = -1;
  let reachOutStart = -1;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === "# Report") {
      reportStart = index;
    } else if (trimmedLine === "# Sales Pitch") {
      salesPitchStart = index;
    } else if (trimmedLine === "# Reach Out to Client") {
      reachOutStart = index;
    }
  });

  // Extract the appropriate section
  let startIndex: number;
  let endIndex: number;

  switch (section) {
    case "report":
      startIndex = reportStart;
      endIndex = salesPitchStart !== -1 ? salesPitchStart : lines.length;
      break;
    case "sales-pitch":
      startIndex = salesPitchStart;
      endIndex = reachOutStart !== -1 ? reachOutStart : lines.length;
      break;
    case "reach-out":
      startIndex = reachOutStart;
      endIndex = lines.length;
      break;
    default:
      startIndex = 0;
      endIndex = lines.length;
  }

  // Return the filtered section
  if (startIndex === -1) {
    return ""; // Section not found
  }

  return lines.slice(startIndex, endIndex).join("\n");
}

// Helper function to extract headings from markdown content
function extractHeadingsFromMarkdown(content: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const lines = content.split("\n");

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // Match h1 (#), h2 (##), and h3 (###) headings
    const h1Match = trimmedLine.match(/^#\s+(.+)$/);
    const h2Match = trimmedLine.match(/^##\s+(.+)$/);
    const h3Match = trimmedLine.match(/^###\s+(.+)$/);

    if (h1Match) {
      const text = h1Match[1].trim();
      const id = generateSlug(text);
      headings.push({
        id,
        text,
        level: 1,
      });
    } else if (h2Match) {
      const text = h2Match[1].trim();
      const id = generateSlug(text);
      headings.push({
        id,
        text,
        level: 2,
      });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      const id = generateSlug(text);
      headings.push({
        id,
        text,
        level: 3,
      });
    }
  });

  return headings;
}

// Generate slug IDs similar to rehype-slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}
