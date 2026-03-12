'use client';

interface HeaderProps {
  title: string;
  subtitle: string;
  pattern: string;
}

export default function TimelineHeader({ title, subtitle, pattern }: HeaderProps) {
  return (
    <section className="snap-start h-[40vh] md:h-[50vh] flex flex-col justify-center px-6 md:px-20 bg-black border-b border-white/5">
      <div className="max-w-4xl">
        <p className="text-purple-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4">
          // STATUS: {pattern}
        </p>
        <h2 className="text-4xl md:text-7xl font-bold text-white uppercase italic tracking-tighter mb-4">
          {title}
        </h2>
        <p className="text-stone-500 text-sm md:text-base max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}