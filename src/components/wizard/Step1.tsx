import { WizardStep1 } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  const handleProjectTypeToggle = (type: string) => {
    const newTypes = data.projectType.includes(type)
      ? data.projectType.filter(t => t !== type)
      : [...data.projectType, type];
    onChange({ ...data, projectType: newTypes });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Projekt & Ziel</h2>
        <p className="text-muted-foreground">Erzählen Sie uns mehr über Ihr Projekt</p>
      </div>

      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">Projekttyp (Mehrfachauswahl möglich)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <div
                key={type}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${data.projectType.includes(type)
                    ? 'border-primary bg-primary/10 shadow-glow-cyan'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => handleProjectTypeToggle(type)}
              >
                <Checkbox
                  checked={data.projectType.includes(type)}
                  onCheckedChange={() => handleProjectTypeToggle(type)}
                />
                <span className="text-sm">{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Zielgruppe</Label>
            <div className="space-y-2">
              {targets.map((target) => (
                <div
                  key={target}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.targetAudience === target
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, targetAudience: target })}
                >
                  <span className="text-sm">{target}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Hauptziel</Label>
            <div className="space-y-2">
              {goals.map((goal) => (
                <div
                  key={goal}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.mainGoal === goal
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-accent/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, mainGoal: goal })}
                >
                  <span className="text-sm">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Bezahlmodell (Projekt)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {paymentModels.map((model) => (
              <div
                key={model}
                className={`
                  p-4 rounded-lg border text-center cursor-pointer transition-all
                  ${data.paymentModel === model
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 bg-card/30'
                  }
                `}
                onClick={() => onChange({ ...data, paymentModel: model })}
              >
                <span className="text-sm">{model}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
