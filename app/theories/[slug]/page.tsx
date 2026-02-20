'use client'; // Required for dynamic params handling in some Next.js versions

import { theories } from '@/app/data/theories'; 
import { notFound } from 'next/navigation';
import { use } from 'react'; // Use this to safely unwrap params

export default function TheoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the promise to get the slug
  const decodedParams = use(params);
  const data = theories.find((t) => t.slug === decodedParams.slug);

  if (!data) notFound();

  return (
    <main className="min-h-screen bg-black text-white font-mono p-10 pt-32">
      <div className="max-w-5xl mx-auto">
        <header className="border-b border-red-900/30 pb-10 mb-10">
          <p className="text-red-600 text-xs tracking-[0.5em] mb-2">{data.era}</p>
          <h1 className="text-6xl font-black italic uppercase">{data.title}</h1>
        </header>

        <div className="space-y-24">
          {data.sections.map((section, i) => (
            <section key={section.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <h3 className="text-2xl font-bold mb-4 uppercase text-zinc-200">
                   0{i + 1} // {section.title || "Observation"}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-lg mb-6">
                  {section.content}
                </p>
                {/* References mapping remains the same */}
              </div>
              <div className="relative group">
                <img 
                  src={section.mediaUrl || data.image} 
                  className="w-full h-auto opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 border border-white/5" 
                  alt="" 
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}