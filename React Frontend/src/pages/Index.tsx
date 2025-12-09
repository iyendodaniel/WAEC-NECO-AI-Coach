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

// Simulated AI responses for demo
const simulatedResponses: Record<string, string[]> = {
  english: [
    "Great question! Let me explain this concept clearly for you.\n\nPhotosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. It occurs mainly in the leaves where chlorophyll absorbs light energy.\n\nThe equation is:\n6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\nWould you like me to explain any part in more detail?",
    "I understand you're preparing for your exams. Here's a step-by-step breakdown:\n\n1. First, identify what the question is asking\n2. List the relevant formulas or concepts\n3. Apply them systematically\n4. Check your answer\n\nPractice makes perfect! Do you have a specific question you'd like me to help solve?",
    "That's an important topic! Democracy is a system of government where citizens exercise power by voting. Key features include:\n\n• Free and fair elections\n• Rule of law\n• Protection of human rights\n• Separation of powers\n\nIn Nigeria, we practice a presidential democracy. Would you like to know more about how it works?",
  ],
  yoruba: [
    "Ibeere rẹ dara! Jẹ́ kí n ṣàlàyé fún ọ.\n\nPhotosynthesis jẹ́ ọ̀nà tí àwọn ewéko fi ń lo ìmọ́lẹ̀ oòrùn, omi, àti carbon dioxide láti ṣe oúnjẹ (glucose) àti oxygen.\n\nỌ̀rọ̀ yìí ń ṣẹlẹ̀ ní ewé àwọn ohun ọ̀gbìn nítorí pé chlorophyll wà níbẹ̀.\n\nṢé o fẹ́ kí n ṣàlàyé síi?",
  ],
  pidgin: [
    "Na good question you ask oh! Make I explain am for you.\n\nPhotosynthesis na the way wey plants dey use sunlight, water, and carbon dioxide take make food and oxygen. E dey happen for the leaves where chlorophyll dey.\n\nThe thing be like:\n6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\nYou want make I explain any part more?",
  ],
  hausa: [
    "Tambayar ka/ki tana da kyau! Bari in bayyana maka/miki.\n\nPhotosynthesis shine hanyar da tsirrai ke amfani da hasken rana, ruwa, da carbon dioxide don ƙirƙirar abinci (glucose) da oxygen.\n\nWannan yana faruwa a cikin ganye inda chlorophyll yake.\n\nKuna so in ƙara bayani?",
  ],
  igbo: [
    "Ajụjụ gị dị mma! Ka m kọwaa ya nke ọma.\n\nPhotosynthesis bụ usoro osisi si eji ìhè anyanwụ, mmiri, na carbon dioxide mee nri (glucose) na oxygen.\n\nNke a na-eme n'akwụkwọ nri ebe chlorophyll nọ.\n\nỊ chọrọ ka m kọwaa ihe ọzọ?",
  ],
};

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

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const responses = simulatedResponses[language] || simulatedResponses.english;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: randomResponse,
      role: "assistant",
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Messages Area */}
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

        {/* Input Area */}
        <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
            <p className="text-center text-xs text-muted-foreground mt-3">
              Currently using: <span className="text-primary capitalize">{language}</span> • AI responses are simulated for demo
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
