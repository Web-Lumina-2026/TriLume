import { useEffect, useState } from "react";

const LINKS = ["Home", "Exhibits", "Gallery", "Atelier", "Contact"];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > innerHeight * 0.6);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-ink/90 text-cream backdrop-blur-md"
          : "bg-transparent text-cream"
      }`}
    >
      <nav className="nav-enter mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:px-10">
        <ul className="label hidden gap-6 lg:flex">
          {LINKS.slice(0, 3).map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="opacity-80 hover:opacity-100">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <span className="label lg:hidden">Menu</span>

        <div className="flex flex-col items-center justify-self-center">
          <a href="#home" className="blend-hover justify-self-center font-serif text-2xl tracking-wide">
            <span aria-hidden>✦ </span>TriLume
          </a>
          <a
            href="#contact"
            className="label mt-1 rounded-full border border-cream/40 px-3 py-1.5 text-[0.55rem] transition-colors hover:bg-cream hover:text-ink"
          >
            Book a visit
          </a>
        </div>

        <ul className="label hidden justify-end gap-6 lg:flex">
          {LINKS.slice(3).map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="opacity-80 hover:opacity-100">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
