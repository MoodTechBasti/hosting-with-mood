import { WizardStep1 } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step1Props {
  data: WizardStep1;
  onChange: (data: WizardStep1) => void;
}

const projectTypes = [
  "Landingpage",
  "Firmenwebsite",
  "Blog/Magazin",
  "Web-App / SaaS",
  "Automation / Backend-only",
  "Migration/Redesign"
];

const targets = ["Eigennutzung", "Bestandskunde", "Neukunde", "Internes Testprojekt"];
const goals = ["Leadgenerierung", "Online-Präsenz / Branding", "Information / Content", "Automatisierung", "Unklar"];
const paymentModels = ["Pauschale", "Monatlich (Retainer)", "Performance-basiert", "Eigenprojekt"];

export const Step1 = ({ data, onChange }: Step1Props) => {
  const { t, language } = useLanguage();
  
  const projectTypes = [
    { key: 'landingpage', label: t('step1.types.landingpage') },
    { key: 'company', label: t('step1.types.company') },
    { key: 'blog', label: t('step1.types.blog') },
    { key: 'webapp', label: t('step1.types.webapp') },
    { key: 'automation', label: t('step1.types.automation') },
    { key: 'migration', label: t('step1.types.migration') }
  ];

  const targets = [
    { key: 'own', label: t('step1.targets.own') },
    { key: 'existing', label: t('step1.targets.existing') },
    { key: 'new', label: t('step1.targets.new') },
    { key: 'internal', label: t('step1.targets.internal') }
  ];

  const goals = [
    { key: 'leads', label: t('step1.goals.leads') },
    { key: 'branding', label: t('step1.goals.branding') },
    { key: 'content', label: t('step1.goals.content') },
    { key: 'automation', label: t('step1.goals.automation') },
    { key: 'unclear', label: t('step1.goals.unclear') }
  ];

  const paymentModels = [
    { key: 'fixed', label: t('step1.payment.fixed') },
    { key: 'monthly', label: t('step1.payment.monthly') },
    { key: 'performance', label: t('step1.payment.performance') },
    { key: 'own', label: t('step1.payment.own') }
  ];

  const handleProjectTypeToggle = (type: string) => {
    const newTypes = data.projectType.includes(type)
      ? data.projectType.filter(t => t !== type)
      : [...data.projectType, type];
    onChange({ ...data, projectType: newTypes });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('step1.title')}</h2>
        <p className="text-muted-foreground">{t('step1.description')}</p>
      </div>

      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">{t('step1.projectType')}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <div
                key={type.key}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.projectType.includes(type.key)
                    ? 'border-primary bg-primary/10 shadow-glow-cyan'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => handleProjectTypeToggle(type.key)}
              >
                <Checkbox
                  checked={data.projectType.includes(type.key)}
                  onCheckedChange={() => handleProjectTypeToggle(type.key)}
                />
                <span className="text-sm">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">{t('step1.targetAudience')}</Label>
            <div className="space-y-2">
              {targets.map((target) => (
                <div
                  key={target.key}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.targetAudience === target.key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, targetAudience: target.key })}
                >
                  <span className="text-sm">{target.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">{t('step1.mainGoal')}</Label>
            <div className="space-y-2">
              {goals.map((goal) => (
                <div
                  key={goal.key}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.mainGoal === goal.key
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-accent/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, mainGoal: goal.key })}
                >
                  <span className="text-sm">{goal.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">{t('step1.paymentModel')}</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {paymentModels.map((model) => (
              <div
                key={model.key}
                className={`
                  p-4 rounded-lg border text-center cursor-pointer transition-all
                  ${data.paymentModel === model.key
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => onChange({ ...data, paymentModel: model.key })}
              >
                <span className="text-sm">{model.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
