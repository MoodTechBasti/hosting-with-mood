import { SavedAnalysis } from "@/types/wizard";

const STORAGE_KEY = "hosting_analyses";
const MAX_ANALYSES = 10;

export class StorageService {
  static saveAnalysis(analysis: SavedAnalysis): void {
    const existing = this.getAllAnalyses();
    
    // Add new analysis at the beginning
    existing.unshift(analysis);
    
    // Keep only the last MAX_ANALYSES
    const limited = existing.slice(0, MAX_ANALYSES);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  }

  static getAllAnalyses(): SavedAnalysis[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      return JSON.parse(stored) as SavedAnalysis[];
    } catch (error) {
      console.error("Error loading analyses:", error);
      return [];
    }
  }

  static getAnalysisById(id: string): SavedAnalysis | null {
    const analyses = this.getAllAnalyses();
    return analyses.find(a => a.id === id) || null;
  }

  static deleteAnalysis(id: string): void {
    const analyses = this.getAllAnalyses();
    const filtered = analyses.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  static updateAnalysisName(id: string, name: string): void {
    const analyses = this.getAllAnalyses();
    const updated = analyses.map(a => 
      a.id === id ? { ...a, name } : a
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static generateAnalysisName(projectData: SavedAnalysis["projectData"]): string {
    const types = projectData.step1.projectType.slice(0, 2).join(", ");
    const date = new Date().toLocaleDateString("de-DE", { 
      day: "2-digit", 
      month: "2-digit" 
    });
    return `${types || "Projekt"} - ${date}`;
  }
}
