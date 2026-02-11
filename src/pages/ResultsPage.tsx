import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<number, string> = {
  0: "Thank you for sharing your situation. Based on what you've described, there are a few housing assistance programs that might help you.\n\nWould you like me to walk you through the options available in your area?",
  1: "Great! Here are some programs to consider:\n\n• **Housing Choice Vouchers (Section 8)** — Helps cover rent in private housing.\n• **Affordable Housing Programs** — Income-based units with capped rent.\n• **Emergency Rental Assistance** — Short-term help if you're behind on rent.\n\nWould you like details on any of these?",
  2: "I'd recommend starting with the Housing Choice Voucher program. You'll need to:\n\n1. Contact your local Public Housing Authority (PHA)\n2. Complete a pre-application form\n3. Provide income and household documentation\n\nWould you like help locating your nearest PHA?",
};

const quickReplies = ["Yes", "No", "Tell me more"];

const ResultsPage = () => {
  const location = useLocation();
  const initialMessage = (location.state as { initialMessage?: string })?.initialMessage;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [responseIndex, setResponseIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      const userMsg: Message = { id: "1", role: "user", content: initialMessage };
      const botMsg: Message = { id: "2", role: "assistant", content: mockResponses[0] || "I'm here to help you find housing assistance." };
      setMessages([userMsg, botMsg]);
      setResponseIndex(1);
    }
  }, [initialMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    const botContent = mockResponses[responseIndex] || "Thank you for your message. A housing specialist would typically review this and get back to you with personalized guidance.";
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: botContent };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setResponseIndex((i) => i + 1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-12">
            Start a conversation from the home page.
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex gap-2 max-w-[85%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-accent" />
              </div>
            )}
            {msg.role === "user" && (
              <Avatar className="w-7 h-7 shrink-0 mt-1">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  <User className="w-3.5 h-3.5" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border rounded-bl-md"
              )}
              dangerouslySetInnerHTML={{
                __html: msg.content
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {messages.length > 0 && (
        <div className="flex gap-2 px-4 pb-2">
          {quickReplies.map((reply) => (
            <Button
              key={reply}
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => sendMessage(reply)}
            >
              {reply}
            </Button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex gap-2 items-end rounded-xl border border-border bg-card p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a follow-up question..."
            className="flex-1 resize-none border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[36px] max-h-[100px] py-1.5 px-2"
            rows={1}
          />
          <Button
            size="icon"
            className="h-8 w-8 rounded-full shrink-0"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
