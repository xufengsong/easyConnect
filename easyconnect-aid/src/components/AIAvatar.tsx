import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface AIAvatarProps {
  isListening?: boolean;
  className?: string;
}

const AIAvatar = ({ isListening, className }: AIAvatarProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-32 h-32 rounded-full bg-teal-light border-4 border-teal shadow-soft-lg transition-all duration-500",
        isListening && "animate-pulse-soft shadow-glow-teal",
        className
      )}
    >
      <Bot className="w-16 h-16 text-teal" strokeWidth={1.5} />
      {isListening && (
        <div className="absolute inset-0 rounded-full border-4 border-teal/30 animate-ping" />
      )}
    </div>
  );
};

export default AIAvatar;
