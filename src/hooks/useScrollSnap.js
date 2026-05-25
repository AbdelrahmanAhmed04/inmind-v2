import { useEffect, useRef } from "react";

export const useScrollSnap = () => {
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent rapid consecutive scrolls
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const sections = document.querySelectorAll(".section");
      if (sections.length === 0) return;

      const currentScroll = window.scrollY;
      const direction = e.deltaY > 0 ? 1 : -1; // 1 = down, -1 = up

      // Find current section index based on scroll position
      let currentSectionIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        if (currentScroll >= sections[i].offsetTop - 50) {
          currentSectionIndex = i;
        } else {
          break;
        }
      }

      // Calculate next section index
      let nextSectionIndex = currentSectionIndex;
      if (direction > 0) {
        nextSectionIndex = Math.min(
          currentSectionIndex + 1,
          sections.length - 1,
        );
      } else {
        nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
      }

      // Only scroll if we're actually moving to a different section
      if (nextSectionIndex !== currentSectionIndex) {
        e.preventDefault();
        isScrollingRef.current = true;

        const smoothScrollTo = (targetY, duration = 800) => {
          const startY = window.scrollY;
          const distance = targetY - startY;
          let startTime = null;

          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

          const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const eased = easeOutCubic(progress);
            window.scrollTo(0, startY + distance * eased);

            if (progress < 1) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        };
        smoothScrollTo(sections[nextSectionIndex].offsetTop, 1200);

        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 200);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);
};
