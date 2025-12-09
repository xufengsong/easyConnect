import { useState } from "react";
import NewsCard from "./NewsCard";

const mockNews = [
  {
    id: 1,
    headline: "Local Community Garden Wins National Award",
    summary: "The Sunshine Community Garden has been recognized for bringing neighbors together and growing fresh produce for local food banks.",
    category: "Community",
    date: "Today",
    imageEmoji: "🌻",
  },
  {
    id: 2,
    headline: "New Walking Trail Opens at Riverside Park",
    summary: "A beautiful new accessible walking path with benches every 100 meters is now open for visitors of all mobility levels.",
    category: "Local News",
    date: "Yesterday",
    imageEmoji: "🚶",
  },
  {
    id: 3,
    headline: "Senior Center Offers Free Technology Classes",
    summary: "Learn to video call your grandchildren, send photos, and stay connected with easy-to-follow lessons every Tuesday morning.",
    category: "Events",
    date: "This Week",
    imageEmoji: "📱",
  },
  {
    id: 4,
    headline: "Weather: Sunny Skies Expected This Weekend",
    summary: "Perfect weather for outdoor activities with temperatures around 72°F. Great time for a picnic or garden work!",
    category: "Weather",
    date: "Forecast",
    imageEmoji: "☀️",
  },
];

const NewsReaderView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < mockNews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentNews = mockNews[currentIndex];

  return (
    <div className="h-full">
      <NewsCard
        key={currentNews.id}
        headline={currentNews.headline}
        summary={currentNews.summary}
        category={currentNews.category}
        date={currentNews.date}
        imageEmoji={currentNews.imageEmoji}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < mockNews.length - 1}
        hasPrev={currentIndex > 0}
        currentIndex={currentIndex}
        totalCount={mockNews.length}
      />
    </div>
  );
};

export default NewsReaderView;
