import { useEffect, useState, useRef } from "react";

export interface TOCHeading {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3
}

export const useTableOfContents = (
  containerSelector: string = "[data-toc-container]"
) => {
  const [headings, setHeadings] = useState<TOCHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from the container
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headingElements = container.querySelectorAll("h2, h3");
    const extractedHeadings: TOCHeading[] = Array.from(headingElements).map(
      (element) => {
        const id =
          element.id || `heading-${Math.random().toString(36).substr(2, 9)}`;
        if (!element.id) {
          element.id = id; // Assign ID if not present
        }

        return {
          id,
          text: element.textContent || "",
          level: parseInt(element.tagName[1]), // H2 -> 2, H3 -> 3
        };
      }
    );

    setHeadings(extractedHeadings);
  }, [containerSelector]);

  // Set up intersection observer
  useEffect(() => {
    if (headings.length === 0) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Find the scrollable container - look for the report content's scrollable container
    const tocContainer = document.querySelector(containerSelector);
    const reportScrollContainer = tocContainer?.closest(
      ".overflow-y-auto"
    ) as HTMLElement | null;

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
  }, [headings, containerSelector, activeId]);

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

  return {
    headings,
    activeId,
    scrollToHeading,
  };
};
