import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, History } from "lucide-react";
import logo from "@/assets/logo-horizontal.svg";
import { StorageService } from "@/lib/storageService";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

interface HeroProps {
  onStartWizard: () => void;
  onViewSaved?: () => void;
}

export const Hero = ({ onStartWizard, onViewSaved }: HeroProps) => {
  const savedCount = StorageService.getAllAnalyses().length;
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <LanguageToggle />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <img src={logo} alt="MoodTech Solutions" className="h-16 md:h-20" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/20 animate-fade-in-up delay-100">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">{t('hero.badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up delay-200">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            {t('hero.title1')}
          </span>
          <br />
          <span className="text-foreground">{t('hero.title2')}</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300">
          {t('hero.description')}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12 animate-fade-in-up delay-400">
          <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-1">5</div>
            <div className="text-sm text-muted-foreground">{t('hero.feature1')}</div>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-accent mb-1">3</div>
            <div className="text-sm text-muted-foreground">{t('hero.feature2')}</div>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-1">8</div>
            <div className="text-sm text-muted-foreground">{t('hero.feature3')}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up delay-500">
          <Button 
            onClick={onStartWizard}
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-cyan px-8"
          >
            {t('hero.startButton')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          {savedCount > 0 && onViewSaved && (
            <Button 
              onClick={onViewSaved}
              variant="outline"
              size="lg"
              className="border-primary/30 hover:bg-primary/10 text-primary relative"
            >
              <History className="mr-2 w-5 h-5" />
              {t('hero.savedButton')}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                {savedCount}
              </span>
            </Button>
          )}
        </div>

        {/* Trust Indicator */}
        <p className="text-sm text-muted-foreground pt-8 animate-fade-in-up delay-600">
          {t('hero.trustText')}
        </p>
      </div>
    </section>
  );
};
