'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { keys } from './data/keys';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLElement>(null); // Ref for the hero section
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Gnosis";

  // Intersection Observer to handle audio on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (audioRef.current && isInitialized) {
          if (entry.isIntersecting) {
            audioRef.current.play().catch(() => {});
          } else {
            audioRef.current.pause();
          }
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the hero is visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, [isInitialized]);

  // Typing/Deleting Loop Logic
  useEffect(() => {
    if (!isInitialized) return;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isInitialized]);

  const startKey = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsInitialized(true);
    }
  };

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar font-['Bruno_Ace']">
      <audio ref={audioRef} src="/bg.mp3" loop />
      
      {!isInitialized && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <button 
            onClick={startKey} 
            className="border border-[var(--purple-accent)] bg-[var(--purple-accent)]/20 px-12 py-5 text-[10px] tracking-[1em] text-white hover:bg-[var(--purple-accent)] transition-all uppercase"
          >
            [ INITIALIZE ]
          </button>
        </div>
      )}

      {/* Hero Section - Attached ref here */}
      <section 
        ref={heroRef} 
        className="snap-start h-screen w-full relative flex flex-col items-center justify-center"
      >
        <img src="/background.gif" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white uppercase typing-cursor inline-block min-h-[1.2em]">
            {displayText}
          </h1>
          
          <p className="subtitle-fade text-[var(--purple-accent)] text-sm md:text-lg tracking-[1.2em] uppercase mt-8 block opacity-90">
            Eat the rich
          </p>
        </div>
      </section>

      {/* List Item Sections */}
      {keys.map((key) => (
        <section key={key.id} className="snap-start h-screen w-full relative flex flex-col items-center justify-center p-10">
          <div className="absolute inset-0 opacity-20">
            <img src={key.image} className="w-full h-full object-cover grayscale" alt="" />
          </div>
          <div className="relative z-10 text-center max-w-2xl">
            <span className="text-[var(--purple-accent)] text-[10px] tracking-[0.5em] block mb-4 uppercase">{key.era}</span>
            <h2 className="text-4xl md:text-5xl uppercase mb-6 leading-tight text-white tracking-tighter">{key.title}</h2>
            <p className="text-zinc-400 text-sm mb-12 tracking-wide leading-relaxed">{key.desc}</p>
            
            <Link 
              href={`/keys/${key.slug}`} 
              className="border-2 border-[var(--purple-accent)] bg-[var(--purple-accent)]/80 px-10 py-4 text-[11px] tracking-[0.4em] text-white hover:bg-[var(--purple-accent)] transition-all inline-block shadow-[0_0_15px_rgba(124,58,237,0.3)]"
            >
              [ ENTER KEY ]
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}