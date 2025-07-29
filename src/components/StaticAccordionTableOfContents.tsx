import React, { useState, useEffect, useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type {
  ProcessedMarkdownContent,
  MarkdownHeading,
} from "@/lib/serverData";
import { cn } from "@/lib/utils";

interface StaticAccordionTableOfContentsProps {
  content: ProcessedMarkdownContent;
  className?: string;
}

interface AccordionSection {
  h2: MarkdownHeading;
  h3Items: MarkdownHeading[];
}

const StaticAccordionTableOfContents: React.FC<
  StaticAccordionTableOfContentsProps
> = ({ content, className }) => {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  // Group headings into sections (h2 with their h3 children)
  const accordionSections: AccordionSection[] = React.useMemo(() => {
    const filteredHeadings = content.headings.filter(
      (heading) => heading.level > 1
    );
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
  }, [content.headings]);

  // Initialize first section as open and manage auto-expansion
  useEffect(() => {
    if (accordionSections.length > 0) {
      setOpenSections((prev) => {
        const newOpenSections = new Set(prev);

        // Always keep first section open
        newOpenSections.add(accordionSections[0].h2.id);

        // Auto-expand section containing active item (but never close once opened)
        if (activeId) {
          const activeSection = accordionSections.find(
            (section) =>
              section.h2.id === activeId ||
              section.h3Items.some((h3) => h3.id === activeId)
          );
          if (activeSection) {
            newOpenSections.add(activeSection.h2.id);
          }
        }

        return newOpenSections;
      });
    }
  }, [accordionSections, activeId]);

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
      rootMargin: "-20% 0px -70% 0px", // More sensitive detection
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      let bestCandidate = "";
      let bestScore = -1;

      // Priority to entries that are intersecting
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          const rect = entry.boundingClientRect;
          const containerHeight =
            reportScrollContainer?.clientHeight || window.innerHeight;
          const distanceFromTop = Math.abs(rect.top);
          const visibilityScore = entry.intersectionRatio;
          const positionScore = 1 - distanceFromTop / containerHeight;
          const totalScore = visibilityScore * 0.8 + positionScore * 0.2;

          if (totalScore > bestScore) {
            bestScore = totalScore;
            bestCandidate = entry.target.id;
          }
        }
      });

      // Fallback: find closest heading if no intersection
      if (!bestCandidate || bestScore < 0.1) {
        if (reportScrollContainer) {
          const containerRect = reportScrollContainer.getBoundingClientRect();
          let closestId = "";
          let closestDistance = Infinity;

          // Check all headings from all sections (prioritize h3 over h2)
          accordionSections.forEach((section) => {
            // Check h3 items first (more specific)
            section.h3Items.forEach((heading) => {
              const element = document.getElementById(heading.id);
              if (element) {
                const rect = element.getBoundingClientRect();
                const distance = Math.abs(rect.top - (containerRect.top + 50)); // 50px offset from top
                if (
                  distance < closestDistance &&
                  rect.top >= containerRect.top - 200
                ) {
                  closestDistance = distance;
                  closestId = heading.id;
                }
              }
            });

            // Then check h2 if no h3 found
            if (!closestId) {
              const element = document.getElementById(section.h2.id);
              if (element) {
                const rect = element.getBoundingClientRect();
                const distance = Math.abs(rect.top - (containerRect.top + 50));
                if (
                  distance < closestDistance &&
                  rect.top >= containerRect.top - 200
                ) {
                  closestDistance = distance;
                  closestId = section.h2.id;
                }
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

    // Observe all heading elements with more specific targeting
    accordionSections.forEach((section) => {
      // Observe h2 sections
      const h2Element = document.getElementById(section.h2.id);
      if (h2Element && observerRef.current) {
        observerRef.current.observe(h2Element);
      }

      // Observe h3 subsections (these are more important for navigation)
      section.h3Items.forEach((heading) => {
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

  if (accordionSections.length === 0) {
    return null;
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1">
          {accordionSections.map((section) => {
            const isOpen = openSections.has(section.h2.id);

            return (
              <Disclosure
                key={`${section.h2.id}-${isOpen}`}
                defaultOpen={isOpen}
                as="div"
                className="group"
              >
                {({ open }) => (
                  <>
                    <DisclosureButton
                      onClick={(e) => {
                        // Prevent closing if section is already marked as open
                        if (isOpen) {
                          e.preventDefault();
                          e.stopPropagation();
                        } else {
                          // Mark this section as opened when clicked
                          setTimeout(() => {
                            const newOpenSections = new Set(openSections);
                            newOpenSections.add(section.h2.id);
                            setOpenSections(newOpenSections);
                          }, 0);
                        }
                      }}
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
                          open || isOpen ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </DisclosureButton>

                    {section.h3Items.length > 0 && (
                      <DisclosurePanel
                        className="ml-4 space-y-1 pb-2"
                        static={isOpen}
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

export default StaticAccordionTableOfContents;
