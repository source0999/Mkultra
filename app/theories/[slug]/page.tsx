'use client';
import { use, useState } from 'react';
import { theories } from '@/app/data/theories';
import { notFound } from 'next/navigation';

export default function TheoryArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = theories.find((t) => t.slug === slug);
  const [showRefs, setShowRefs] = useState<string | null>(null);

  if (!data) notFound();

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth no-scrollbar">
      {/* Visual Navigation Bar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {data.sections.map((_, i) => (
          <div key={i} className="w-1 h-12 bg-zinc-900 border-r border-red-600/30" />
        ))}
      </div>

      {data.sections.map((section, i) => (
        <section key={section.id} className="snap-start h-screen w-full relative flex items-center justify-center p-10 overflow-hidden">
          {/* Faded Background Context */}
          <div className="absolute inset-0 z-0 opacity-10">
            <img src={section.mediaUrl} className="w-full h-full object-cover grayscale" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          </div>

          <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            {/* Alternating Image Layout */}
            <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="border border-white/10 p-2 bg-zinc-950/50 backdrop-blur-sm group overflow-hidden">
                <img src={section.mediaUrl} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <span className="text-red-600 font-mono text-[10px] tracking-[0.6em] uppercase">Phase 0{i + 1} // Classified</span>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">{section.title}</h2>
              <p className="text-zinc-400 font-mono text-lg leading-relaxed">{section.content}</p>
              
              {section.references && (
                <div>
                  <button onClick={() => setShowRefs(showRefs === section.id ? null : section.id)} className="text-[10px] border border-white/20 px-6 py-2 hover:bg-red-600 transition-all uppercase">
                    {showRefs === section.id ? '[ DECRYPTED ]' : '[ ACCESS SOURCE ]'}
                  </button>
                  {showRefs === section.id && (
                    <div className="mt-4 p-4 bg-zinc-900 border-l border-red-600 animate-in fade-in slide-in-from-left-2">
                      {section.references.map((ref, idx) => (
                        <a key={idx} href={ref.url} className="block text-xs text-red-500 hover:underline py-1 uppercase">{idx + 1}. {ref.sourceName}</a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}