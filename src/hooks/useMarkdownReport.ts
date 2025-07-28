import { useEffect, useState } from "react";

export interface MarkdownHeading {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3
}

interface UseMarkdownReportReturn {
  markdownContent: string;
  headings: MarkdownHeading[];
  loading: boolean;
  error: string | null;
}

interface UseMarkdownReportOptions {
  companyName?: string;
  markdownPath?: string;
  section?: "report" | "sales-pitch" | "reach-out";
}

export const useMarkdownReport = ({
  companyName = "Volt Motors",
  markdownPath = "/data/company-report-template.md",
  section = "report",
}: UseMarkdownReportOptions = {}): UseMarkdownReportReturn => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [headings, setHeadings] = useState<MarkdownHeading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(markdownPath);

        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.status}`);
        }

        let content = await response.text();

        // Replace company name placeholder if needed
        if (companyName && companyName !== "Volt Motors") {
          content = content.replace(/Volt Motors/g, companyName);
        }

        // Filter content by section
        const filteredContent = filterContentBySection(content, section);

        // Extract headings from filtered content
        const extractedHeadings = extractHeadingsFromMarkdown(filteredContent);

        setMarkdownContent(filteredContent);
        setHeadings(extractedHeadings);
        setError(null);
      } catch (err) {
        console.error("Error fetching markdown:", err);
        setError(err instanceof Error ? err.message : "Failed to load content");
        setMarkdownContent("");
        setHeadings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [markdownPath, companyName, section]);

  return { markdownContent, headings, loading, error };
};

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
    } else if (trimmedLine === "## Sales Pitch") {
      salesPitchStart = index;
    } else if (trimmedLine === "## Reach Out to Client") {
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

  lines.forEach((line, index) => {
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
