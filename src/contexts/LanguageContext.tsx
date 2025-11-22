import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'de') ? saved : 'de';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, any> = {
  de: {
    hero: {
      badge: 'Intelligente Hosting-Entscheidungen',
      title1: 'Persönlicher Hosting-',
      title2: 'Entscheidungsassistent',
      description: 'Finden Sie in weniger als 3 Minuten die perfekte Hosting-Lösung für Ihr Projekt. Wissenschaftlich fundiert, praxiserprobt, konkret umsetzbar.',
      feature1: 'Einfache Schritte',
      feature2: 'Konkrete Empfehlungen',
      feature3: 'Hosting-Kategorien',
      startButton: 'Jetzt starten',
      savedButton: 'Gespeicherte Analysen',
      trustText: 'Entwickelt von MoodTech Solutions – Ihr Partner für digitale Exzellenz'
    },
    wizard: {
      step: 'Schritt',
      of: 'von',
      back: 'Zurück',
      next: 'Weiter',
      savedAnalyses: 'Gespeicherte Analysen',
      showRecommendations: 'Empfehlungen anzeigen',
      backToHome: 'Zurück zur Startseite'
    },
    step1: {
      title: 'Projekt & Ziel',
      description: 'Erzählen Sie uns mehr über Ihr Projekt',
      projectType: 'Projekttyp (Mehrfachauswahl möglich)',
      targetAudience: 'Zielgruppe',
      mainGoal: 'Hauptziel',
      paymentModel: 'Bezahlmodell (Projekt)',
      types: {
        landingpage: 'Landingpage',
        company: 'Firmenwebsite',
        blog: 'Blog/Magazin',
        webapp: 'Web-App / SaaS',
        automation: 'Automation / Backend-only',
        migration: 'Migration/Redesign'
      },
      targets: {
        own: 'Eigennutzung',
        existing: 'Bestandskunde',
        new: 'Neukunde',
        internal: 'Internes Testprojekt'
      },
      goals: {
        leads: 'Leadgenerierung',
        branding: 'Online-Präsenz / Branding',
        content: 'Information / Content',
        automation: 'Automatisierung',
        unclear: 'Unklar'
      },
      payment: {
        fixed: 'Pauschale',
        monthly: 'Monatlich (Retainer)',
        performance: 'Performance-basiert',
        own: 'Eigenprojekt'
      }
    },
    toast: {
      generating: 'Generiere Empfehlungen...',
      researching: '🔍 Recherchiere aktuelle Preise von Anbieter-Websites...',
      researchSuccess: '✅ {count} Anbieter-Preise live recherchiert',
      researchError: '⚠️ Preis-Recherche fehlgeschlagen, verwende Fallback-Daten',
      saved: 'Analyse gespeichert'
    }
  },
  en: {
    hero: {
      badge: 'Intelligent Hosting Decisions',
      title1: 'Personal Hosting',
      title2: 'Decision Assistant',
      description: 'Find the perfect hosting solution for your project in less than 3 minutes. Scientifically based, proven in practice, ready to implement.',
      feature1: 'Simple Steps',
      feature2: 'Concrete Recommendations',
      feature3: 'Hosting Categories',
      startButton: 'Get Started',
      savedButton: 'Saved Analyses',
      trustText: 'Developed by MoodTech Solutions – Your partner for digital excellence'
    },
    wizard: {
      step: 'Step',
      of: 'of',
      back: 'Back',
      next: 'Next',
      savedAnalyses: 'Saved Analyses',
      showRecommendations: 'Show Recommendations',
      backToHome: 'Back to Home'
    },
    step1: {
      title: 'Project & Goal',
      description: 'Tell us more about your project',
      projectType: 'Project Type (Multiple selection possible)',
      targetAudience: 'Target Audience',
      mainGoal: 'Main Goal',
      paymentModel: 'Payment Model (Project)',
      types: {
        landingpage: 'Landing Page',
        company: 'Company Website',
        blog: 'Blog/Magazine',
        webapp: 'Web App / SaaS',
        automation: 'Automation / Backend-only',
        migration: 'Migration/Redesign'
      },
      targets: {
        own: 'Own Use',
        existing: 'Existing Customer',
        new: 'New Customer',
        internal: 'Internal Test Project'
      },
      goals: {
        leads: 'Lead Generation',
        branding: 'Online Presence / Branding',
        content: 'Information / Content',
        automation: 'Automation',
        unclear: 'Unclear'
      },
      payment: {
        fixed: 'Fixed Price',
        monthly: 'Monthly (Retainer)',
        performance: 'Performance-based',
        own: 'Own Project'
      }
    },
    toast: {
      generating: 'Generating recommendations...',
      researching: '🔍 Researching current prices from provider websites...',
      researchSuccess: '✅ {count} provider prices researched live',
      researchError: '⚠️ Price research failed, using fallback data',
      saved: 'Analysis saved'
    }
  }
};
