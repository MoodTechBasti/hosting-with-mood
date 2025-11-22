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
    },
    step2: {
      title: 'Technik & Daten',
      description: 'Technische Details und Datenanforderungen',
      techType: 'Code-/Technik-Art',
      techStackLabel: 'Konkreter Tech-Stack (Optional)',
      techStackPlaceholder: 'z.B. Next.js + Node Backend, WordPress + WooCommerce, n8n + Webhook...',
      dataProcessing: 'Datenverarbeitung',
      databaseNeed: 'Datenbankbedarf',
      types: {
        static: 'Statisches HTML/JS/CSS',
        cms: 'CMS (WordPress, Typo3, etc.)',
        framework: 'Frontend-Framework (React/Next.js, Vue/Nuxt, Svelte)',
        backend: 'Backend/API (Node, Laravel, Django, Rails)',
        nocode: 'No-Code/Low-Code (Webflow, Framer, n8n)',
        mixed: 'Gemischt',
        unclear: 'Unklar'
      },
      processing: {
        none: 'Keine personenbezogenen Daten',
        contact: 'Kontaktformular (Name, Mail, Nachricht)',
        accounts: 'Benutzeraccounts/Logins',
        payments: 'Zahlungsdaten (Shop, Abo, Spenden)',
        sensitive: 'Gesundheits-/Finanz-/sensible Daten',
        unclear: 'Unklar'
      },
      database: {
        none: 'Keine',
        simple: 'Einfache DB (Kontaktleads, einfache User)',
        complex: 'Komplex (mehrere Services, Reporting)',
        unclear: 'Unklar'
      }
    },
    step3: {
      title: 'Nutzung & Last',
      description: 'Traffic-Erwartungen und Performance-Anforderungen',
      monthlyVisitors: 'Monatliche Besucher (Schätzung)',
      trafficSources: 'Traffic-Quelle(n)',
      downtimeTolerance: 'Ausfall-Toleranz',
      performance: 'Performance-Anforderung',
      visitors: {
        low: 'Unter 5.000',
        medium: '5.000 - 50.000',
        high: 'Über 50.000',
        unknown: 'Unbekannt'
      },
      traffic: {
        seo: 'SEO',
        ads: 'Paid Ads (Google, Meta)',
        social: 'Social Media',
        email: 'E-Mail-Kampagnen',
        internal: 'Intern / Direktzugriffe'
      },
      downtime: {
        none: 'Egal (Test, internes Tool)',
        acceptable: 'Kurze Ausfälle verkraftbar',
        critical: 'Kritisch während Kampagnen',
        always: 'Geschäftskritisch (24/7)'
      },
      performanceOptions: {
        basic: 'Basis',
        basicDesc: 'Seite darf sich "normal" anfühlen',
        fast: 'Schnell',
        fastDesc: 'Marketing, SEO wichtig',
        veryFast: 'Sehr schnell',
        veryFastDesc: 'Core Web Vitals, international'
      }
    },
    step4: {
      title: 'Budget & Verantwortung',
      description: 'Finanzielle und organisatorische Rahmenbedingungen',
      hostingBudget: 'Hosting-Budget (monatlich)',
      contractOwner: 'Vertragsbesitzer',
      maintenance: 'Wartungsverantwortung',
      clientTech: 'Technikaffinität Kunde',
      contract: {
        client: 'Kunde',
        agency: 'Ich (Agentur/Freelancer)',
        transfer: 'Zunächst ich, später Übergabe',
        unclear: 'Unklar'
      },
      maintenanceOptions: {
        client: 'Kunde selbst',
        paid: 'Ich (bezahlt)',
        unpaid: 'Ich (unbezahlt)',
        unclear: 'Unklar'
      },
      affinity: {
        low: 'Hat Angst vor Logins',
        medium: 'Kann mit Anleitung arbeiten',
        high: 'Technisch versiert',
        expert: 'Kann DNS/Hosting verwalten'
      }
    },
    step5: {
      title: 'Recht & Zukunft',
      description: 'Compliance und langfristige Planung',
      dataProtection: 'Datenschutz-Anforderungen',
      serverLocation: 'Server-Standort-Priorität',
      growth: 'Wachstumspotential',
      lifetime: 'Lebensdauer des Projekts',
      protection: {
        standard: 'Standard',
        standardDesc: 'Kontaktformular, Newsletter',
        sensitive: 'Sensible Daten',
        sensitiveDesc: 'Gesundheit, Finanzen',
        industry: 'Branchenvorgaben',
        industryDesc: 'Versicherung, Medizin, Finanz',
        unclear: 'Unklar',
        unclearDesc: 'Beratung erforderlich'
      },
      location: {
        de: 'Deutschland bevorzugt',
        eu: 'EU/EEA ausreichend',
        global: 'Weltweit (DSGVO-konform)',
        any: 'Egal'
      },
      growthOptions: {
        small: 'Klein',
        smallDesc: 'Lokale Präsenz',
        medium: 'Mittel',
        mediumDesc: 'Regionale Kampagnen',
        high: 'Hoch',
        highDesc: 'Starkes Wachstum geplant',
        unknown: 'Unbekannt',
        unknownDesc: 'Schwer einzuschätzen'
      },
      lifetimeOptions: {
        short: '< 6 Monate',
        medium: '6-24 Monate',
        long: '> 24 Monate',
        unclear: 'Unklar'
      }
    },
    wizardProgress: {
      step: 'Schritt',
      of: 'von',
      steps: {
        step1: 'Projekt & Ziel',
        step2: 'Technik & Daten',
        step3: 'Nutzung & Last',
        step4: 'Budget & Verantwortung',
        step5: 'Recht & Zukunft'
      }
    },
    results: {
      title: 'Ihre Hosting-Empfehlungen',
      subtitle: 'Basierend auf Ihren Angaben haben wir die optimalen Hosting-Lösungen für Ihr Projekt identifiziert',
      projectSummary: 'Projekt-Zusammenfassung',
      exportPDF: 'Als PDF exportieren',
      exportJSON: 'Als JSON exportieren',
      share: 'Teilen',
      newAnalysis: 'Neue Analyse starten',
      topRecommendations: 'Top 3 Empfehlungen',
      researchedPrices: '🔍 Recherchierte Aktuelle Preise',
      source: 'Quelle',
      asOf: 'Stand',
      note: 'Wichtiger Hinweis',
      noteText: 'Diese Empfehlungen basieren auf Ihren Angaben und allgemeinen Best Practices. Kosten und Verfügbarkeit können variieren. Prüfen Sie vor der Entscheidung die aktuellen Anbieter-Websites und kontaktieren Sie uns bei Fragen.',
      pdfInfo: 'PDF-Export wird in der nächsten Version verfügbar sein',
      jsonExported: 'Empfehlungen als JSON exportiert',
      copied: 'Zusammenfassung in Zwischenablage kopiert'
    },
    saved: {
      title: 'Gespeicherte Analysen',
      empty: 'Noch keine gespeicherten Analysen vorhanden',
      emptyDesc: 'Ihre Analysen werden automatisch gespeichert und hier angezeigt',
      compareInfo: 'von {total} Analysen • Wählen Sie 2-3 für den Vergleich',
      compare: '{count} Analysen vergleichen',
      deleted: 'Analyse gelöscht',
      updated: 'Name aktualisiert',
      maxCompare: 'Maximal 3 Analysen können verglichen werden',
      minCompare: 'Mindestens 2 Analysen zum Vergleichen auswählen',
      topRecommendation: 'Top-Empfehlung',
      budget: 'Budget',
      selected: 'Ausgewählt für Vergleich'
    },
    comparison: {
      title: 'Analysen-Vergleich',
      subtitle: 'Vergleichen Sie {count} Projekt-Analysen nebeneinander',
      analysis: 'Analyse',
      criteria: 'Kriterium',
      projectType: 'Projekttyp',
      budgetMonth: 'Budget/Monat',
      monthlyVisitors: 'Monatliche Besucher',
      topRecommendation: '🏆 Top-Empfehlung',
      costRange: 'Kostenrahmen',
      complexity: 'Komplexität',
      simple: 'Einfach',
      medium: 'Mittel',
      complex: 'Komplex',
      dataProtection: 'Datenschutz',
      serverLocation: 'Serverstandort',
      growth: 'Wachstumspotential',
      detailedRecs: 'Detaillierte Empfehlungen'
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
    },
    step2: {
      title: 'Technology & Data',
      description: 'Technical details and data requirements',
      techType: 'Code/Tech Type',
      techStackLabel: 'Specific Tech Stack (Optional)',
      techStackPlaceholder: 'e.g. Next.js + Node Backend, WordPress + WooCommerce, n8n + Webhook...',
      dataProcessing: 'Data Processing',
      databaseNeed: 'Database Requirements',
      types: {
        static: 'Static HTML/JS/CSS',
        cms: 'CMS (WordPress, Typo3, etc.)',
        framework: 'Frontend Framework (React/Next.js, Vue/Nuxt, Svelte)',
        backend: 'Backend/API (Node, Laravel, Django, Rails)',
        nocode: 'No-Code/Low-Code (Webflow, Framer, n8n)',
        mixed: 'Mixed',
        unclear: 'Unclear'
      },
      processing: {
        none: 'No personal data',
        contact: 'Contact form (Name, Email, Message)',
        accounts: 'User accounts/Logins',
        payments: 'Payment data (Shop, Subscription, Donations)',
        sensitive: 'Health/Financial/Sensitive data',
        unclear: 'Unclear'
      },
      database: {
        none: 'None',
        simple: 'Simple DB (Contact leads, simple users)',
        complex: 'Complex (multiple services, reporting)',
        unclear: 'Unclear'
      }
    },
    step3: {
      title: 'Usage & Load',
      description: 'Traffic expectations and performance requirements',
      monthlyVisitors: 'Monthly Visitors (Estimate)',
      trafficSources: 'Traffic Source(s)',
      downtimeTolerance: 'Downtime Tolerance',
      performance: 'Performance Requirements',
      visitors: {
        low: 'Under 5,000',
        medium: '5,000 - 50,000',
        high: 'Over 50,000',
        unknown: 'Unknown'
      },
      traffic: {
        seo: 'SEO',
        ads: 'Paid Ads (Google, Meta)',
        social: 'Social Media',
        email: 'Email Campaigns',
        internal: 'Internal / Direct Access'
      },
      downtime: {
        none: 'Not important (Test, internal tool)',
        acceptable: 'Short downtimes acceptable',
        critical: 'Critical during campaigns',
        always: 'Business-critical (24/7)'
      },
      performanceOptions: {
        basic: 'Basic',
        basicDesc: 'Page can feel "normal"',
        fast: 'Fast',
        fastDesc: 'Marketing, SEO important',
        veryFast: 'Very fast',
        veryFastDesc: 'Core Web Vitals, international'
      }
    },
    step4: {
      title: 'Budget & Responsibility',
      description: 'Financial and organizational framework',
      hostingBudget: 'Hosting Budget (monthly)',
      contractOwner: 'Contract Owner',
      maintenance: 'Maintenance Responsibility',
      clientTech: 'Client Tech Affinity',
      contract: {
        client: 'Client',
        agency: 'Me (Agency/Freelancer)',
        transfer: 'Initially me, later handover',
        unclear: 'Unclear'
      },
      maintenanceOptions: {
        client: 'Client themselves',
        paid: 'Me (paid)',
        unpaid: 'Me (unpaid)',
        unclear: 'Unclear'
      },
      affinity: {
        low: 'Afraid of logins',
        medium: 'Can work with guidance',
        high: 'Technically savvy',
        expert: 'Can manage DNS/hosting'
      }
    },
    step5: {
      title: 'Legal & Future',
      description: 'Compliance and long-term planning',
      dataProtection: 'Data Protection Requirements',
      serverLocation: 'Server Location Priority',
      growth: 'Growth Potential',
      lifetime: 'Project Lifetime',
      protection: {
        standard: 'Standard',
        standardDesc: 'Contact form, newsletter',
        sensitive: 'Sensitive Data',
        sensitiveDesc: 'Health, finance',
        industry: 'Industry Requirements',
        industryDesc: 'Insurance, medical, finance',
        unclear: 'Unclear',
        unclearDesc: 'Consultation required'
      },
      location: {
        de: 'Germany preferred',
        eu: 'EU/EEA sufficient',
        global: 'Worldwide (GDPR-compliant)',
        any: 'Any'
      },
      growthOptions: {
        small: 'Small',
        smallDesc: 'Local presence',
        medium: 'Medium',
        mediumDesc: 'Regional campaigns',
        high: 'High',
        highDesc: 'Strong growth planned',
        unknown: 'Unknown',
        unknownDesc: 'Hard to estimate'
      },
      lifetimeOptions: {
        short: '< 6 months',
        medium: '6-24 months',
        long: '> 24 months',
        unclear: 'Unclear'
      }
    },
    wizardProgress: {
      step: 'Step',
      of: 'of',
      steps: {
        step1: 'Project & Goal',
        step2: 'Technology & Data',
        step3: 'Usage & Load',
        step4: 'Budget & Responsibility',
        step5: 'Legal & Future'
      }
    },
    results: {
      title: 'Your Hosting Recommendations',
      subtitle: 'Based on your information, we have identified the optimal hosting solutions for your project',
      projectSummary: 'Project Summary',
      exportPDF: 'Export as PDF',
      exportJSON: 'Export as JSON',
      share: 'Share',
      newAnalysis: 'Start New Analysis',
      topRecommendations: 'Top 3 Recommendations',
      researchedPrices: '🔍 Researched Current Prices',
      source: 'Source',
      asOf: 'As of',
      note: 'Important Note',
      noteText: 'These recommendations are based on your information and general best practices. Costs and availability may vary. Check current provider websites before making a decision and contact us if you have questions.',
      pdfInfo: 'PDF export will be available in the next version',
      jsonExported: 'Recommendations exported as JSON',
      copied: 'Summary copied to clipboard'
    },
    saved: {
      title: 'Saved Analyses',
      empty: 'No saved analyses yet',
      emptyDesc: 'Your analyses will be automatically saved and displayed here',
      compareInfo: 'of {total} analyses • Select 2-3 for comparison',
      compare: 'Compare {count} analyses',
      deleted: 'Analysis deleted',
      updated: 'Name updated',
      maxCompare: 'Maximum 3 analyses can be compared',
      minCompare: 'Select at least 2 analyses to compare',
      topRecommendation: 'Top Recommendation',
      budget: 'Budget',
      selected: 'Selected for comparison'
    },
    comparison: {
      title: 'Analysis Comparison',
      subtitle: 'Compare {count} project analyses side by side',
      analysis: 'Analysis',
      criteria: 'Criteria',
      projectType: 'Project Type',
      budgetMonth: 'Budget/Month',
      monthlyVisitors: 'Monthly Visitors',
      topRecommendation: '🏆 Top Recommendation',
      costRange: 'Cost Range',
      complexity: 'Complexity',
      simple: 'Simple',
      medium: 'Medium',
      complex: 'Complex',
      dataProtection: 'Data Protection',
      serverLocation: 'Server Location',
      growth: 'Growth Potential',
      detailedRecs: 'Detailed Recommendations'
    }
  }
};
