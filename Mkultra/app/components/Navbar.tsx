'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Ritual', href: '#ritual' },
    { name: 'Control', href: '#control' },
    { name: 'Archive', href: '#archive' },
  ];

  return (
    <>
      {/* NAVBAR: 
        - Fixed position to follow scroll
        - Responsive: Desktop shows text links, Mobile shows Burger
      */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-4 md:py-6 bg-black/60 backdrop-blur-xl border-b border-white/5">
        
        {/* Logo - Link to Home */}
        <a href="#home" className="hover:opacity-70 transition-opacity z-[110]">
          <Image 
            src="/logo.png" 
            alt="OMITTED Logo" 
            width={180} 
            height={60} 
            className="h-6 md:h-8 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation - Hidden on mobile, visible on MD screens and up */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-purple-500 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Burger Button - Visible ONLY on mobile/tablets (hidden on md: and up) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none z-[110] p-2"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[105] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={toggleMenu}
              className="text-5xl font-bold uppercase italic tracking-tighter text-white hover:text-purple-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.4em] text-stone-700">
          Mobile Access // Encrypted
        </div>
      </div>
    </>
  );
}