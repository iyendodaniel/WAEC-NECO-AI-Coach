import { BookOpen, Languages, Lightbulb, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeMessageProps {
  onExampleClick: (message: string) => void;
}

const features = [
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Learn in English, Yoruba, Igbo, Hausa, or Pidgin",
  },
  {
    icon: BookOpen,
    title: "Exam Preparation",
    description: "Get help with WAEC & NECO subjects",
  },
  {
    icon: Lightbulb,
    title: "Clear Explanations",
    description: "Complex topics made simple",
  },
];

const examplePrompts = [
  "Explain photosynthesis",
  "Solve quadratic equations", 
  "What is democracy?",
];

const WelcomeMessage = ({ onExampleClick }: WelcomeMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
        <MessageCircle className="w-10 h-10 text-primary" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Welcome to your <span className="gradient-text">AI Tutor</span>
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-8">
        Ask me anything about your WAEC/NECO subjects. I can explain concepts, solve problems, and help you prepare in your preferred language.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <feature.icon className="w-6 h-6 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {examplePrompts.map((example) => (
          <Button
            key={example}
            variant="outline"
            onClick={() => onExampleClick(example)}
            className="px-4 py-2 text-sm rounded-full bg-muted/30 text-foreground border border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:text-foreground transition-all duration-200"
          >
            {example}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;
