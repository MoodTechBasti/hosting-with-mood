export interface WizardStep1 {
  projectType: string[];
  targetAudience: string;
  mainGoal: string;
  paymentModel: string;
}

export interface WizardStep2 {
  techType: string[];
  techStackDetails?: string;
  dataProcessing: string;
  database: string;
}

export interface WizardStep3 {
  monthlyVisitors: string;
  trafficSources: string[];
  downtimeTolerance: string;
  performanceNeed: string;
}

export interface WizardStep4 {
  hostingBudget: string;
  contractOwner: string;
  maintenanceResponsibility: string;
  clientTechAffinity: number;
}

export interface WizardStep5 {
  dataProtectionLevel: string;
  serverLocationPreference: string;
  growthPotential: string;
  projectLifetime: string;
}

export interface ProjectData {
  step1: WizardStep1;
  step2: WizardStep2;
  step3: WizardStep3;
  step4: WizardStep4;
  step5: WizardStep5;
}

export interface HostingRecommendation {
  categoryId: string;
  categoryName: string;
  providers: string[];
  explanation: string;
  useCases: string[];
  costRange: string;
  complexity: "niedrig" | "mittel" | "hoch";
  risks: string[];
  technicalImplementation: string;
}

export interface DecisionResult {
  recommendations: HostingRecommendation[];
  rejectedCategories: {
    categoryId: string;
    categoryName: string;
    reason: string;
    whenUseful: string;
  }[];
  projectSummary: string;
}
