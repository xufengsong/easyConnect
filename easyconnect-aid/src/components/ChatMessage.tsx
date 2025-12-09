import { cn } from "@/lib/utils";
import AIAvatar from "./AIAvatar";

interface ChatMessageProps {
  message: string;
  isAI: boolean;
  timestamp?: string;
}

const ChatMessage = ({ message, isAI, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 animate-fade-in",
        isAI ? "flex-row" : "flex-row-reverse"
      )}
    >
      {isAI && (
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-teal-light flex items-center justify-center">
            <span className="text-accessible-lg">🤖</span>
          </div>
        </div>
      )}
      <div
        className={cn(
          "flex flex-col gap-2 max-w-[75%]",
          !isAI && "items-end"
        )}
      >
        <div
          className={cn(
            "px-6 py-4 rounded-2xl shadow-soft",
            isAI
              ? "bg-card border border-border rounded-tl-sm"
              : "bg-teal text-primary-foreground rounded-tr-sm"
          )}
        >
          <p className="text-accessible-base leading-relaxed">{message}</p>
        </div>
        {timestamp && (
          <span className="text-accessible-sm text-muted-foreground px-2">
            {timestamp}
          </span>
        )}
      </div>
      {!isAI && (
        <div className="flex-shrink-0">
          {/* <div className="w-14 h-14 rounded-full bg-coral/20 flex items-center justify-center"> */}
            {/* <span className="text-accessible-lg">👤</span> */}
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
