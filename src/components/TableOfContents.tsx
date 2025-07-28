import React from "react";
import { useTableOfContents, TOCHeading } from "@/hooks/useTableOfContents";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  containerSelector?: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  containerSelector = "[data-toc-container]",
  className,
}) => {
  const { headings, activeId, scrollToHeading } =
    useTableOfContents(containerSelector);

  if (headings.length === 0) {
    return null;
  }

  const handleItemClick = (id: string) => {
    scrollToHeading(id);
  };

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <nav className="space-y-1 overflow-y-auto">
          {headings.map((heading) => (
            <TOCItem
              key={heading.id}
              heading={heading}
              isActive={activeId === heading.id}
              onClick={() => handleItemClick(heading.id)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

interface TOCItemProps {
  heading: TOCHeading;
  isActive: boolean;
  onClick: () => void;
}

const TOCItem: React.FC<TOCItemProps> = ({ heading, isActive, onClick }) => {
  const isSubheading = heading.level === 3;

  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full text-left text-sm transition-colors duration-200 hover:text-blue-600 cursor-pointer py-1.5 px-2 rounded",
        isSubheading && "ml-4 text-xs",
        isActive
          ? "text-blue-600 font-medium"
          : "text-gray-600 hover:bg-gray-50"
      )}
    >
      <span className="truncate block">{heading.text}</span>
    </button>
  );
};

export default TableOfContents;
