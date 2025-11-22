import { WizardStep2 } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step2Props {
  data: WizardStep2;
  onChange: (data: WizardStep2) => void;
}

const techTypes = [
  "Statisches HTML/JS/CSS",
  "CMS (WordPress, Typo3, etc.)",
  "Frontend-Framework (React/Next.js, Vue/Nuxt, Svelte)",
  "Backend/API (Node, Laravel, Django, Rails)",
  "No-Code/Low-Code (Webflow, Framer, n8n)",
  "Gemischt",
  "Unklar"
];

const dataProcessingOptions = [
  "Keine personenbezogenen Daten",
  "Kontaktformular (Name, Mail, Nachricht)",
  "Benutzeraccounts/Logins",
  "Zahlungsdaten (Shop, Abo, Spenden)",
  "Gesundheits-/Finanz-/sensible Daten",
  "Unklar"
];

const databaseOptions = [
  "Keine",
  "Einfache DB (Kontaktleads, einfache User)",
  "Komplex (mehrere Services, Reporting)",
  "Unklar"
];

export const Step2 = ({ data, onChange }: Step2Props) => {
  const { t } = useLanguage();
  
  const techTypes = [
    { key: 'static', label: t('step2.types.static') },
    { key: 'cms', label: t('step2.types.cms') },
    { key: 'framework', label: t('step2.types.framework') },
    { key: 'backend', label: t('step2.types.backend') },
    { key: 'nocode', label: t('step2.types.nocode') },
    { key: 'mixed', label: t('step2.types.mixed') },
    { key: 'unclear', label: t('step2.types.unclear') }
  ];

  const dataProcessingOptions = [
    { key: 'none', label: t('step2.processing.none') },
    { key: 'contact', label: t('step2.processing.contact') },
    { key: 'accounts', label: t('step2.processing.accounts') },
    { key: 'payments', label: t('step2.processing.payments') },
    { key: 'sensitive', label: t('step2.processing.sensitive') },
    { key: 'unclear', label: t('step2.processing.unclear') }
  ];

  const databaseOptions = [
    { key: 'none', label: t('step2.database.none') },
    { key: 'simple', label: t('step2.database.simple') },
    { key: 'complex', label: t('step2.database.complex') },
    { key: 'unclear', label: t('step2.database.unclear') }
  ];

  const handleTechTypeToggle = (type: string) => {
    const newTypes = data.techType.includes(type)
      ? data.techType.filter(t => t !== type)
      : [...data.techType, type];
    onChange({ ...data, techType: newTypes });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('step2.title')}</h2>
        <p className="text-muted-foreground">{t('step2.description')}</p>
      </div>

      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-base font-medium">{t('step2.techType')}</Label>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {techTypes.map((type) => (
              <div
                key={type.key}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.techType.includes(type.key)
                    ? 'border-primary bg-primary/10 shadow-glow-cyan'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => handleTechTypeToggle(type.key)}
              >
                <Checkbox
                  checked={data.techType.includes(type.key)}
                  onCheckedChange={() => handleTechTypeToggle(type.key)}
                />
                <span className="text-sm">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">{t('step2.techStackLabel')}</Label>
          <Textarea
            placeholder={t('step2.techStackPlaceholder')}
            value={data.techStackDetails || ""}
            onChange={(e) => onChange({ ...data, techStackDetails: e.target.value })}
            className="min-h-[100px] bg-background/50 border-border resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">{t('step2.dataProcessing')}</Label>
            <div className="space-y-2">
              {dataProcessingOptions.map((option) => (
                <div
                  key={option.key}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.dataProcessing === option.key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, dataProcessing: option.key })}
                >
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">{t('step2.databaseNeed')}</Label>
            <div className="space-y-2">
              {databaseOptions.map((option) => (
                <div
                  key={option.key}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.database === option.key
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-accent/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, database: option.key })}
                >
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
