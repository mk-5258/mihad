/* ═══════════════════════════════════════════
   App — Mihad Portfolio (Compact Cinematic)
   ═══════════════════════════════════════════ */

import { Background } from "./components/Background";
import { Cursor } from "./components/Cursor";
import { PageLoader } from "./components/PageLoader";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Platforms } from "./components/Platforms";
import { DiscordSection } from "./components/DiscordSection";
import { YouTubeSection } from "./components/YouTubeSection";
import { InstagramSection } from "./components/InstagramSection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { ScrollTextOverlay } from "./components/ScrollTextOverlay";

function App() {
  return (
    <div className="grain-overlay">
      <PageLoader />
      <Background />
      <Cursor />
      <ScrollProgress />
      <ScrollTextOverlay />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Platforms />
          <DiscordSection />
          <YouTubeSection />
          <InstagramSection />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
