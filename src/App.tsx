import { useState } from "react";
import { Footer } from "./components/Footer";
import { Features } from "./components/Features";
import { IntroLoader, shouldShowIntro } from "./components/IntroLoader";
import { Navbar } from "./components/Navbar";
import { Steps } from "./components/Steps";
import { ToolCard } from "./components/ToolCard";
import { ToolHero } from "./components/ToolHero";

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  return (
    <>
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      <Navbar />
      <ToolHero />
      <main className="workspace">
        <ToolCard />
      </main>
      <Features />
      <Steps />
      <Footer />
    </>
  );
}
