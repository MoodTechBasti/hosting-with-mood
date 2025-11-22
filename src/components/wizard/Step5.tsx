import { WizardStep5 } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, MapPin, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step5Props {
  data: WizardStep5;
  onChange: (data: WizardStep5) => void;
}

const dataProtectionLevels = [
  { value: "Standard", label: "Standard", desc: "Kontaktformular, Newsletter" },
  { value: "Sensibel", label: "Sensible Daten", desc: "Gesundheit, Finanzen" },
  { value: "Branche", label: "Branchenvorgaben", desc: "Versicherung, Medizin, Finanz" },
  { value: "Unklar", label: "Unklar", desc: "Beratung erforderlich" }
];

const serverLocations = [
  { value: "DE", label: "Deutschland bevorzugt", flag: "🇩🇪" },
  { value: "EU", label: "EU/EEA ausreichend", flag: "🇪🇺" },
  { value: "Global", label: "Weltweit (DSGVO-konform)", flag: "🌍" },
  { value: "Egal", label: "Egal", flag: "🤷" }
];

const growthPotentials = [
  { value: "Klein", label: "Klein", desc: "Lokale Präsenz" },
  { value: "Mittel", label: "Mittel", desc: "Regionale Kampagnen" },
  { value: "Hoch", label: "Hoch", desc: "Starkes Wachstum geplant" },
  { value: "Unbekannt", label: "Unbekannt", desc: "Schwer einzuschätzen" }
];

const projectLifetimes = [
  { value: "< 6 Monate", label: "< 6 Monate", icon: "⚡" },
  { value: "6-24 Monate", label: "6-24 Monate", icon: "📅" },
  { value: "> 24 Monate", label: "> 24 Monate", icon: "🏗️" },
  { value: "Unklar", label: "Unklar", icon: "❓" }
];

export const Step5 = ({ data, onChange }: Step5Props) => {
  const { t } = useLanguage();
  
  const dataProtectionLevels = [
    { value: "Standard", label: t('step5.protection.standard'), desc: t('step5.protection.standardDesc') },
    { value: "Sensibel", label: t('step5.protection.sensitive'), desc: t('step5.protection.sensitiveDesc') },
    { value: "Branche", label: t('step5.protection.industry'), desc: t('step5.protection.industryDesc') },
    { value: "Unklar", label: t('step5.protection.unclear'), desc: t('step5.protection.unclearDesc') }
  ];

  const serverLocations = [
    { value: "DE", label: t('step5.location.de'), flag: "🇩🇪" },
    { value: "EU", label: t('step5.location.eu'), flag: "🇪🇺" },
    { value: "Global", label: t('step5.location.global'), flag: "🌍" },
    { value: "Egal", label: t('step5.location.any'), flag: "🤷" }
  ];

  const growthPotentials = [
    { value: "Klein", label: t('step5.growthOptions.small'), desc: t('step5.growthOptions.smallDesc') },
    { value: "Mittel", label: t('step5.growthOptions.medium'), desc: t('step5.growthOptions.mediumDesc') },
    { value: "Hoch", label: t('step5.growthOptions.high'), desc: t('step5.growthOptions.highDesc') },
    { value: "Unbekannt", label: t('step5.growthOptions.unknown'), desc: t('step5.growthOptions.unknownDesc') }
  ];

  const projectLifetimes = [
    { value: "< 6 Monate", label: t('step5.lifetimeOptions.short'), icon: "⚡" },
    { value: "6-24 Monate", label: t('step5.lifetimeOptions.medium'), icon: "📅" },
    { value: "> 24 Monate", label: t('step5.lifetimeOptions.long'), icon: "🏗️" },
    { value: "Unklar", label: t('step5.lifetimeOptions.unclear'), icon: "❓" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('step5.title')}</h2>
        <p className="text-muted-foreground">{t('step5.description')}</p>
      </div>

      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            {t('step5.dataProtection')}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataProtectionLevels.map((level) => (
              <div
                key={level.value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.dataProtectionLevel === level.value
                    ? 'border-primary bg-primary/10 shadow-glow-cyan'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => onChange({ ...data, dataProtectionLevel: level.value })}
              >
                <div className="font-medium text-base mb-1">{level.label}</div>
                <div className="text-xs text-muted-foreground">{level.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            {t('step5.serverLocation')}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serverLocations.map((location) => (
              <div
                key={location.value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3
                  ${data.serverLocationPreference === location.value
                    ? 'border-accent bg-accent/10 text-accent shadow-glow-gold'
                    : 'border-border hover:border-accent/50 bg-card/30'
                  }
                `}
                onClick={() => onChange({ ...data, serverLocationPreference: location.value })}
              >
                <span className="text-2xl">{location.flag}</span>
                <span className="text-sm font-medium">{location.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {t('step5.growth')}
            </Label>
            <div className="space-y-2">
              {growthPotentials.map((potential) => (
                <div
                  key={potential.value}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.growthPotential === potential.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, growthPotential: potential.value })}
                >
                  <div className="text-sm font-medium">{potential.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{potential.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              {t('step5.lifetime')}
            </Label>
            <div className="space-y-2">
              {projectLifetimes.map((lifetime) => (
                <div
                  key={lifetime.value}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3
                    ${data.projectLifetime === lifetime.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-accent/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, projectLifetime: lifetime.value })}
                >
                  <span className="text-xl">{lifetime.icon}</span>
                  <span className="text-sm font-medium">{lifetime.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
