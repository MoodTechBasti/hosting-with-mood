import { WizardStep4 } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign, UserCog, Wrench, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step4Props {
  data: WizardStep4;
  onChange: (data: WizardStep4) => void;
}

const budgetRanges = [
  { value: "0-5", label: "0-5 €", color: "text-green-400" },
  { value: "5-15", label: "5-15 €", color: "text-blue-400" },
  { value: "15-50", label: "15-50 €", color: "text-yellow-400" },
  { value: ">50", label: ">50 €", color: "text-purple-400" },
  { value: "Unklar", label: "Unklar", color: "text-muted-foreground" }
];

const contractOwners = [
  "Kunde",
  "Ich (Agentur/Freelancer)",
  "Zunächst ich, später Übergabe",
  "Unklar"
];

const maintenanceOptions = [
  "Kunde selbst",
  "Ich (bezahlt)",
  "Ich (unbezahlt)",
  "Unklar"
];

const affinityLabels = [
  "Hat Angst vor Logins",
  "Kann mit Anleitung arbeiten",
  "Technisch versiert",
  "Kann DNS/Hosting verwalten"
];

export const Step4 = ({ data, onChange }: Step4Props) => {
  const { t } = useLanguage();
  
  const budgetRanges = [
    { value: "0-5", label: "0-5 €", color: "text-green-400" },
    { value: "5-15", label: "5-15 €", color: "text-blue-400" },
    { value: "15-50", label: "15-50 €", color: "text-yellow-400" },
    { value: ">50", label: ">50 €", color: "text-purple-400" },
    { value: "Unklar", label: t('step4.contract.unclear'), color: "text-muted-foreground" }
  ];

  const contractOwners = [
    { key: 'client', label: t('step4.contract.client') },
    { key: 'agency', label: t('step4.contract.agency') },
    { key: 'transfer', label: t('step4.contract.transfer') },
    { key: 'unclear', label: t('step4.contract.unclear') }
  ];

  const maintenanceOptions = [
    { key: 'client', label: t('step4.maintenanceOptions.client') },
    { key: 'paid', label: t('step4.maintenanceOptions.paid') },
    { key: 'unpaid', label: t('step4.maintenanceOptions.unpaid') },
    { key: 'unclear', label: t('step4.maintenanceOptions.unclear') }
  ];

  const affinityLabels = [
    t('step4.affinity.low'),
    t('step4.affinity.medium'),
    t('step4.affinity.high'),
    t('step4.affinity.expert')
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('step4.title')}</h2>
        <p className="text-muted-foreground">{t('step4.description')}</p>
      </div>

      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            {t('step4.hostingBudget')}
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {budgetRanges.map((range) => (
              <div
                key={range.value}
                className={`
                  p-4 rounded-lg border-2 text-center cursor-pointer transition-all
                  ${data.hostingBudget === range.value
                    ? 'border-primary bg-primary/10 shadow-glow-cyan'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => onChange({ ...data, hostingBudget: range.value })}
              >
                <div className={`text-sm font-medium ${range.color}`}>{range.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <UserCog className="w-5 h-5 text-accent" />
              {t('step4.contractOwner')}
            </Label>
            <div className="space-y-2">
              {contractOwners.map((owner) => (
                <div
                  key={owner.key}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.contractOwner === owner.key
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-accent/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, contractOwner: owner.key })}
                >
                  <span className="text-sm">{owner.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              {t('step4.maintenance')}
            </Label>
            <div className="space-y-2">
              {maintenanceOptions.map((option) => (
                <div
                  key={option.key}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.maintenanceResponsibility === option.key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, maintenanceResponsibility: option.key })}
                >
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent" />
            {t('step4.clientTech')}
          </Label>
          <div className="px-4 py-6 bg-background/50 rounded-lg border border-border">
            <Slider
              value={[data.clientTechAffinity]}
              onValueChange={(value) => onChange({ ...data, clientTechAffinity: value[0] })}
              min={1}
              max={4}
              step={1}
              className="mb-6"
            />
            <div className="grid grid-cols-4 gap-2 text-center">
              {affinityLabels.map((label, index) => (
                <div
                  key={index}
                  className={`
                    text-xs transition-all
                    ${data.clientTechAffinity === index + 1
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                    }
                  `}
                >
                  {index + 1}
                  <div className="mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
