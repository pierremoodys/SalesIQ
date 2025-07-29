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
      className="text-[64px] font-semibold mb-8 font-financier text-blue-1000"
      {...props}
    >
      {children}
    </h1>
  ),

  // Section headers (h2)
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => (
    <div className="space-y-6 pt-6 border-t border-gray-200 first:pt-0 first:border-t-0">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6" {...props}>
        {children}
      </h2>
    </div>
  ),

  // Subsection headers (h3)
  h3: ({ children, ...props }: React.ComponentProps<"h3">) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900" {...props}>
        {children}
      </h3>
    </div>
  ),

  // Paragraphs
  p: ({ children, ...props }: React.ComponentProps<"p">) => (
    <p className="text-gray-700 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  // Bold text
  strong: ({ children, ...props }: React.ComponentProps<"strong">) => (
    <span className="font-semibold text-gray-900" {...props}>
      {children}
    </span>
  ),

  // Italic text
  em: ({ children, ...props }: React.ComponentProps<"em">) => (
    <span className="text-gray-700 italic" {...props}>
      {children}
    </span>
  ),

  // Unordered lists
  ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
    <ul className="space-y-2 text-gray-700" {...props}>
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
    <ol className="space-y-1 text-gray-700 ml-4" {...props}>
      {children}
    </ol>
  ),

  // Tables
  table: ({ children, ...props }: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-collapse border border-gray-300"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  // Table headers
  th: ({ children, ...props }: React.ComponentProps<"th">) => (
    <th
      className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left"
      {...props}
    >
      {children}
    </th>
  ),

  // Table cells
  td: ({ children, ...props }: React.ComponentProps<"td">) => (
    <td className="border border-gray-300 px-4 py-2" {...props}>
      {children}
    </td>
  ),

  // Code blocks
  code: ({ children, ...props }: React.ComponentProps<"code">) => (
    <code
      className="bg-gray-100 px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic text-gray-600"
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
        className="bg-white border border-gray-200 rounded-lg p-8 max-w-none"
        data-toc-container
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-white border border-gray-200 rounded-lg p-8 max-w-none"
        data-toc-container
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading report: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-8 max-w-none mb-32" data-toc-container>
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
