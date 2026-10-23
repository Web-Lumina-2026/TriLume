import { useEffect, useRef, useState } from "react";
import HeroCanvas from "./HeroCanvas.jsx";

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      setTilt({
        x: e.clientX / innerWidth - 0.5,
        y: e.clientY / innerHeight - 0.5,
      });
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden bg-ink text-cream"
    >
      <HeroCanvas />
      <img
        src="/images/statue-arch.jpg"
        alt="Statue of a draped figure beneath the vaulted arches of the TriLume halls"
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%] opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/55" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32 pt-36 md:px-10">
        <p
          className="label mb-2 text-center italic normal-case tracking-[0.5em]"
          style={{ transform: `translate(${tilt.x * -6}px, ${tilt.y * -4}px)` }}
        >
          Atelier of
        </p>
        <h1
          className="text-center font-serif text-[clamp(4.5rem,18vw,15rem)] font-bold leading-[0.85] tracking-tight"
          style={{ transform: `translate(${tilt.x * -10}px, ${tilt.y * -6}px)` }}
        >
          TriLume
        </h1>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-serif text-4xl font-bold italic md:text-6xl">
              <span aria-hidden className="not-italic mr-3">✦</span>
              Masterpieces
            </h2>
            <p className="mt-2 font-sans text-2xl font-semibold tracking-wide md:text-4xl">
              of light on display
            </p>

            <p className="label mt-6 font-bold text-cream/90">
              Discover the collection
              <br />
              of the Trilume atelier
            </p>
            <p className="mt-8 max-w-md font-serif text-lg italic leading-relaxed text-cream/80">
              A guided tour for the visitor who arrives at TriLume for the first
              time or wants a better appreciation of the light, its history, and
              the analysis of its most representative works.
            </p>
            <p className="mt-4 font-serif italic text-cream/90">
              Every Saturday at 10 a.m.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#exhibits" className="label border border-cream/40 px-6 py-3 transition-colors hover:bg-cream hover:text-ink">
                Discover more
              </a>
              <a href="#contact" className="label bg-cream px-6 py-3 text-ink transition-opacity hover:opacity-80">
                Book now
              </a>
            </div>
          </div>

          {/* exhibit metadata panel */}
          <dl className="label space-y-3 self-end border-l border-cream/25 pl-6 text-cream/70">
            {[
              ["Title", "Vespers Over the Kiln"],
              ["Author", "Studio TriLume, 1998"],
              ["Date", "Winter, after dusk"],
              ["Object type", "Cast glass, warm LED"],
              ["Room", "XXI"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-cream/90">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#exhibits"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream/60 transition-colors hover:text-cream"
      >
        <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
          <path d="M11 0v27M11 29l-6-6M11 29l6-6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </a>
    </section>
  );
}
