import React, { useEffect, useRef } from 'react';

export default function HomeHero() {
  // 1. Properly declared Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.volume = 0.2; // Sets volume to 30%
    }

    const startAudio = () => {
      audio?.play().catch(() => {});
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  window.addEventListener('click', startAudio);

  const observer = new IntersectionObserver(
    ([entry]) => {
      // LOGIC CHECK: 
      // If isIntersecting is true, we are on the HomeHero. 
      // If false, we have scrolled away.
      if (entry.isIntersecting) {
        audio?.play().catch(() => {});
      } else {
        audio?.pause();
        // Reset audio to start if you want it to restart next time
        if (audio) audio.currentTime = 0; 
      }
    },
    { 
      threshold: 0, // Trigger immediately when even 1 pixel leaves the screen
      rootMargin: "-50px 0px" // Adds a buffer so it stops slightly before it's fully gone
    }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    observer.disconnect();
    window.removeEventListener('click', startAudio);
  };
}, []);
  return (
    <section 
      ref={sectionRef} 
      className="h-screen w-full flex flex-col justify-center items-center text-center snap-start px-6 bg-black relative"
    >
      {/* Ensure this path matches your file in public/audio/ */}
      <audio ref={audioRef} src="/audio.mp3" loop />

      <img 
        src="/home.gif" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-lighten pointer-events-none"
      />
      
      <div className="z-10">
        <h1 className="text-6xl md:text-9xl font-bold text-white uppercase italic">
          Unfolding <br/> 
          <span className="text-purple-600 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]">Omitted Truth</span>
        </h1>
        <p className="text-stone-400 mt-4 max-w-xl mx-auto">
          A study of the historical patterns our systems ignored.
        </p>
      </div>
    </section>
  );
}