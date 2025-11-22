import { DecisionResult } from "@/types/wizard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecommendationCard } from "./results/RecommendationCard";
import { RejectedCategories } from "./results/RejectedCategories";
import { Download, RotateCcw, FileText, Share2 } from "lucide-react";
import logo from "@/assets/logo-horizontal.svg";
import { toast } from "sonner";

interface ResultsPageProps {
  result: DecisionResult;
  onRestart: () => void;
}

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
  const handleExportPDF = () => {
    toast.info("PDF-Export wird in der nächsten Version verfügbar sein");
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `hosting-empfehlung-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Empfehlungen als JSON exportiert");
  };

  const handleShare = () => {
    const summary = `Hosting-Empfehlung: ${result.recommendations[0].categoryName} - ${result.projectSummary}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Meine Hosting-Empfehlung',
        text: summary
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(summary);
      toast.success("Zusammenfassung in Zwischenablage kopiert");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <img src={logo} alt="MoodTech Solutions" className="h-12 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Ihre Hosting-Empfehlungen
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Basierend auf Ihren Angaben haben wir die optimalen Hosting-Lösungen für Ihr Projekt identifiziert
          </p>
        </div>

        {/* Project Summary */}
        <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in-up delay-100">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Projekt-Zusammenfassung</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.projectSummary}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center animate-fade-in-up delay-200">
          <Button
            onClick={handleExportPDF}
            variant="outline"
            className="border-border hover:bg-card/50"
          >
            <Download className="w-4 h-4 mr-2" />
            Als PDF exportieren
          </Button>
          <Button
            onClick={handleExportJSON}
            variant="outline"
            className="border-border hover:bg-card/50"
          >
            <FileText className="w-4 h-4 mr-2" />
            Als JSON exportieren
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="border-border hover:bg-card/50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Teilen
          </Button>
          <Button
            onClick={onRestart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Neue Analyse starten
          </Button>
        </div>

        {/* Recommendations */}
        <div className="space-y-6 animate-fade-in-up delay-300">
          <h2 className="text-2xl font-bold text-foreground text-center">
            Top 3 Empfehlungen
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {result.recommendations.map((rec, idx) => (
              <RecommendationCard
                key={rec.categoryId}
                recommendation={rec}
                rank={idx + 1}
              />
            ))}
          </div>
        </div>

        {/* Rejected Categories */}
        <div className="animate-fade-in-up delay-400">
          <RejectedCategories categories={result.rejectedCategories} />
        </div>

        {/* Footer Note */}
        <Card className="p-6 bg-card/30 border-border/50 backdrop-blur-sm text-center animate-fade-in-up delay-500">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Wichtiger Hinweis:</strong> Diese Empfehlungen basieren auf
            Ihren Angaben und allgemeinen Best Practices. Kosten und Verfügbarkeit können variieren.
            Prüfen Sie vor der Entscheidung die aktuellen Anbieter-Websites und kontaktieren Sie uns
            bei Fragen.
          </p>
        </Card>
      </div>
    </div>
  );
};
