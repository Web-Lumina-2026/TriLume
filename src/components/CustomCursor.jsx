import { useEffect, useRef } from "react";

/**
 * Custom cursor:
 *  — base: 30px trailing outline ring + center dot (both lerped)
 *  — over h1/h2/.blend-hover: 80px translucent white disc with
 *    mix-blend-mode: difference (inverts the type underneath)
 *  — over .exhibit-card / img (non-decorative): morphs into a pill
 *    badge with floating uppercase text (DISCOVER / VIEW)
 *  Everything is pointer-events: none and the native cursor is hidden
 *  via the `custom-cursor` class on <html> (fine pointers only).
 */
export default function CustomCursor() {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const wrap = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...target };
    const dotPos = { ...target };
    let state = "";
    let raf = 0;

    const frame = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      dotPos.x += (target.x - dotPos.x) * 0.45;
      dotPos.y += (target.y - dotPos.y) * 0.45;
      for (const [el, p] of [
        [ring, ringPos],
        [dot, dotPos],
      ]) {
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(frame);
    };

    const setState = (next, text) => {
      if (next !== state) {
        if (state) wrap.classList.remove(`cursor--${state}`);
        if (next) wrap.classList.add(`cursor--${next}`);
        state = next;
      }
      if (text) label.textContent = text;
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      wrap.classList.remove("cursor--hidden");

      const el = e.target instanceof Element ? e.target : null;
      if (!el) return setState("idle");

      const textHit = el.closest("h1, h2, .blend-hover");
      if (textHit) return setState("text");

      const cardHit = el.closest(
        ".exhibit-card:not([data-cursor-ignore]), img:not([data-cursor-ignore])"
      );
      if (cardHit) {
        const labeled = cardHit.closest("[data-cursor]");
        const text =
          labeled?.dataset.cursor ||
          (cardHit.closest(".exhibit-card") ? "Discover" : "View");
        return setState("pill", text.toUpperCase());
      }

      setState("idle");
    };

    const onLeave = () => {
      setState("idle");
      wrap.classList.add("cursor--hidden");
    };
    const onDown = () => wrap.classList.add("cursor--press");
    const onUp = () => wrap.classList.remove("cursor--press");

    addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    addEventListener("mousedown", onDown);
    addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      removeEventListener("mousedown", onDown);
      removeEventListener("mouseup", onUp);
      root.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor cursor--hidden" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
