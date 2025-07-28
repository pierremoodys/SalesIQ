import React, { useState, useEffect, useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  useMarkdownReport,
  type MarkdownHeading,
} from "@/hooks/useMarkdownReport";
import { cn } from "@/lib/utils";

interface AccordionTableOfContentsProps {
  companyName?: string;
  markdownPath?: string;
  section?: "report" | "sales-pitch" | "reach-out";
  className?: string;
}

interface AccordionSection {
  h2: MarkdownHeading;
  h3Items: MarkdownHeading[];
}

const AccordionTableOfContents: React.FC<AccordionTableOfContentsProps> = ({
  companyName,
  markdownPath,
  section,
  className,
}) => {
  const { headings, loading } = useMarkdownReport({
    companyName,
    markdownPath,
    section,
  });

  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Group headings into sections (h2 with their h3 children)
  const accordionSections: AccordionSection[] = React.useMemo(() => {
    const filteredHeadings = headings.filter((heading) => heading.level > 1);
    const sections: AccordionSection[] = [];
    let currentSection: AccordionSection | null = null;

    filteredHeadings.forEach((heading) => {
      if (heading.level === 2) {
        // Start new section
        currentSection = {
          h2: heading,
          h3Items: [],
        };
        sections.push(currentSection);
      } else if (heading.level === 3 && currentSection) {
        // Add h3 to current section
        currentSection.h3Items.push(heading);
      }
    });

    return sections;
  }, [headings]);

  // Set up intersection observer for scroll spy
  useEffect(() => {
    if (accordionSections.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Find the report content's scrollable container
    const reportScrollContainer = document
      .querySelector("[data-toc-container]")
      ?.closest(".overflow-y-auto") as HTMLElement | null;

    const observerOptions: IntersectionObserverInit = {
      root: reportScrollContainer,
      rootMargin: "-10% 0px -60% 0px",
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      let bestCandidate = "";
      let bestScore = -1;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          const rect = entry.boundingClientRect;
          const containerHeight =
            reportScrollContainer?.clientHeight || window.innerHeight;
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

      if (!bestCandidate || bestScore < 0.1) {
        if (reportScrollContainer) {
          const containerRect = reportScrollContainer.getBoundingClientRect();
          let closestId = "";
          let closestDistance = Infinity;

          // Check all headings from all sections
          accordionSections.forEach((section) => {
            [section.h2, ...section.h3Items].forEach((heading) => {
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
    accordionSections.forEach((section) => {
      [section.h2, ...section.h3Items].forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [accordionSections, activeId]);

  // Scroll to heading function
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const reportScrollContainer = element.closest(
        ".overflow-y-auto"
      ) as HTMLElement;

      if (reportScrollContainer) {
        const containerRect = reportScrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = reportScrollContainer.scrollTop;
        const targetPosition =
          scrollTop + elementRect.top - containerRect.top - 24;

        reportScrollContainer.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className={cn("h-full flex flex-col", className)}>
        <div className="flex-1 min-h-0">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (accordionSections.length === 0) {
    return null;
  }

  // Check if an h2 section contains the active heading
  const getActiveSection = (section: AccordionSection) => {
    return (
      activeId === section.h2.id ||
      section.h3Items.some((h3) => h3.id === activeId)
    );
  };

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1">
          {accordionSections.map((section, index) => {
            const isActiveSection = getActiveSection(section);

            return (
              <Disclosure
                key={section.h2.id}
                defaultOpen={index === 0}
                as="div"
                className="group"
              >
                {({ open }) => (
                  <>
                    <DisclosureButton
                      className={cn(
                        "flex w-full items-center justify-between text-left text-sm font-medium transition-colors duration-200 hover:text-blue-600 py-2 px-2 rounded cursor-pointer",
                        "text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <span className="block leading-relaxed">
                        {section.h2.text}
                      </span>
                      <ChevronDownIcon
                        className={cn(
                          "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                          open ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </DisclosureButton>

                    {section.h3Items.length > 0 && (
                      <DisclosurePanel
                        className="ml-4 space-y-1 pb-2"
                        transition
                      >
                        {section.h3Items.map((h3Item) => (
                          <button
                            key={h3Item.id}
                            onClick={() => scrollToHeading(h3Item.id)}
                            className={cn(
                              "block w-full text-left text-xs transition-colors duration-200 hover:text-blue-600 py-1.5 px-2 rounded cursor-pointer",
                              activeId === h3Item.id
                                ? "text-blue-600 font-medium bg-blue-50"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            <span className="block leading-relaxed">
                              {h3Item.text}
                            </span>
                          </button>
                        ))}
                      </DisclosurePanel>
                    )}
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccordionTableOfContents;
