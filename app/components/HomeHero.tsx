export default function HomeHero() {
  return (
    /* We remove the background img here because it's already in page.tsx */
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* The Text Overlay */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-black italic tracking-tighter text-white drop-shadow-2xl">
          UNFOLDING OMITTED TRUTH
        </h1>
        <p className="text-zinc-500 tracking-[1em] uppercase text-[10px] mt-4">
          Historical Patterns Omitted by the System
        </p>
      </div>

    </div>
  );
}