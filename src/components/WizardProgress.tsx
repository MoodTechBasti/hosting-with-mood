import { CheckCircle2, Circle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Projekt & Ziel",
  "Technik & Daten",
  "Nutzung & Last",
  "Budget & Verantwortung",
  "Recht & Zukunft"
];

export const WizardProgress = ({ currentStep, totalSteps }: WizardProgressProps) => {
  const { t } = useLanguage();
  
  const stepLabels = [
    t('wizardProgress.steps.step1'),
    t('wizardProgress.steps.step2'),
    t('wizardProgress.steps.step3'),
    t('wizardProgress.steps.step4'),
    t('wizardProgress.steps.step5')
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out shadow-glow-cyan"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="absolute -top-1 left-0 right-0 flex justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div
                key={stepNumber}
                className="flex flex-col items-center"
                style={{ marginLeft: index === 0 ? '0' : 'auto', marginRight: index === totalSteps - 1 ? '0' : 'auto' }}
              >
                <div className={`
                  w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-primary shadow-glow-cyan' : ''}
                  ${isCurrent ? 'bg-accent shadow-glow-gold scale-110' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-muted' : ''}
                `}>
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                  {isCurrent && <Circle className="w-3 h-3 text-accent-foreground fill-current" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Labels - Mobile: Show only current, Desktop: Show all */}
      <div className="hidden md:flex justify-between text-xs text-muted-foreground px-2">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={stepNumber}
              className={`text-center transition-colors ${
                isCurrent ? 'text-primary font-medium' : ''
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Mobile: Only show current step label */}
      <div className="md:hidden text-center">
        <p className="text-sm text-muted-foreground">
          {t('wizardProgress.step')} {currentStep} {t('wizardProgress.of')} {totalSteps}
        </p>
        <p className="text-base text-primary font-medium mt-1">
          {stepLabels[currentStep - 1]}
        </p>
      </div>
    </div>
  );
};
