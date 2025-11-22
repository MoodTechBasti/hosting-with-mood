import { useState } from "react";
import { Hero } from "@/components/Hero";
import { WizardProgress } from "@/components/WizardProgress";
import { Step1 } from "@/components/wizard/Step1";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectData } from "@/types/wizard";

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [projectData, setProjectData] = useState<ProjectData>({
    step1: {
      projectType: [],
      targetAudience: "",
      mainGoal: "",
      paymentModel: "",
    },
    step2: {
      techType: [],
      dataProcessing: "",
      database: "",
    },
    step3: {
      monthlyVisitors: "",
      trafficSources: [],
      downtimeTolerance: "",
      performanceNeed: "",
    },
    step4: {
      hostingBudget: "",
      contractOwner: "",
      maintenanceResponsibility: "",
      clientTechAffinity: 2,
    },
    step5: {
      dataProtectionLevel: "",
      serverLocationPreference: "",
      growthPotential: "",
      projectLifetime: "",
    },
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return projectData.step1.projectType.length > 0 &&
               projectData.step1.targetAudience &&
               projectData.step1.mainGoal &&
               projectData.step1.paymentModel;
      default:
        return true;
    }
  };

  if (!showWizard) {
    return <Hero onStartWizard={() => setShowWizard(true)} />;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />

        <div className="animate-fade-in-up">
          {currentStep === 1 && (
            <Step1
              data={projectData.step1}
              onChange={(step1) => setProjectData({ ...projectData, step1 })}
            />
          )}
          {currentStep === 2 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Schritt 2 wird implementiert...</p>
            </div>
          )}
          {currentStep === 3 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Schritt 3 wird implementiert...</p>
            </div>
          )}
          {currentStep === 4 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Schritt 4 wird implementiert...</p>
            </div>
          )}
          {currentStep === 5 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Schritt 5 wird implementiert...</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-12">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="border-border hover:bg-card/50"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Zurück
          </Button>

          <div className="text-sm text-muted-foreground">
            Schritt {currentStep} von {totalSteps}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isStepValid() || currentStep === totalSteps}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-cyan"
          >
            Weiter
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
