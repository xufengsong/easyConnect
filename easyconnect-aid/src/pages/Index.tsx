// @/pages/Index.tsx
import { useState } from "react";
import ModeToggle from "@/components/ModeToggle";
import ChatView from "@/components/ChatView";
import NewsReaderView from "@/components/NewsReaderView";

type Mode = "chat" | "news";

const Index = () => {
  const [mode, setMode] = useState<Mode>("chat");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* CHANGED: 
          1. Removed 'fixed top-0 left-0 right-0 z-50'.
          2. Kept the container styling so it looks the same, but now it sits at the top of the flow.
          3. Removed backdrop-blur since it won't float over content anymore.
      */}
      <header className="bg-background border-b border-border container max-w-4xl mx-auto px-4">
        <div className="py-6">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="text-accessible-2xl font-bold text-foreground">
                Your Daily Companion
              </h1>
              <p className="text-accessible-base text-muted-foreground mt-1">
                Chat with friends or catch up on news
              </p>
            </div>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* CHANGED: 
          1. Removed 'pt-44'. Since the header isn't fixed, we don't need to push the content down manually.
          2. Added 'py-6' for standard spacing.
      */}
      <main className="container max-w-4xl mx-auto px-4 py-6">
        <div className="bg-card rounded-b-3xl shadow-soft-lg overflow-hidden min-h-[calc(100vh-200px)]">
          {mode === "chat" ? <ChatView /> : <NewsReaderView />}
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