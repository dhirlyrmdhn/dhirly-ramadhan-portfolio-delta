/**
 * ScrollLock utility to prevent window scrolling temporarily
 */
export const ScrollLock = {
  // Store the original scroll position
  scrollPosition: 0,

  // Track if scrolling is currently locked
  isLocked: false,

  // Timer reference for cleanup
  timer: null as NodeJS.Timeout | null,

  // Event handler to prevent scroll
  preventScroll: (e: Event) => {
    if (ScrollLock.isLocked) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  },

  // Prevent scrolling via keyboard
  preventKeyScroll: (e: KeyboardEvent) => {
    if (!ScrollLock.isLocked) return true;

    // Prevent scrolling with arrow keys, space, page up/down
    const keys = [
      "ArrowUp",
      "ArrowDown",
      "Space",
      "PageUp",
      "PageDown",
      "Home",
      "End",
    ];

    if (keys.includes(e.code)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  },

  // Disable scrolling for a specified duration
  disable: (duration = 3000) => {
    // Guard against server-side rendering
    if (typeof window === "undefined") return false;

    // Store current scroll position
    ScrollLock.scrollPosition = window.scrollY;
    ScrollLock.isLocked = true;

    // Lock the body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${ScrollLock.scrollPosition}px`;
    document.body.style.width = "100%";

    // Add event listeners with passive: false to allow preventDefault
    window.addEventListener("wheel", ScrollLock.preventScroll, {
      passive: false,
    });
    window.addEventListener("touchmove", ScrollLock.preventScroll, {
      passive: false,
    });
    window.addEventListener("keydown", ScrollLock.preventKeyScroll, {
      passive: false,
    });

    // Re-enable after duration
    if (duration > 0) {
      // Clear any existing timer
      if (ScrollLock.timer) {
        clearTimeout(ScrollLock.timer);
      }

      ScrollLock.timer = setTimeout(() => {
        ScrollLock.enable();
      }, duration);
    }

    return true;
  },

  // Enable scrolling
  enable: () => {
    // Guard against server-side rendering
    if (typeof window === "undefined") return false;

    // Reset lock state
    ScrollLock.isLocked = false;

    // Remove listeners
    window.removeEventListener("wheel", ScrollLock.preventScroll);
    window.removeEventListener("touchmove", ScrollLock.preventScroll);
    window.removeEventListener("keydown", ScrollLock.preventKeyScroll);

    // Restore body styles
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    // Restore scroll position
    window.scrollTo(0, ScrollLock.scrollPosition);

    // Clear timer reference
    ScrollLock.timer = null;

    return true;
  },
};
