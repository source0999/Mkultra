'use client';
import Link from 'next/link';
import { theories } from '@/app/data/theories'; // Direct import ensures they match

export default function ArchivesHub() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar scroll-smooth">
      {/* Visual Navigation Progress */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {theories.map((t) => (
          <div key={t.id} className="w-1 h-6 bg-red-600/20 border-r border-red-600" />
        ))}
      </div>

      {theories.map((theory, i) => (
        <section 
          key={theory.id} 
          className="snap-start h-screen w-full relative flex items-center justify-center p-8 md:p-24 overflow-hidden"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            <img src={theory.image} className="w-full h-full object-cover grayscale opacity-20 blur-sm" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>

          <div className="relative z-10 max-w-5xl w-full text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-600 font-mono text-[10px] tracking-[0.8em] uppercase mb-4 block">
                ENTRY_NO // 0{i + 1}
              </span>
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
                {theory.title}
              </h2>
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-8">
                {theory.era}
              </p>
              <Link 
                href={`/archives/${theory.slug}`}
                className="inline-block border border-white/20 px-10 py-4 text-[10px] tracking-[0.4em] text-white hover:bg-red-600 hover:border-red-600 transition-all font-mono"
              >
                [ ACCESS FILE ]
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="border border-white/10 p-2 bg-zinc-950/50">
                <img src={theory.image} className="w-full grayscale opacity-50" alt="" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}