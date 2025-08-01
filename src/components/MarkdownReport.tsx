import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useMarkdownReport } from "@/hooks/useMarkdownReport";

interface MarkdownReportProps {
  companyName?: string;
  markdownPath?: string;
  section?: "report" | "sales-pitch" | "reach-out";
}

// Custom component mappings for styled rendering
const components = {
  // Main title (h1)
  h1: ({ children, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className="text-[64px] font-semibold mb-8 font-financier"
      style={{ color: "var(--color-text)" }}
      {...props}
    >
      {children}
    </h1>
  ),

  // Section headers (h2)
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => (
    <div
      className="space-y-6 pt-6 border-t first:pt-0 first:border-t-0"
      style={{ borderColor: "var(--color-border)" }}
    >
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ color: "var(--color-text)" }}
        {...props}
      >
        {children}
      </h2>
    </div>
  ),

  // Subsection headers (h3)
  h3: ({ children, ...props }: React.ComponentProps<"h3">) => (
    <div className="space-y-4">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--color-text)" }}
        {...props}
      >
        {children}
      </h3>
    </div>
  ),

  // Paragraphs
  p: ({ children, ...props }: React.ComponentProps<"p">) => (
    <p
      className="leading-relaxed"
      style={{ color: "var(--color-text)" }}
      {...props}
    >
      {children}
    </p>
  ),

  // Bold text
  strong: ({ children, ...props }: React.ComponentProps<"strong">) => (
    <span
      className="font-semibold"
      style={{ color: "var(--color-text)" }}
      {...props}
    >
      {children}
    </span>
  ),

  // Italic text
  em: ({ children, ...props }: React.ComponentProps<"em">) => (
    <span className="italic" style={{ color: "var(--color-text)" }} {...props}>
      {children}
    </span>
  ),

  // Unordered lists
  ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
    <ul className="space-y-2" style={{ color: "var(--color-text)" }} {...props}>
      {children}
    </ul>
  ),

  // List items
  li: ({ children, ...props }: React.ComponentProps<"li">) => (
    <li className="flex items-start" {...props}>
      <span className="mr-2">•</span>
      <span>{children}</span>
    </li>
  ),

  // Ordered lists
  ol: ({ children, ...props }: React.ComponentProps<"ol">) => (
    <ol
      className="space-y-1 ml-4"
      style={{ color: "var(--color-text)" }}
      {...props}
    >
      {children}
    </ol>
  ),

  // Tables
  table: ({ children, ...props }: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-collapse border"
        style={{ borderColor: "var(--color-border)" }}
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  // Table headers
  th: ({ children, ...props }: React.ComponentProps<"th">) => (
    <th
      className="border px-4 py-2 font-semibold text-left"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-background-secondary)",
        color: "var(--color-text)",
      }}
      {...props}
    >
      {children}
    </th>
  ),

  // Table cells
  td: ({ children, ...props }: React.ComponentProps<"td">) => (
    <td
      className="border px-4 py-2"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text)",
      }}
      {...props}
    >
      {children}
    </td>
  ),

  // Code blocks
  code: ({ children, ...props }: React.ComponentProps<"code">) => (
    <code
      className="px-2 py-1 rounded text-sm font-mono"
      style={{
        backgroundColor: "var(--color-background-secondary)",
        color: "var(--color-text)",
      }}
      {...props}
    >
      {children}
    </code>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 pl-4 italic"
      style={{
        borderColor: "var(--color)",
        color: "var(--color-text-muted)",
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),
};

const MarkdownReport: React.FC<MarkdownReportProps> = ({
  companyName,
  markdownPath,
  section,
}) => {
  const { markdownContent, loading, error } = useMarkdownReport({
    companyName,
    markdownPath,
    section,
  });

  if (loading) {
    return (
      <div
        className="border rounded-lg p-8 max-w-none"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
        data-toc-container
      >
        <div className="flex items-center justify-center h-64">
          <p style={{ color: "var(--color-text-muted)" }}>Loading report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="border rounded-lg p-8 max-w-none"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
        data-toc-container
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading report: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-8 max-w-none mb-32"
      style={{ backgroundColor: "var(--color-surface)" }}
      data-toc-container
    >
      <div className="space-y-8">
        <ReactMarkdown
          components={components}
          rehypePlugins={[rehypeSlug, rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownReport;
