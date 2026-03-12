import { archives } from "../data/archives";
import { notFound } from "next/navigation";
import { mdxComponents } from "../components/mdx-components";
import Link from "next/link";

export default async function ArchivePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 1. Get metadata (Title, Image, Era) from archives.ts
  const entry = archives.find((a) => a.slug === slug);
  if (!entry) return notFound();

  // 2. Load the MDX file directly from the content folder
  let Content;
  try {
    // Path: Up 3 levels to root (slug -> archives -> app), then down into content
const mdxModule = await import(`../../../content/archives/${slug}.mdx`);
    Content = mdxModule.default;
  } catch (e) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-500 font-mono">
        [SYSTEM_ERROR]: MDX_FILE_NOT_FOUND_AT_../content/archives/{slug}.mdx
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 font-['Bruno_Ace']">
      {/* Header UI using metadata from archives.ts */}
      <div className="relative h-[40vh] border-b border-white/10 flex items-end p-8 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 grayscale transition-opacity duration-700 hover:opacity-40"
          style={{ backgroundImage: `url(${entry.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative z-10">
          <Link href="/archives" className="text-[--purple-accent] text-xs font-mono mb-4 block hover:brightness-150 transition-all">
            &lt; RETURN_TO_DATABASE
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
            {entry.title}
          </h1>
          <p className="text-zinc-500 font-mono text-[10px] tracking-[0.5em] mt-2">
            FILE_ID: {entry.id} // {entry.era}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        <article className="prose prose-invert max-w-none">
          {/* CRITICAL CHANGE:
              We are rendering the ACTUAL MDX <Content /> here. 
              If you have code that looks like 'entry.sections.map(...)', DELETE IT.
          */}
          <Content components={mdxComponents} />
        </article>

        <footer className="mt-24 pt-8 border-t border-white/5 font-mono text-[10px] text-zinc-600 flex justify-between">
          <div className="flex flex-col gap-1">
            <span>DECRYPTION_SOURCE: /content/archives/{slug}.mdx</span>
            <span>ACCENT_MODE: {entry.accentColor}</span>
          </div>
          <span className="typing-cursor uppercase">Status: Live_Stream</span>
        </footer>
      </div>
    </main>
  );
}