import { WizardStep4 } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign, UserCog, Wrench, Brain } from "lucide-react";

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
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Budget & Verantwortung</h2>
        <p className="text-muted-foreground">Finanzielle und organisatorische Rahmenbedingungen</p>
      </div>

      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Hosting-Budget (monatlich)
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
              Vertragsbesitzer
            </Label>
            <div className="space-y-2">
              {contractOwners.map((owner) => (
                <div
                  key={owner}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.contractOwner === owner
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-accent/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, contractOwner: owner })}
                >
                  <span className="text-sm">{owner}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Wartungsverantwortung
            </Label>
            <div className="space-y-2">
              {maintenanceOptions.map((option) => (
                <div
                  key={option}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${data.maintenanceResponsibility === option
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 bg-card/30'
                    }
                  `}
                  onClick={() => onChange({ ...data, maintenanceResponsibility: option })}
                >
                  <span className="text-sm">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent" />
            Technikaffinität Kunde
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
