/* ═══════════════════════════════════════════
   App — Mihad Portfolio
   ═══════════════════════════════════════════ */

import { Background } from "./components/Background";
import { Cursor } from "./components/Cursor";
import { PageLoader } from "./components/PageLoader";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Identity } from "./components/Identity";
import { DiscordSection } from "./components/DiscordSection";
import { YouTubeSection } from "./components/YouTubeSection";
import { InstagramSection } from "./components/InstagramSection";
import { SocialHub } from "./components/SocialHub";
import { Footer } from "./components/Footer";
import { HorizontalScrollText } from "./components/HorizontalScrollText";
import { StickySection } from "./components/StickySection";

function SectionDivider() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="h-px bg-gradient-to-r from-transparent via-slate/12 to-transparent" />
    </div>
  );
}

function App() {
  return (
    <div className="grain-overlay">
      <PageLoader />
      <Background />
      <Cursor />
      <ScrollProgress />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />

          {/* Horizontal scrolling text — alternating direction */}
          <HorizontalScrollText />

          <Identity />

          {/* Sticky section — CREATE stays pinned while content moves */}
          <StickySection
            stickyElement="CREATE"
            items={[
              { text: "IDEAS", from: "left" },
              { text: "STORIES", from: "right", accent: true },
              { text: "VISUALS", from: "bottom" },
              { text: "COMMUNITY", from: "left" },
              { text: "VISION", from: "right" },
            ]}
          />

          <SectionDivider />
          <DiscordSection />
          <SectionDivider />
          <YouTubeSection />
          <SectionDivider />
          <InstagramSection />
          <SectionDivider />
          <SocialHub />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
