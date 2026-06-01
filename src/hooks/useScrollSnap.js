import { useEffect, useRef } from "react";

export const useScrollSnap = () => {
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    // 1. Move smoothScrollTo out here so both handleWheel and handleTouchMove can see it
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

    // 2. Your exact original desktop handleWheel function
    const handleWheel = (e) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const sections = document.querySelectorAll(".section");
      if (sections.length === 0) return;

      const currentScroll = window.scrollY;
      if (Math.abs(e.deltaY) < 45) {
        e.preventDefault();
        return;
      }
      const direction = e.deltaY > 0 ? 1 : -1;
      let currentSectionIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        if (currentScroll >= sections[i].offsetTop - 50) {
          currentSectionIndex = i;
        } else {
          break;
        }
      }

      let nextSectionIndex = currentSectionIndex;
      if (direction > 0) {
        nextSectionIndex = Math.min(
          currentSectionIndex + 1,
          sections.length - 1,
        );
      } else {
        nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
      }

      if (nextSectionIndex !== currentSectionIndex) {
        e.preventDefault();
        isScrollingRef.current = true;

        smoothScrollTo(sections[nextSectionIndex].offsetTop, 750);

        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 300);
      }
    };

    // 3. New mobile touch handlers
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const sections = document.querySelectorAll(".section");
      if (sections.length === 0) return;

      const touchEndY = e.touches[0].clientY;
      const swipeDistance = touchStartYRef.current - touchEndY;

      if (Math.abs(swipeDistance) > 50) {
        // Stop default mobile bounce scrolling
        if (e.cancelable) e.preventDefault();

        const direction = swipeDistance > 0 ? 1 : -1;
        const currentScroll = window.scrollY;

        let currentSectionIndex = 0;
        for (let i = 0; i < sections.length; i++) {
          if (currentScroll >= sections[i].offsetTop - 50) {
            currentSectionIndex = i;
          } else {
            break;
          }
        }

        let nextSectionIndex = currentSectionIndex;
        if (direction > 0) {
          nextSectionIndex = Math.min(
            currentSectionIndex + 1,
            sections.length - 1,
          );
        } else {
          nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
        }

        if (nextSectionIndex !== currentSectionIndex) {
          isScrollingRef.current = true;

          smoothScrollTo(sections[nextSectionIndex].offsetTop, 1200);

          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 300);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);
};
