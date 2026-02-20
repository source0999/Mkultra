'use client';
import { useEffect, useRef, useState } from 'react';
import HomeHero from './components/HomeHero';
import TheorySection from './components/TheorySection';
import { theories } from './data/theories';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Initial Start Function
  const startArchive = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsInitialized(true);
    }
  };

  // 2. The "Stop on Scroll" Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger if the user has already clicked "Initialize"
        if (isInitialized && audioRef.current) {
          if (entry.isIntersecting) {
            audioRef.current.play().catch(() => {});
          } else {
            audioRef.current.pause();
          }
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the Hero is visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [isInitialized]);

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black overflow-x-hidden">
      <audio ref={audioRef} src="/bg.mp3" loop />

      {/* ACCESS POPUP */}
      {!isInitialized && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
          <button 
            onClick={startArchive}
            className="border border-red-900/40 px-12 py-5 text-[11px] tracking-[1em] text-red-600 hover:bg-red-600 hover:text-white transition-all duration-500 uppercase font-mono"
          >
            [ INITIALIZE SECURE FEED ]
          </button>
        </div>
      )}

      {/* 1. HERO SECTION (With 'heroRef' for the sensor) */}
      <section ref={heroRef} className="snap-start w-full h-screen relative flex-shrink-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="/background.gif" 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 h-full w-full">
          <HomeHero />
        </div>
      </section>

      {/* 2. THEORIES */}
      {theories.map((theory) => (
        <section key={theory.id} className="snap-start h-screen w-full relative flex-shrink-0">
          <TheorySection theory={theory} />
        </section>
      ))}
    </main>
  );
}