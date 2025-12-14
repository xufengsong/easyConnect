// @/components/MatchView.tsx
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import HumanChatView from "./HumanChatView";
import axiosInstance from "../axiosInstance"

// --- Types ---
type MatchStatus = "idle" | "searching" | "connected";

interface UserProfile {
  name: string;
  similarity: string;
  avatarColor: string;
}

// --- Mock API Service ---
const mockMatchAPI = (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Alex Kim",
        similarity: "0.5",
        avatarColor: "bg-indigo-100 text-indigo-600",
      });
    }, 2500);
  });
};

const MatchView = () => {
  const [status, setStatus] = useState<MatchStatus>("idle");
  const [partner, setPartner] = useState<UserProfile | null>(null);

  const handleStartMatch = async () => {
    setStatus("searching");
    try {
      const result = await axiosInstance.get("/api/find-similar-friends/");
      setPartner({name: result.data.matches[0].name, similarity: result.data.matches[0].similarity_score, avatarColor: "bg-indigo-100 text-indigo-600"});
      setStatus("connected");
    } catch (error) {
      console.error("Matching failed", error);
      setStatus("idle");
    }
  };

  const handleBack = () => {
    setStatus("idle");
    setPartner(null);
  };

  // --- RENDERERS ---

  if (status === "idle") {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[500px]">
        <div className="bg-teal/10 p-6 rounded-full mb-6">
          <Sparkles className="w-12 h-12 text-teal" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Find a New Friend
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Connect seamlessly with someone new. We'll find a companion who shares your interests in seconds.
        </p>
        <button
          onClick={handleStartMatch}
          className="bg-teal hover:bg-teal/90 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md active:scale-95"
        >
          Start Matching
        </button>
      </div>
    );
  }

  if (status === "searching") {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 min-h-[500px]">
        <div className="relative">
          <div className="absolute inset-0 bg-teal/20 rounded-full animate-ping" />
          <div className="relative bg-background p-4 rounded-full border border-border shadow-sm">
            <Loader2 className="w-10 h-10 text-teal animate-spin" />
          </div>
        </div>
        <h3 className="mt-8 text-xl font-medium text-foreground">
          Looking for a companion...
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Analyzing interests...
        </p>
      </div>
    );
  }

  // Connected State: Delegate to HumanChatView
  if (status === "connected" && partner) {
    console.log("Partner's name is ", partner.name)
    return (
      <HumanChatView 
        partnerName={partner.name}
        similarity={partner.similarity}
        onBack={handleBack} 
      />
    );
  }

  return null; // Should not reach here
};

export default MatchView;