const COLS = [
  ["Support us", ["Membership", "Patron circle", "Corporate gifts"]],
  ["Learn", ["Education", "Tours", "Library", "Publications"]],
  ["Collection", ["Online archive", "Loans", "Conservation"]],
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-espresso text-cream">
      {/* floating polaroid */}
      <div className="pointer-events-none absolute -left-10 top-10 hidden rotate-[-8deg] lg:block" data-parallax="-0.1">
        <div className="w-40 rotate-3 bg-parchment p-2 pb-8 shadow-xl">
        <div className="h-40 overflow-hidden">
          <img
            src="/images/gallery-wall.jpg"
            alt="TriLume gallery wall hung with gilt-framed works"
            className="h-full w-full object-cover"
          />
        </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-10 pt-24 md:px-10 lg:grid-cols-[1.2fr_2fr]">
        <div className="reveal">
          <p className="label text-cream/70">Stay up to date</p>
          <p className="mt-4 max-w-sm font-serif text-2xl italic leading-snug text-cream/90">
            Subscribe at the atelier of the Trilume for its exhibitions and
            its most representative works.
          </p>
          <form
            className="mt-6 flex max-w-sm border border-cream/30"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent px-4 py-3 text-sm placeholder:text-cream/40 focus:outline-none"
            />
            <button className="label bg-cream px-5 text-ink hover:opacity-80">
              Subscribe
            </button>
          </form>
        </div>

        <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map(([title, links]) => (
            <div key={title}>
              <p className="label mb-4 text-cream/50">{title}</p>
              <ul className="label space-y-3 text-cream/80">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-cream">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="relative select-none overflow-hidden px-6 pb-10 md:px-10" data-parallax="0.04">
        <h2 className="text-center font-serif text-[clamp(6rem,22vw,20rem)] leading-[0.9] tracking-tight text-cream">
          Tri<span className="italic">Lume</span>
        </h2>
        <p className="label absolute inset-x-0 bottom-4 text-center text-cream/40">
          © {new Date().getFullYear()} Trilume · Crafted with light
        </p>
      </div>
    </footer>
  );
}
