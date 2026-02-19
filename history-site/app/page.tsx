'use client';
import Navbar from './components/Navbar';
import BackgroundAudio from './components/BackgroundAudio';
import HomeHero from './components/HomeHero';
import TimelineHeader from './components/TimelineHeader';
import TimelineSection from './TimelineSection';

export default function Home() {
  // 1. Defining this stops the red lines under .map
  const ritualHistory = [
    { id: "r1", era: "3500 BCE", title: "The Cradle", desc: "First sacrifice." }
  ];

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black">
      <Navbar />
      <BackgroundAudio />
      
      <div id="home">
        <HomeHero />
      </div>

      <div id="ritual">
        {/* 2. No more red dots because we removed '...' */}
        <TimelineHeader 
          title="Ritual" 
          subtitle="Patterns of biological appeasement." 
          pattern="Ancient Exchange" 
        />
        {ritualHistory.map((fact) => (
          <TimelineSection key={fact.id} item={fact} />
        ))}
      </div>
    </main>
  );
}