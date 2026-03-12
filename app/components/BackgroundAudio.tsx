'use client';
import { useEffect, useRef } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const monitorAudio = () => {
      if (!audioRef.current) return;

      // Check if we are still on the first screen (Homepage)
      const isOnHomePage = window.scrollY < window.innerHeight * 0.5;

      if (isOnHomePage) {
        // Only try to play; browser might still block until first click
        audioRef.current.play().catch(() => {});
      } else {
        // Force pause the moment we scroll down or hit a Navbar link
        audioRef.current.pause();
      }
    };

    // Listen for scroll, but also clicks (for Navbar tabs)
    window.addEventListener('scroll', monitorAudio);
    window.addEventListener('click', monitorAudio);

    // Initial check in case they refresh while scrolled down
    monitorAudio();

    return () => {
      window.removeEventListener('scroll', monitorAudio);
      window.removeEventListener('click', monitorAudio);
    };
  }, []);

  return (
    <audio 
      ref={audioRef} 
      loop 
      src="/audio.mp3" 
      className="hidden" 
    />
  );
}