import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 w-full justify-start animate-message-in">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
        <Bot className="w-5 h-5 text-secondary-foreground" />
      </div>
      
      <div className="bg-ai-bubble px-5 py-4 rounded-bubble rounded-bl-md chat-shadow-ai">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-ai-bubble-foreground/60 rounded-full typing-dot" />
          <span className="w-2 h-2 bg-ai-bubble-foreground/60 rounded-full typing-dot" />
          <span className="w-2 h-2 bg-ai-bubble-foreground/60 rounded-full typing-dot" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
