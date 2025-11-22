import { useState } from "react";
import { Hero } from "@/components/Hero";
import { WizardProgress } from "@/components/WizardProgress";
import { ResultsPage } from "@/components/ResultsPage";
import { SavedAnalyses } from "@/components/SavedAnalyses";
import { ComparisonPage } from "@/components/ComparisonPage";
import { Step1 } from "@/components/wizard/Step1";
import { Step2 } from "@/components/wizard/Step2";
import { Step3 } from "@/components/wizard/Step3";
import { Step4 } from "@/components/wizard/Step4";
import { Step5 } from "@/components/wizard/Step5";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, History } from "lucide-react";
import { ProjectData, DecisionResult, SavedAnalysis } from "@/types/wizard";
import { calculateRecommendations } from "@/lib/scoringEngine";
import { StorageService } from "@/lib/storageService";
import { researchProviderPrices } from "@/lib/priceResearch";
import { toast } from "sonner";

const Index = () => {
  const [view, setView] = useState<"hero" | "wizard" | "results" | "saved" | "comparison">("hero");
  const [currentStep, setCurrentStep] = useState(1);
  const [result, setResult] = useState<DecisionResult | null>(null);
  const [comparisonAnalyses, setComparisonAnalyses] = useState<SavedAnalysis[]>([]);
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

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Generate recommendations
      toast.info("Generiere Empfehlungen...");
      const recommendations = calculateRecommendations(projectData);
      
      // Research current prices with real web search (set to false for mock data)
      toast.info("🔍 Recherchiere aktuelle Preise online...");
      try {
        // useRealSearch = false für Mock-Daten, true für echte Web-Suche
        const priceResearch = await researchProviderPrices(recommendations.recommendations, false);
        recommendations.researchedPrices = priceResearch;
        toast.success(`✅ ${priceResearch.length} Anbieter-Preise recherchiert`);
      } catch (error) {
        console.error("Preis-Recherche fehlgeschlagen:", error);
        toast.error("Preis-Recherche fehlgeschlagen, fahre mit gespeicherten Daten fort");
      }
      
      setResult(recommendations);
      
      // Save analysis
      const analysis: SavedAnalysis = {
        id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        projectData,
        result: recommendations,
        name: StorageService.generateAnalysisName(projectData)
      };
      StorageService.saveAnalysis(analysis);
      toast.success("Analyse gespeichert");
      
      setView("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    setView("hero");
    setCurrentStep(1);
    setResult(null);
    setProjectData({
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
  };

  const handleCompare = (analyses: SavedAnalysis[]) => {
    setComparisonAnalyses(analyses);
    setView("comparison");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      case 2:
        return projectData.step2.techType.length > 0 &&
               projectData.step2.dataProcessing &&
               projectData.step2.database;
      case 3:
        return projectData.step3.monthlyVisitors &&
               projectData.step3.trafficSources.length > 0 &&
               projectData.step3.downtimeTolerance &&
               projectData.step3.performanceNeed;
      case 4:
        return projectData.step4.hostingBudget &&
               projectData.step4.contractOwner &&
               projectData.step4.maintenanceResponsibility;
      case 5:
        return projectData.step5.dataProtectionLevel &&
               projectData.step5.serverLocationPreference &&
               projectData.step5.growthPotential &&
               projectData.step5.projectLifetime;
      default:
        return true;
    }
  };

  if (view === "hero") {
    return (
      <Hero 
        onStartWizard={() => setView("wizard")} 
        onViewSaved={() => setView("saved")}
      />
    );
  }

  if (view === "results" && result) {
    return <ResultsPage result={result} onRestart={handleRestart} />;
  }

  if (view === "saved") {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setView("hero")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Button>
          <SavedAnalyses onCompare={handleCompare} />
        </div>
      </div>
    );
  }

  if (view === "comparison") {
    return (
      <ComparisonPage
        analyses={comparisonAnalyses}
        onBack={() => setView("saved")}
      />
    );
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
            <Step2
              data={projectData.step2}
              onChange={(step2) => setProjectData({ ...projectData, step2 })}
            />
          )}
          {currentStep === 3 && (
            <Step3
              data={projectData.step3}
              onChange={(step3) => setProjectData({ ...projectData, step3 })}
            />
          )}
          {currentStep === 4 && (
            <Step4
              data={projectData.step4}
              onChange={(step4) => setProjectData({ ...projectData, step4 })}
            />
          )}
          {currentStep === 5 && (
            <Step5
              data={projectData.step5}
              onChange={(step5) => setProjectData({ ...projectData, step5 })}
            />
          )}
        </div>

        <div className="flex justify-between items-center mt-12">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-border hover:bg-card/50"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Zurück
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setView("saved")}
              className="border-border hover:bg-card/50"
            >
              <History className="mr-2 w-4 h-4" />
              Gespeicherte Analysen
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Schritt {currentStep} von {totalSteps}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-cyan"
          >
            {currentStep === totalSteps ? "Empfehlungen anzeigen" : "Weiter"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
