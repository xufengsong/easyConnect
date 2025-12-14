// @/components/HumanChatView.tsx
import { useState, useEffect, useRef } from "react";
import { Send, Phone, MoreVertical, Video, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UIMessage {
  id: string;
  message: string;
  isMe: boolean;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface HumanChatViewProps {
  partnerName?: string;
  similarity?: string;
  partnerId?: string;
  onBack?: () => void;
}

const HumanChatView = ({ 
  partnerName = "Alex Kim",
  similarity,
  onBack 
}: HumanChatViewProps) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPartnerTyping]);

  // Initial Mock Welcome Message
//   useEffect(() => {
//     setMessages([
//       {
//         id: "init-1",
//         message: `Hi there! I'm ${partnerName}. Nice to meet you!`,
//         isMe: false,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         status: "read"
//       }
//     ]);
//   }, [partnerName]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: UIMessage = {
      id: Date.now().toString(),
      message: inputValue,
      isMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // --- MOCK RESPONSE LOGIC ---
    // setIsPartnerTyping(true);
    // setTimeout(() => {
    //   setIsPartnerTyping(false);
    //   const reply: UIMessage = {
    //     id: (Date.now() + 1).toString(),
    //     message: "That's really interesting! Tell me more about it.",
    //     isMe: false,
    //     timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //     status: "read"
    //   };
    //   setMessages((prev) => [...prev, reply]);
    // }, 2000); 
  };

  return (
    // PARENT DIV: Flex container with full height (h-full or h-screen depending on usage)
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      
      {/* 1. HEADER (Top - Static Height) */}
      <div className="flex-none flex items-center justify-between px-6 py-4 border-b border-border bg-cream-dark/50 z-10">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
            {partnerName.charAt(0)}
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-foreground leading-none font-serif">
              {partnerName}
            </h2>
            {/* <p className="text-xs text-green-600 mt-1 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
              Online
            </p> */}
            <span className="w-0.5 h-3 bg-black/10"></span> {/* Separator */}
            <span className="text-indigo-600">
                ✨ {(parseFloat(similarity || "0") * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 2. CHAT AREA (Middle - Takes available space) */}
      {/* flex-1 ensures this section grows to fill space, pushing input to bottom */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-6 space-y-6 scroll-smooth bg-[#FDFCF8]">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex flex-col max-w-[75%] ${msg.isMe ? "items-end" : "items-start"}`}>
              <div 
                className={`px-5 py-3.5 text-[15px] shadow-sm leading-relaxed ${
                  msg.isMe 
                    ? "bg-teal text-white rounded-2xl rounded-tr-sm" 
                    : "bg-white border border-black/5 text-foreground rounded-2xl rounded-tl-sm"
                }`}
              >
                {msg.message}
              </div>
              <span className="text-[11px] text-muted-foreground mt-1.5 px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        
        {isPartnerTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-black/5 px-4 py-3 rounded-2xl rounded-tl-none text-muted-foreground text-sm shadow-sm">
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 3. INPUT SECTION (Bottom - End of Parent Div) */}
      <div className="flex-none p-4 pb-6 bg-[#FDFCF8] border-t border-black/5">
        <form 
          onSubmit={handleSendMessage}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message ${partnerName}...`}
            className="w-full bg-[#F3F0EA] text-foreground placeholder:text-muted-foreground/80 px-6 py-4 rounded-full outline-none focus:ring-1 focus:ring-black/5 transition-all pr-12 text-[15px]"
          />
          
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim()}
            className={`absolute right-2 w-10 h-10 rounded-full transition-all duration-200 ${
              inputValue.trim() 
                ? "bg-[#E8E3D9] hover:bg-[#DCD5C6] text-foreground" 
                : "bg-transparent text-muted-foreground/50"
            }`}
          >
            <Send className="w-5 h-5 ml-0.5" />
          </Button>
        </form>
      </div>

    </div>
  );
};

export default HumanChatView;