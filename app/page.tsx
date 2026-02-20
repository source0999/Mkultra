'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { theories } from './data/theories';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLDivElement>(null); // Sensor for the Hero
  const [isInitialized, setIsInitialized] = useState(false);

  const startArchive = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsInitialized(true);
    }
  };

  // RESTORED: The Audio Sensor
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isInitialized && audioRef.current) {
          if (entry.isIntersecting) {
            audioRef.current.play().catch(() => {});
          } else {
            audioRef.current.pause();
          }
        }
      },
      { threshold: 0.1 } // Stop audio when 90% of Hero is gone
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [isInitialized]);

  return (
    /* FIXED: Snap container must be the main wrapper */
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black overflow-x-hidden">
      <audio ref={audioRef} src="/bg.mp3" loop />

      {!isInitialized && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <button 
            onClick={startArchive}
            className="border border-white/20 px-12 py-5 text-[10px] tracking-[1em] text-white hover:bg-white hover:text-black transition-all font-mono"
          >
            [ INITIALIZE SYSTEM ]
          </button>
        </div>
      )}

      {/* HERO SECTION - Now with 'ref' for audio sensor */}
      <section ref={heroRef} className="snap-start h-screen w-full relative flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/background.gif" className="w-full h-full object-cover opacity-30" alt="" />
        </div>
        <h1 className="relative z-10 text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase">
          MKULTRA.
        </h1>
      </section>

      {/* DYNAMIC SECTIONS */}
      {theories.map((theory) => (
        <section key={theory.id} className="snap-start h-screen w-full relative flex flex-col items-center justify-center p-10">
          <div className="absolute inset-0 opacity-20">
            <img src={theory.image} className="w-full h-full object-cover grayscale" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>
          
          <div className="relative z-10 text-center max-w-2xl">
            <span className="text-red-600 font-mono text-xs tracking-[0.5em]">{theory.era}</span>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase my-4 tracking-tighter">{theory.title}</h2>
            <p className="text-zinc-400 font-mono text-sm mb-10 leading-relaxed">{theory.desc}</p>
            
            <Link 
              href={`/theories/${theory.slug}`}
              className="border border-red-900/40 px-8 py-3 text-[10px] tracking-[0.3em] text-white hover:bg-red-600 transition-all uppercase font-mono"
            >
              [ ENTER ARCHIVE ]
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}