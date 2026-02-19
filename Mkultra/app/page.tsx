'use client';
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import TimelineHeader from './components/TimelineHeader';
import TimelineSection from './TimelineSection';

export default function Home() {
  // Updated content to match your project theme
  const mkUltraHistory = [
    { 
      id: "r1", 
      era: "1953", 
      title: "Project MKUltra", 
      desc: "The CIA's clandestine mind control research program, officially sanctioned in 1953." 
    },
    { 
      id: "r2", 
      era: "1973", 
      title: "Records Destroyed", 
      desc: "CIA Director Richard Helms orders the destruction of all MKUltra files, leaving only fragmented truths." 
    }
  ];

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black">
      <Navbar />
      
      {/* REMOVED: <BackgroundAudio /> 
          Why? We want the audio inside HomeHero so it stops when we scroll away.
      */}
      
      <div id="home">
        <HomeHero />
      </div>

      <div id="ritual">
        <TimelineHeader 
          title="Omitted History" 
          subtitle="Patterns of systemic psychological manipulation." 
          pattern="Classified Exchange" 
        />
        {mkUltraHistory.map((item) => (
          <TimelineSection key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}