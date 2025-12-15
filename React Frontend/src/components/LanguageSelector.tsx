import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const languages = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "yoruba", label: "Yorùbá", flag: "🇳🇬" },
  { value: "igbo", label: "Igbo", flag: "🇳🇬" },
  { value: "hausa", label: "Hausa", flag: "🇳🇬" },
];

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const LanguageSelector = ({ value, onValueChange }: LanguageSelectorProps) => {
  const selectedLang = languages.find((l) => l.value === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[160px] md:w-[180px] bg-card border-border hover:bg-muted transition-colors">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <SelectValue>
            {selectedLang && (
              <span className="flex items-center gap-2">
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.label}</span>
              </span>
            )}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {languages.map((lang) => (
          <SelectItem
            key={lang.value}
            value={lang.value}
            className="hover:bg-muted focus:bg-muted cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
