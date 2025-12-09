// @/pages/ChatView.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIAvatar from "./AIAvatar";
import AudioWave from "./AudioWave";
import ChatMessage from "./ChatMessage";
import axiosInstance from "../axiosInstance";
import { RealtimeAgent, RealtimeSession } from '@openai/agents-realtime';

interface UIMessage {
  id: string;
  message: string;
  isAI: boolean;
  timestamp: string;
  status: 'in_progress' | 'completed' | 'error'; // Added status to help UI
}

const ChatView = () => {
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [conversationItems, setConversationItems] = useState<UIMessage[]>([]);
  
  const sessionRef = useRef<RealtimeSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationItems]);

  useEffect(() => {
    const initClient = async () => {
      try {
        const response = await axiosInstance.post("/api/get-voice-token/");
        const ephemeralKey = response.data.value; 

        if (!ephemeralKey) {
            console.error("No key received from backend", response.data);
            return;
        }

        const agent = new RealtimeAgent({
          name: 'Companion',
          // Instructing the model to be chatty helps with transcript generation
          instructions: 'You are a helpful, empathetic AI companion for an elderly user. Speak clearly and slowly.',
        });

        const session = new RealtimeSession(agent, {
          model: 'gpt-realtime', // Ensure you use a valid model ID
        });

        sessionRef.current = session;

        // --- UPDATED MAPPING LOGIC ---
        session.on('history_updated', () => {
          const items = session.history;

          const formattedItems: UIMessage[] = items
            .filter((item: any) => item.type === 'message')
            .map((item: any) => {
              const content = item.content || [];

              const textContent = content.find((c: any) => 
                ['text', 'input_text'].includes(c.type)
              )?.text;

              const audioTranscript = content.find((c: any) => 
                ['audio', 'input_audio', 'output_audio'].includes(c.type)
              )?.transcript;

              let finalMessage = "";

              // --- FIX: PRIORITY LOGIC ---
              if (item.role === 'assistant') {
                // For the AI, trust the audio transcript first (this streams in real-time)
                // Fallback to textContent only if audio is missing
                finalMessage = audioTranscript || textContent || (item.status === 'completed' ? "..." : "Speaking...");
              } else {
                // For the User, we usually have input_audio
                finalMessage = audioTranscript || textContent || "...";
              }

              return {
                id: item.id,
                isAI: item.role === 'assistant',
                message: finalMessage,
                status: item.status,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
            });

          setConversationItems(formattedItems);
        });
        
        try {
            await session.connect({ apiKey: ephemeralKey });
            setIsConnected(true);
            console.log("Session connected via WebRTC");
            setIsListening(true); 
        } catch (e) {
            console.error("Error connecting to voice agent:", e);
        }

        session.on('error', (event: any) => console.error("Realtime error:", event));

      } catch (e) {
        console.error("Error connecting to voice agent:", e);
      }
    };

    initClient();

    return () => {
      if (sessionRef.current) {
          // @ts-ignore
          sessionRef.current.close(); 
      }
    };
  }, []);

  const toggleListening = useCallback(() => {
    const session = sessionRef.current;
    if (!session || !isConnected) return;

    const willBeListening = !isListening;
    setIsListening(willBeListening);

    if (willBeListening) {
        session.mute(false);
    } else {
        session.mute(true);
        session.interrupt();
    }
  }, [isListening, isConnected]);

  return (
    // ADDED: min-h-0 prevents flex items from overflowing their container
    // ENSURE: The parent of this component has a fixed height (e.g., h-screen)
    <div className="flex flex-col h-full min-h-0 bg-background">
      
      {/* AI Avatar Section - Fixed Header */}
      <div className="flex-none flex flex-col items-center py-6 border-b border-border bg-cream-dark/50">
        <AIAvatar isListening={isListening} />
        <h2 className="mt-4 text-accessible-xl font-semibold text-foreground">
          Your AI Companion
        </h2>
        <p className="text-accessible-base text-muted-foreground mt-1">
          {!isConnected ? (
             <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4"/> Connecting...
             </span>
          ) : isListening ? (
             "I'm listening..." 
          ) : (
             "Press the button to talk to me"
          )}
        </p>
        <AudioWave isActive={isListening && isConnected} className="mt-4 h-8" />
      </div>

      {/* Chat Messages - Scrollable Area */}
      {/* ADDED: min-h-0 to allow scrolling inside flex child */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6 space-y-6 scroll-smooth">
        {conversationItems.length === 0 ? (
           <div className="text-center text-muted-foreground italic mt-10">
             Start the conversation by saying hello!
           </div>
        ) : (
             conversationItems.map((msg) => (
             <ChatMessage
                key={msg.id}
                message={msg.message}
                isAI={msg.isAI}
                timestamp={msg.timestamp}
             />
             ))
        )}
        {/* Invisible anchor for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Press to Speak Button - Fixed Footer */}
      <div className="flex-none p-6 border-t border-border bg-cream-dark/30">
        <Button
          onClick={toggleListening}
          disabled={!isConnected}
          className={`w-full py-8 text-accessible-lg font-semibold rounded-2xl shadow-soft-lg transition-all duration-300 ${
            isListening
              ? "bg-coral hover:bg-coral-hover shadow-glow-coral"
              : "bg-teal hover:bg-teal/90 shadow-glow-teal"
          }`}
          aria-label={isListening ? "Stop speaking" : "Press to speak"}
        >
          <span className="flex items-center gap-4">
            {isListening ? (
              <>
                <MicOff className="w-8 h-8" />
                <span>Tap to Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8" />
                <span>Press to Speak</span>
              </>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ChatView;