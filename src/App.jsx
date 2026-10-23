import { useEffect, useRef } from "react";
import Lenis from "lenis";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import GallerySection from "./components/GallerySection.jsx";
import ShowcaseBand from "./components/ShowcaseBand.jsx";
import CollectionStrip from "./components/CollectionStrip.jsx";
import Footer from "./components/Footer.jsx";
import { useReveal, useParallax } from "./hooks/useReveal.js";

export default function App() {
  const lenisRef = useRef(null);
  useReveal();
  useParallax(lenisRef);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    if (import.meta.env.DEV) window.__lenis = lenis; // handy for browser-based testing

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // anchor navigation through Lenis so it stays buttery
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const target = id && document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -64 });
      }
    };
    addEventListener("click", onClick);

    return () => {
      removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GallerySection />
        <ShowcaseBand />
        <CollectionStrip />
      </main>
      <Footer />
    </>
  );
}
