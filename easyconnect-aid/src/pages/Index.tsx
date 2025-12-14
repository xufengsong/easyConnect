// @/pages/Index.tsx
import { useState } from "react";
import ModeToggle from "@/components/ModeToggle";
import ChatView from "@/components/ChatView";
import NewsReaderView from "@/components/NewsReaderView";
// 1. Import the new component
import MatchView from "@/components/MatchView"; 

// 2. Update the type definition
type Mode = "chat" | "news" | "match";

const Index = () => {
  const [mode, setMode] = useState<Mode>("chat");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border container max-w-4xl mx-auto px-4">
        <div className="py-6">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="text-accessible-2xl font-bold text-foreground">
                Your Daily Companion
              </h1>
              <p className="text-accessible-base text-muted-foreground mt-1">
                Chat, Match, or catch up on news
              </p>
            </div>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-6">
        {/* CHANGE MADE HERE:
           1. Changed 'min-h-[...]' to 'h-[calc(100vh-220px)]'.
              This forces the card to be a specific height so the internal chat scroll works.
              (Adjust the pixel value 220px if you need more/less space for the footer)
           2. Added 'flex flex-col'.
              This ensures the child components (ChatView) can expand to fill the space.
        */}
        <div className="bg-card rounded-b-3xl shadow-soft-lg overflow-hidden h-[calc(100vh-220px)] flex flex-col relative">
          {mode === "chat" && <ChatView />}
          {mode === "news" && <NewsReaderView />}
          {mode === "match" && <MatchView />}
        </div>
      </main>

      {/* Footer */}
      <footer className="container max-w-4xl mx-auto px-4 py-6 text-center">
        <p className="text-accessible-sm text-muted-foreground">
          Need help? Call support at{" "}
          <a href="tel:+82-010-8326-2199" className="text-teal font-semibold underline">
            +82-010-8326-2199
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;