'use client';
// REMOVED: import Navbar from './components/Navbar'; <-- This was causing the double navbar!
import HomeHero from './components/HomeHero';
import TheorySection from './components/TheorySection';
import { theories } from './data/theories';

export default function Home() {
  return (
    /* Removed h-screen from main to allow the layout's body to handle the height */
    /* This fixes the double scrollbar issue */
    <main className="w-full bg-black snap-y snap-mandatory scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="snap-start w-full h-screen relative">
        <HomeHero />
      </section>

      {/* 2. THEORIES - Full Screen Snap Sections */}
      <div id="theories">
        {theories.map((theory) => (
          <section key={theory.id} className="snap-start h-screen w-full relative">
            <TheorySection theory={theory} />
          </section>
        ))}
      </div>
      
      {/* 3. FOOTER */}
      <footer className="snap-start h-[30vh] flex items-center justify-center bg-black border-t border-white/5">
        <p className="text-[10px] text-stone-700 uppercase tracking-[1em] animate-pulse">
          End of Archive // MK-DATA
        </p>
      </footer>
    </main>
  );
}