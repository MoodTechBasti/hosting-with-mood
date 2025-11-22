import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
      className="fixed top-4 right-4 z-50 border-border hover:bg-card/50 gap-2"
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">{language === 'de' ? 'EN' : 'DE'}</span>
    </Button>
  );
};
