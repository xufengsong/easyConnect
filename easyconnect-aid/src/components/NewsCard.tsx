// @/pages/NewsCard.tsx
import { useState } from "react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  headline: string;
  summary: string;
  category: string;
  date: string;
  imageEmoji: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  currentIndex: number;
  totalCount: number;
}

const NewsCard = ({
  headline,
  summary,
  category,
  date,
  imageEmoji,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  currentIndex,
  totalCount,
}: NewsCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Mock playback - in real app would use Web Speech API
  };

  return (
    <div className="flex flex-col h-full animate-slide-up">
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <span className="px-4 py-2 bg-teal-light text-teal rounded-full text-accessible-sm font-semibold">
          {category}
        </span>
        <span className="text-accessible-sm text-muted-foreground">{date}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 text-center">
        <div className="text-7xl mb-8">{imageEmoji}</div>
        <h2 className="text-accessible-2xl font-bold text-foreground leading-tight mb-6">
          {headline}
        </h2>
        <p className="text-accessible-lg text-muted-foreground leading-relaxed max-w-2xl">
          {summary}
        </p>
      </div>

      {/* Playback Controls */}
      <div className="px-6 py-6 border-t border-border bg-cream-dark/30">
        <Button
          onClick={togglePlayback}
          className={cn(
            "w-full py-7 text-accessible-lg font-semibold rounded-2xl shadow-soft-lg transition-all duration-300",
            isPlaying
              ? "bg-coral hover:bg-coral-hover shadow-glow-coral"
              : "bg-teal hover:bg-teal/90"
          )}
          aria-label={isPlaying ? "Stop reading" : "Read this article to me"}
        >
          <span className="flex items-center gap-4">
            {isPlaying ? (
              <>
                <VolumeX className="w-7 h-7" />
                <span>Stop Reading</span>
              </>
            ) : (
              <>
                <Volume2 className="w-7 h-7" />
                <span>Read to Me</span>
              </>
            )}
          </span>
        </Button>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={!hasPrev}
            className="py-5 px-6 text-accessible-base rounded-xl border-2 disabled:opacity-40"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalCount }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  i === currentIndex ? "bg-teal w-8" : "bg-muted"
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={onNext}
            disabled={!hasNext}
            className="py-5 px-6 text-accessible-base rounded-xl border-2 disabled:opacity-40"
            aria-label="Next article"
          >
            Next
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </div>

        <p className="text-center text-accessible-sm text-muted-foreground mt-4">
          Article {currentIndex + 1} of {totalCount}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
