import Link from "next/link";
import { keys } from "../data/keys";

export default function KeysIndexPage() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar font-['Bruno_Ace']">
      {keys.map((key) => (
        <section
          key={key.id}
          className="snap-start h-screen w-full relative flex flex-col items-center justify-center p-10"
        >
          <div className="absolute inset-0 opacity-20">
            <img src={key.image} className="w-full h-full object-cover grayscale" alt="" />
          </div>

          <div className="relative z-10 text-center max-w-2xl">
            <span className="text-[var(--purple-accent)] text-[10px] tracking-[0.5em] block mb-4 uppercase">
              {key.era}
            </span>
            <h2 className="text-4xl md:text-5xl uppercase mb-6 leading-tight text-white tracking-tighter">
              {key.title}
            </h2>
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