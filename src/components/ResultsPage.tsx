import { DecisionResult } from "@/types/wizard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecommendationCard } from "./results/RecommendationCard";
import { RejectedCategories } from "./results/RejectedCategories";
import { CategoryScoresChart } from "./results/CategoryScoresChart";
import { Download, RotateCcw, FileText, Share2 } from "lucide-react";
import logo from "@/assets/logo-horizontal.svg";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

interface ResultsPageProps {
  result: DecisionResult;
  onRestart: () => void;
}

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
  const { t, language } = useLanguage();
  
  const handleExportPDF = () => {
    toast.info(t('results.pdfInfo'));
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `hosting-empfehlung-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success(t('results.jsonExported'));
  };

  const handleShare = () => {
    const summary = `${t('results.topRecommendations')}: ${result.recommendations[0].categoryName} - ${result.projectSummary}`;
    
    if (navigator.share) {
      navigator.share({
        title: t('results.title'),
        text: summary
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(summary);
      toast.success(t('results.copied'));
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <LanguageToggle />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <img src={logo} alt="MoodTech Solutions" className="h-12 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t('results.title')}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('results.subtitle')}
          </p>
        </div>

        {/* Project Summary */}
        <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in-up delay-100">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">{t('results.projectSummary')}</h3>
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
            {t('results.exportPDF')}
          </Button>
          <Button
            onClick={handleExportJSON}
            variant="outline"
            className="border-border hover:bg-card/50"
          >
            <FileText className="w-4 h-4 mr-2" />
            {t('results.exportJSON')}
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="border-border hover:bg-card/50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {t('results.share')}
          </Button>
          <Button
            onClick={onRestart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('results.newAnalysis')}
          </Button>
        </div>

        {/* Category Scores Chart */}
        {result.categoryScores && result.categoryScores.length > 0 && (
          <div className="animate-fade-in-up delay-300">
            <CategoryScoresChart categoryScores={result.categoryScores} />
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-6 animate-fade-in-up delay-400">
          <h2 className="text-2xl font-bold text-foreground text-center">
            {t('results.topRecommendations')}
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
        <div className="animate-fade-in-up delay-500">
          <RejectedCategories categories={result.rejectedCategories} />
        </div>

        {/* Researched Prices (if available) */}
        {result.researchedPrices && result.researchedPrices.length > 0 && (
          <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in-up delay-600">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {t('results.researchedPrices')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.researchedPrices.map((price, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-muted/20 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-foreground">{price.provider}</div>
                      <div className="text-xs text-muted-foreground">{price.categoryId}</div>
                    </div>
                    <div className="text-sm text-primary font-semibold">{price.currentPrice}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {t('results.source')}: <span className="text-foreground">{price.source}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t('results.asOf')}: {new Date(price.lastChecked).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
                  </div>
                  {price.notes && (
                    <div className="text-xs text-muted-foreground mt-2 italic">
                      {price.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Footer Note */}
        <Card className="p-6 bg-card/30 border-border/50 backdrop-blur-sm text-center animate-fade-in-up delay-700">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{t('results.note')}:</strong> {t('results.noteText')}
          </p>
        </Card>
      </div>
    </div>
  );
};
