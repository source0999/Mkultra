import React from 'react';

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-black text-white p-20">
      <h1 className="text-4xl font-bold uppercase italic">Archive Index</h1>
      <p className="mt-4 text-stone-400">Deep storage records pending decryption...</p>
      
      <a href="/" className="mt-10 inline-block border border-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
        Return to Home
      </a>
    </main>
  );
}