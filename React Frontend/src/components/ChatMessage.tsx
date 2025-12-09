import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  isNew?: boolean;
}

const ChatMessage = ({ content, role, isNew = false }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start",
        isNew && "animate-message-in"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <Bot className="w-5 h-5 text-secondary-foreground" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-bubble",
          isUser
            ? "bg-primary text-primary-foreground chat-shadow-user rounded-br-md"
            : "bg-ai-bubble text-ai-bubble-foreground chat-shadow-ai rounded-bl-md"
        )}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
