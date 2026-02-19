export default function HomeHero() {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center text-center snap-start px-6 bg-black relative">
      {/* Lighten GIF to 70% opacity */}
      <img 
        src="/home.gif" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-lighten pointer-events-none"
      />
      
      <div className="z-10">
        <h1 className="text-6xl md:text-9xl font-bold text-white uppercase italic">
          Unfolding <br/> 
          <span className="text-purple-600 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]">Omitted Truth</span>
        </h1>
        <p className="text-stone-400 mt-4 max-w-xl mx-auto">
          A study of the historical patterns our systems ignored.
        </p>
      </div>
    </section>
  );
}