import LanguageSelector from "./LanguageSelector";
import { GraduationCap, Sparkles } from "lucide-react";

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  return (
    <header className="w-full px-4 py-4 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <Sparkles className="w-3 h-3 text-secondary absolute -top-1 -right-1 animate-pulse-soft" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold gradient-text">
              WAEC/NECO AI Coach
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              Your multilingual learning assistant
            </p>
          </div>
        </div>

        <LanguageSelector value={language} onValueChange={onLanguageChange} />
      </div>
    </header>
  );
};

export default Header;
