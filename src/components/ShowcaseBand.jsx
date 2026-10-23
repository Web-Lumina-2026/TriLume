import Artwork, { PALETTES } from "./Artwork.jsx";

/** Full-bleed band: big italic headline + horizontally drifting art row. */
export default function ShowcaseBand() {
  const arts = Object.entries(PALETTES);

  return (
    <section id="gallery" className="relative bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="reveal label">Some of the artists</p>
        <h2 className="reveal font-serif text-4xl italic md:text-6xl">
          on display
        </h2>
      </div>

      <div className="relative mt-12 overflow-x-clip py-8">
        <div className="flex gap-10 px-6 md:px-10" data-parallax="-0.12">
          {arts.map(([name, palette], i) => (
            <figure key={name} className="w-60 shrink-0 md:w-80">
              <Artwork
                palette={palette}
                className={i % 2 ? "h-72 md:h-96" : "h-56 rounded-full md:h-72"}
              >
                <span className="label absolute bottom-4 left-4 text-cream">
                  {name}
                </span>
              </Artwork>
              <figcaption className="label mt-3 flex justify-between text-ink/70">
                <span>A.D. 1960–2030</span>
                <span className="font-serif text-xs italic tracking-normal normal-case">
                  Discover →
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* marquee headline riding the dark band below */}
      <div className="relative bg-espresso py-16 text-cream/20">
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="whitespace-nowrap font-serif text-[16vw] leading-none tracking-tight"
            >
              TriLume — Atelier of Light —&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
