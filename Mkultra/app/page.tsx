'use client';
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import TheorySection from './components/TheroySection';
import { theories } from './data/theories';

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <div id="home" className="snap-start w-full h-screen">
        <HomeHero />
      </div>

      {/* 2. THEORIES - Each one is a full page */}
      <div id="theories">
        {theories.map((theory) => (
          <div key={theory.id} className="snap-start h-screen w-full">
            <TheorySection theory={theory} />
          </div>
        ))}
      </div>
      
      {/* 3. FOOTER / END OF SESSION */}
      <footer className="snap-start h-[20vh] flex items-center justify-center bg-stone-950">
        <p className="text-[10px] text-stone-700 uppercase tracking-[1em]">End of Archive</p>
      </footer>
    </main>
  );
}