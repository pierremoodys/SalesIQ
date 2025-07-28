import React, { useState, useEffect, useRef } from "react";
import {
  useMarkdownReport,
  type MarkdownHeading,
} from "@/hooks/useMarkdownReport";
import { cn } from "@/lib/utils";

interface MarkdownTableOfContentsProps {
  companyName?: string;
  markdownPath?: string;
  className?: string;
}

interface TOCItemProps {
  heading: MarkdownHeading;
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

const MarkdownTableOfContents: React.FC<MarkdownTableOfContentsProps> = ({
  companyName,
  markdownPath,
  className,
}) => {
  const { headings, loading } = useMarkdownReport({
    companyName,
    markdownPath,
  });

  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer for scroll spy
  useEffect(() => {
    if (headings.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Find the report content's scrollable container
    const reportScrollContainer = document
      .querySelector("[data-toc-container]")
      ?.closest(".overflow-y-auto") as HTMLElement | null;

    const observerOptions: IntersectionObserverInit = {
      root: reportScrollContainer, // Use the report's scrollable container as root
      rootMargin: "-10% 0px -60% 0px", // Heading is active when it's in the top 10-40% of container
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Find the heading with the best visibility score
      let bestCandidate = "";
      let bestScore = -1;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          // Calculate a score based on visibility and position
          const rect = entry.boundingClientRect;
          const containerHeight =
            reportScrollContainer?.clientHeight || window.innerHeight;

          // Prefer headings closer to the top of the visible area
          const distanceFromTop = Math.abs(rect.top);
          const visibilityScore = entry.intersectionRatio;
          const positionScore = 1 - distanceFromTop / containerHeight;

          const totalScore = visibilityScore * 0.7 + positionScore * 0.3;

          if (totalScore > bestScore) {
            bestScore = totalScore;
            bestCandidate = entry.target.id;
          }
        }
      });

      // If no heading has good visibility, find the closest one to the container top
      if (!bestCandidate || bestScore < 0.1) {
        if (reportScrollContainer) {
          const containerRect = reportScrollContainer.getBoundingClientRect();
          let closestId = "";
          let closestDistance = Infinity;

          headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              const distance = Math.abs(rect.top - containerRect.top);
              if (
                distance < closestDistance &&
                rect.top >= containerRect.top - 100
              ) {
                closestDistance = distance;
                closestId = heading.id;
              }
            }
          });
          if (closestId) {
            bestCandidate = closestId;
          }
        }
      }
      if (bestCandidate && bestCandidate !== activeId) {
        setActiveId(bestCandidate);
      }
    }, observerOptions);

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings, activeId]);

  // Scroll to heading function
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Find the report content's scrollable container
      const reportScrollContainer = element.closest(
        ".overflow-y-auto"
      ) as HTMLElement;

      if (reportScrollContainer) {
        // Scroll within the report container
        const containerRect = reportScrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = reportScrollContainer.scrollTop;

        // Calculate target position with offset for better UX
        const targetPosition =
          scrollTop + elementRect.top - containerRect.top - 24;

        reportScrollContainer.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth",
        });
      } else {
        // Fallback to element scroll into view
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  const handleItemClick = (id: string) => {
    scrollToHeading(id);
  };

  if (loading) {
    return (
      <div className={cn("h-full flex flex-col", className)}>
        <div className="flex-1 min-h-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Contents
          </h3>
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (headings.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("h-full flex flex-col border-r border-gray-200", className)}
    >
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

export default MarkdownTableOfContents;
