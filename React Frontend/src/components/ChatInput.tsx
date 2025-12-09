import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-end gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border input-glow">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your question... (e.g., 'Explain photosynthesis in Yoruba')"
          className="flex-1 min-h-[50px] max-h-[150px] bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 text-foreground"
          disabled={disabled}
        />
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 h-11 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="w-4 h-4 mr-2" />
          Ask AI Tutor
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
