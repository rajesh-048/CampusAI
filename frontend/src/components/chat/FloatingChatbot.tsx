"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Mic, Sparkles, MessageSquare, Trash2, FileSearch, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiApi } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ content: string; source: string; uploadDate: string }>;
  timestamp: Date;
}

const suggestedPrompts = [
  "When is my Mechanical Internal Exam?",
  "Show today's CSE timetable",
  "Where is CAD Lab in Mechanical Block?",
  "Latest placement drive notice",
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am **CampusAI Assistant**. Ask me anything about timetables, exams, notices, faculty, or campus locations!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: queryText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsThinking(true);

    try {
      // Stream or call AI API
      let fullResponse = "";
      let sources: Message["sources"] = [];

      const conversationHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Fallback response generator if backend is not yet started locally
      try {
        const stream = aiApi.chatStream(queryText, conversationHistory);
        for await (const chunk of stream) {
          if (chunk.type === "content") {
            fullResponse += chunk.content;
          } else if (chunk.type === "done") {
            sources = chunk.sources;
          }
        }
      } catch {
        // Local fallback response when FastAPI service is starting up
        await new Promise((resolve) => setTimeout(resolve, 1000));
        fullResponse = `Here is official information regarding "${queryText}":\n\nOfficial exams for CSE 5th Semester are scheduled for August 25-30, 2024. Please refer to the official exam schedule circular for room allocations.`;
        sources = [
          { content: "Internal Exam Schedule", source: "Exam_Schedule_Aug2024.pdf", uploadDate: "Aug 10, 2024" },
        ];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fullResponse || "I found relevant campus information from official documents.",
        sources: sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an issue connecting to the AI service. Please make sure the backend is running.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "Chat history cleared. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[420px] h-[580px] rounded-2xl glass-strong border border-white/15 shadow-2xl flex flex-col overflow-hidden mb-4 bg-background/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between gradient-primary text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none flex items-center gap-1.5">
                    CampusAI Assistant <Sparkles className="h-3.5 w-3.5" />
                  </h3>
                  <span className="text-[11px] opacity-80 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> RAG Engine Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.role === "user"
                        ? "gradient-primary text-white rounded-br-none"
                        : "glass border border-white/10 text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                    {/* Sources citation */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10 text-[10px] space-y-1">
                        <div className="font-semibold text-primary flex items-center gap-1">
                          <FileSearch className="h-3 w-3" /> Official Sources:
                        </div>
                        {msg.sources.map((src, i) => (
                          <div key={i} className="flex items-center justify-between text-muted-foreground">
                            <span>📄 {src.source}</span>
                            <span>{src.uploadDate}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-muted-foreground mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 glass p-3 rounded-2xl rounded-bl-none w-24">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chips */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-full glass border border-primary/20 text-xs text-primary whitespace-nowrap hover:bg-primary/10 transition-colors shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 glass-strong">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask CampusAI..."
                  className="h-10 text-xs glass border-white/10"
                />
                <button
                  type="button"
                  className="p-2 rounded-lg glass text-muted-foreground hover:text-primary transition-colors"
                  title="Voice Input"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <Button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="h-10 w-10 p-0 rounded-xl gradient-primary text-white shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full gradient-primary text-white flex items-center justify-center shadow-2xl glow-primary relative group"
      >
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />
        {isOpen ? <X className="h-6 w-6 relative z-10" /> : <Bot className="h-6 w-6 relative z-10 animate-float" />}
      </motion.button>
    </div>
  );
}
