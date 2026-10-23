import { useState } from "react";

const PIECES = [
  {
    heading: ["The Marriage", "of Glass & Light"],
    author: "Atelier TriLume",
    blurb:
      "Shown at the Trilume opening exhibition of 2001, a few months after the entry of the atelier into Milan, it celebrated the successful conclusion of the struggles of the…",
    img: "/images/frames-wall.jpg",
    meta: ["Title: Marriage of glass", "Author: Atelier TriLume", "Date: 2001", "Technique: cast glass, oil-warm LED", "Dim: 170 × 117 cm", "Room: 9"],
  },
  {
    heading: ["Afterglow", "Nocturne"],
    author: "Kavya Sandstone",
    img: "/images/statue-arch.jpg",
    arch: true,
    meta: ["Title: Kiss", "Author: Kavya Sandstone", "Date: 1999", "Technique: bronze & neon"],
  },
];

export default function GallerySection() {
  const [flash, setFlash] = useState(false);
  const nudge = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
  };

  return (
    <section id="exhibits" className="relative bg-cream text-ink">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:px-10">
        <div className="reveal">
          <h2 className="font-serif text-5xl leading-tight md:text-6xl">
            <em className="font-medium">{PIECES[0].heading[0]}</em>
            <br />
            {PIECES[0].heading[1]}
          </h2>
          <p className="label mt-4 uppercase tracking-[0.3em]">{PIECES[0].author}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70">
            {PIECES[0].blurb}
          </p>
          <a href="#gallery" className="label mt-6 inline-block border-b border-ink pb-1">
            Discover more
          </a>

          <div className="mt-10 flex items-center gap-4">
            {["‹", "›"].map((ch, i) => (
              <button
                key={ch}
                onClick={nudge}
                aria-label={i ? "Next piece" : "Previous piece"}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/40 text-lg transition-colors hover:bg-ink hover:text-cream"
              >
                {ch}
              </button>
            ))}
            <span className="h-px flex-1 bg-ink/30" />
          </div>
        </div>

        {/* arch artwork cluster */}
        <div
          className={`relative grid grid-cols-2 items-end gap-4 transition-transform duration-300 ${
            flash ? "scale-[1.02]" : ""
          }`}
          data-parallax="-0.06"
        >
          <figure
            className="exhibit-card relative col-span-2 h-64 overflow-hidden rounded-t-full sm:h-[26rem]"
            data-cursor="Discover"
          >
            <img src={PIECES[0].img} alt={PIECES[0].heading.join(" ")} className="h-full w-full object-cover" />
            <figcaption className="label absolute left-6 top-10 text-cream drop-shadow">
              № 09 — {PIECES[0].author}
            </figcaption>
          </figure>

          {PIECES.slice(1).map((p) => (
            <figure
              key={p.author}
              className={`exhibit-card relative overflow-hidden ${p.arch ? "h-72 rounded-t-full" : "h-56"}`}
              data-cursor="Discover"
            >
              <img
                src={p.img}
                alt={p.heading.join(" ")}
                className={`h-full w-full object-cover transition-transform duration-700 hover:scale-105 ${p.arch ? "" : "rounded-sm"}`}
              />
              <figcaption className="label absolute left-4 bottom-4 p-1 text-cream drop-shadow">
                {p.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* metadata strip */}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 sm:grid-cols-2 md:px-10">
        {PIECES.map((p) => (
          <dl key={p.author} className="reveal label flex gap-4 text-ink/80">
            <span aria-hidden className="font-serif text-xl">✦</span>
            <div className="space-y-1.5">
              {p.meta.map((m) => (
                <div key={m} className="flex gap-2">
                  <dt className="font-semibold">{m.split(":")[0]}</dt>
                  <dd>{m.split(":")[1] ?? ""}</dd>
                </div>
              ))}
            </div>
          </dl>
        ))}
      </div>
    </section>
  );
}
