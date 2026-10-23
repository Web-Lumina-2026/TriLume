/** Full-bleed band: big italic headline + parallax artwork row (Fayum portraits). */

const WORKS = [
  { title: "Portrait of Boy Eutyches", meta: "Roman Egypt, A.D. 100–150", src: "/images/boy-eutyches.jpg" },
  { title: "Fayum Portrait", meta: "Roman Egypt, A.D. 120–140", src: "/images/fayum.jpg" },
  { title: "Lady in Blue", meta: "H. Siemiradzki, 1890", src: "/images/lady-blue.jpg" },
  { title: "Florence Nightingale", meta: "England, A.D. 1854", src: "/images/nightingale.jpg" },
];

export default function ShowcaseBand() {
  return (
    <section id="gallery" className="relative bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="reveal label">Some of the artists</p>
        <h2 className="reveal font-serif text-4xl italic md:text-6xl">
          on display
        </h2>
      </div>

      <div className="no-bar relative mt-12 max-2xl:overflow-x-auto max-2xl:pb-6 2xl:overflow-x-clip py-8" data-lenis-prevent>
        <div className="flex gap-10 px-6 md:px-10" data-parallax="-0.12">
          {WORKS.map((w, i) => (
            <div
              key={w.title}
              className="reveal w-60 shrink-0 md:w-80"
              style={{ "--reveal-delay": `${i * 120}ms` }}
            >
              <div
                className={`frame exhibit-card relative h-72 md:h-96 ${
                  i % 2 ? "frame--brass rounded-2xl" : "frame--wood rounded-b-xl rounded-t-full"
                }`}
              >
                <div className="frame-liner h-full rounded-[inherit]">
                  <figure
                    className={`group frame-inset relative h-full w-full overflow-hidden rounded-[inherit] ${
                      i % 2 ? "" : "rounded-t-full"
                    }`}
                  >
                    <img
                      src={w.src}
                      alt={w.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <figcaption className="label absolute bottom-4 left-4 z-20 text-cream drop-shadow">
                      {w.title}
                    </figcaption>
                  </figure>
                </div>
              </div>
              <p className="mt-3 flex justify-between px-1 text-[0.7rem] text-ink/70">
                <span className="font-semibold">{w.title}</span>
                <span className="font-serif italic">{w.meta}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* full-bleed “Foscari” style band */}
      <figure className="relative h-[62vh] overflow-hidden">
        <img
          src="/images/grand-hall.jpg"
          alt="Grand stone hall with rows of arches at the TriLume museum"
          data-cursor-ignore
          className="h-[120%] w-full object-cover"
          data-parallax="-0.07"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <figcaption className="reveal absolute bottom-8 left-6 text-cream md:left-16">
          <p className="label text-cream/80">Highlight of the month</p>
          <h3 className="reveal mt-1 font-serif text-4xl italic md:text-6xl" style={{ "--reveal-delay": "150ms" }}>
            The Grand Halls of TriLume
          </h3>
        </figcaption>
      </figure>

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
