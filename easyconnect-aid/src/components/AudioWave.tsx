import { cn } from "@/lib/utils";

interface AudioWaveProps {
  isActive: boolean;
  className?: string;
}

const AudioWave = ({ isActive, className }: AudioWaveProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "w-2 rounded-full bg-coral transition-all duration-300",
            isActive ? "animate-wave" : "h-3"
          )}
          style={{
            height: isActive ? "24px" : "12px",
            animationDelay: isActive ? `${i * 0.15}s` : "0s",
          }}
        />
      ))}
    </div>
  );
};

export default AudioWave;
