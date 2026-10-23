import Artwork, { PALETTES } from "./Artwork.jsx";

const PIECES = [
  ["Eclipse Study I", "Studio TriLume", PALETTES.kiln],
  ["Parallax Veil", "M. Okafor", PALETTES.tide],
  ["Harvest Reverb", "L. Contini", PALETTES.harvest],
  ["Bronze Hour", "Studio TriLume", PALETTES.bronze],
  ["Dusk Grammar", "R. Vitali", PALETTES.dusk],
];

/** Cream card carousel echoing “The Collection — 680 pieces online”. */
export default function CollectionStrip() {
  const row = [...PIECES, ...PIECES];

  return (
    <section id="atelier" className="bg-parchment py-20 text-ink">
      <div className="mx-auto mb-10 flex max-w-7xl items-baseline justify-between px-6 md:px-10">
        <h2 className="reveal font-serif text-4xl italic md:text-5xl">
          The Collection
          <span className="label ml-4 align-middle normal-case font-sans text-ink/60 tracking-[0.2em]">
            44 pieces online
          </span>
        </h2>
        <a href="#exhibits" className="label hidden border border-ink/30 rounded-full px-4 py-2 hover:bg-ink hover:text-parchment md:inline-block">
          Resources
        </a>
      </div>

      <div className="overflow-x-auto pb-4" data-lenis-prevent>
        <ul className="flex w-max gap-5 px-6 md:px-10">
          {row.map(([title, artist, palette], i) => (
            <li key={`${title}-${i}`} className="group w-48 md:w-56">
              <div className="overflow-hidden rounded-md bg-white p-2 shadow-sm transition-shadow group-hover:shadow-lg">
                <Artwork palette={palette} className="h-56 rounded-sm">
                  {i % 2 === 0 && (
                    <span className="label absolute bottom-3 left-3 text-cream/90">
                      № {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </Artwork>
                <p className="mt-2 text-[0.7rem] leading-tight text-ink/85">
                  <span className="font-semibold">{title}.</span> {artist}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
