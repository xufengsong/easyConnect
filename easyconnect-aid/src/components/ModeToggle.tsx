import { MessageCircle, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "chat" | "news";

interface ModeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const ModeToggle = ({ mode, onChange }: ModeToggleProps) => {
  return (
    <div className="flex items-center justify-center p-2 bg-secondary rounded-2xl shadow-soft">
      <button
        onClick={() => onChange("chat")}
        className={cn(
          "flex items-center gap-3 px-8 py-5 rounded-xl text-accessible-lg font-semibold transition-all duration-300",
          mode === "chat"
            ? "bg-teal text-primary-foreground shadow-soft-lg"
            : "text-foreground hover:bg-muted"
        )}
        aria-pressed={mode === "chat"}
        aria-label="Switch to Companion Chat mode"
      >
        <MessageCircle className="w-7 h-7" />
        <span>Companion Chat</span>
      </button>
      <button
        onClick={() => onChange("news")}
        className={cn(
          "flex items-center gap-3 px-8 py-5 rounded-xl text-accessible-lg font-semibold transition-all duration-300",
          mode === "news"
            ? "bg-teal text-primary-foreground shadow-soft-lg"
            : "text-foreground hover:bg-muted"
        )}
        aria-pressed={mode === "news"}
        aria-label="Switch to News Reader mode"
      >
        <Newspaper className="w-7 h-7" />
        <span>News Reader</span>
      </button>
    </div>
  );
};

export default ModeToggle;
