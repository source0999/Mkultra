import Link from "next/link";

export default function KeyNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-slate-200 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-white uppercase">
          Key Not Found
        </h1>
        <p className="mt-6 text-slate-400">
          The requested dossier doesn’t exist yet in <code>content/keys/</code>.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-[var(--purple-accent)] bg-[var(--purple-accent)]/80 px-8 py-3 text-[11px] tracking-[0.4em] text-white hover:bg-[var(--purple-accent)] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

