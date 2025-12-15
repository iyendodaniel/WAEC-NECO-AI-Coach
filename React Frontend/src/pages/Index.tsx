import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import WelcomeMessage from "@/components/WelcomeMessage";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState("english");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8001/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: content, language }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON from server");
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: "assistant",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Error contacting AI:", error);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${error.message}`, // shows actual backend error
        role: "assistant",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <WelcomeMessage onExampleClick={handleSendMessage} />
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  role={message.role}
                  isNew={index === messages.length - 1}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
            <p className="text-center text-xs text-muted-foreground mt-3">
              Currently using: <span className="text-primary capitalize">{language}</span> • AI responses come from backend
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
