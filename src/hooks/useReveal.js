import { useEffect, useRef } from "react";

/**
 * Adds the `is-visible` class to any element carrying the `reveal`
 * class once it enters the viewport. Re-runs on route-less apps, so a
 * MutationObserver keeps it working for late-mounted nodes too.
 */
export function useReveal() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current ?? document.body;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const scan = () =>
      root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el));

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return rootRef;
}

/**
 * Simple parallax: elements tagged with data-parallax="<factor>" are
 * translated on scroll by (elementCenterOffset * factor). Uses Lenis
 * scroll events when available, otherwise window scroll.
 */
export function useParallax(lenisRef) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const middle = innerHeight / 2;
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - middle;
        // clamp so drifting decorative elements never escape clipped containers
        const y = Math.max(-64, Math.min(64, offset * Number(el.dataset.parallax)));
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
      raf = 0;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const lenis = lenisRef?.current;
    if (lenis) lenis.on("scroll", schedule);
    else addEventListener("scroll", schedule, { passive: true });
    schedule();

    return () => {
      if (lenis) lenis.off("scroll", schedule);
      else removeEventListener("scroll", schedule);
      cancelAnimationFrame(raf);
    };
  }, [lenisRef]);
}
