import { WizardStep3 } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Zap, Shield, Gauge } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step3Props {
  data: WizardStep3;
  onChange: (data: WizardStep3) => void;
}

const visitorRanges = [
  { value: "< 5.000", label: "Unter 5.000", icon: Users },
  { value: "5.000-50.000", label: "5.000 - 50.000", icon: Users },
  { value: "> 50.000", label: "Über 50.000", icon: Users },
  { value: "Unbekannt", label: "Unbekannt", icon: Users }
];

const trafficSources = [
  "SEO",
  "Paid Ads (Google, Meta)",
  "Social Media",
  "E-Mail-Kampagnen",
  "Intern / Direktzugriffe"
];

const downtimeOptions = [
  { value: "Egal", label: "Egal (Test, internes Tool)", severity: "low" },
  { value: "Verkraftbar", label: "Kurze Ausfälle verkraftbar", severity: "medium" },
  { value: "Kritisch", label: "Kritisch während Kampagnen", severity: "high" },
  { value: "24/7", label: "Geschäftskritisch (24/7)", severity: "critical" }
];

const performanceOptions = [
  { value: "Basis", label: "Basis", desc: "Seite darf sich 'normal' anfühlen" },
  { value: "Schnell", label: "Schnell", desc: "Marketing, SEO wichtig" },
  { value: "Sehr schnell", label: "Sehr schnell", desc: "Core Web Vitals, international" }
];

export const Step3 = ({ data, onChange }: Step3Props) => {
  const { t } = useLanguage();
  
  const visitorRanges = [
    { value: "< 5.000", label: t('step3.visitors.low'), icon: Users },
    { value: "5.000-50.000", label: t('step3.visitors.medium'), icon: Users },
    { value: "> 50.000", label: t('step3.visitors.high'), icon: Users },
    { value: "Unbekannt", label: t('step3.visitors.unknown'), icon: Users }
  ];

  const trafficSources = [
    { key: 'seo', label: t('step3.traffic.seo') },
    { key: 'ads', label: t('step3.traffic.ads') },
    { key: 'social', label: t('step3.traffic.social') },
    { key: 'email', label: t('step3.traffic.email') },
    { key: 'internal', label: t('step3.traffic.internal') }
  ];

  const downtimeOptions = [
    { value: "Egal", label: t('step3.downtime.none'), severity: "low" },
    { value: "Verkraftbar", label: t('step3.downtime.acceptable'), severity: "medium" },
    { value: "Kritisch", label: t('step3.downtime.critical'), severity: "high" },
    { value: "24/7", label: t('step3.downtime.always'), severity: "critical" }
  ];

  const performanceOptions = [
    { value: "Basis", label: t('step3.performanceOptions.basic'), desc: t('step3.performanceOptions.basicDesc') },
    { value: "Schnell", label: t('step3.performanceOptions.fast'), desc: t('step3.performanceOptions.fastDesc') },
    { value: "Sehr schnell", label: t('step3.performanceOptions.veryFast'), desc: t('step3.performanceOptions.veryFastDesc') }
  ];

  const handleTrafficSourceToggle = (source: string) => {
    const newSources = data.trafficSources.includes(source)
      ? data.trafficSources.filter(s => s !== source)
      : [...data.trafficSources, source];
    onChange({ ...data, trafficSources: newSources });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('step3.title')}</h2>
        <p className="text-muted-foreground">{t('step3.description')}</p>
      </div>

      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {t('step3.monthlyVisitors')}
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {visitorRanges.map((range) => (
              <div
                key={range.value}
                className={`
                  p-4 rounded-lg border text-center cursor-pointer transition-all
                  ${data.monthlyVisitors === range.value
                    ? 'border-primary bg-primary/10 text-primary shadow-glow-cyan'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => onChange({ ...data, monthlyVisitors: range.value })}
              >
                <span className="text-sm font-medium">{range.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            {t('step3.trafficSources')}
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {trafficSources.map((source) => (
              <div
                key={source.key}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.trafficSources.includes(source.key)
                    ? 'border-accent bg-accent/10 shadow-glow-gold'
                    : 'border-border hover:border-accent/50 bg-card/30'
                  }
                `}
                onClick={() => handleTrafficSourceToggle(source.key)}
              >
                <Checkbox
                  checked={data.trafficSources.includes(source.key)}
                  onCheckedChange={() => handleTrafficSourceToggle(source.key)}
                />
                <span className="text-sm">{source.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {t('step3.downtimeTolerance')}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {downtimeOptions.map((option) => {
              const severityColors = {
                low: 'border-muted',
                medium: 'border-accent',
                high: 'border-primary',
                critical: 'border-destructive'
              };
              
              return (
                <div
                  key={option.value}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${data.downtimeTolerance === option.value
                      ? `${severityColors[option.severity as keyof typeof severityColors]} bg-primary/10 shadow-glow-cyan`
                      : 'border-border hover:border-primary/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, downtimeTolerance: option.value })}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Gauge className="w-5 h-5 text-accent" />
            {t('step3.performance')}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {performanceOptions.map((option) => (
              <div
                key={option.value}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.performanceNeed === option.value
                    ? 'border-accent bg-accent/10 text-accent shadow-glow-gold'
                    : 'border-border hover:border-accent/50 bg-card/30'
                  }
                `}
                onClick={() => onChange({ ...data, performanceNeed: option.value })}
              >
                <div className="font-medium text-base mb-1">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
