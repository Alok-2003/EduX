import HeroSection from '../Components/HeroSection';
import Features from '../Components/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <HeroSection />
      <Features />
    </div>
  );
}