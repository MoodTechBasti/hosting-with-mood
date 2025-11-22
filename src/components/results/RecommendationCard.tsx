import { HostingRecommendation } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Wrench, DollarSign, TrendingUp } from "lucide-react";

interface RecommendationCardProps {
  recommendation: HostingRecommendation;
  rank: number;
}

export const RecommendationCard = ({ recommendation, rank }: RecommendationCardProps) => {
  const complexityColors = {
    niedrig: "bg-green-500/10 text-green-400 border-green-500/20",
    mittel: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    hoch: "bg-red-500/10 text-red-400 border-red-500/20"
  };

  const rankColors = {
    1: "border-primary shadow-glow-cyan",
    2: "border-accent shadow-glow-gold",
    3: "border-muted"
  };

  return (
    <Card className={`p-6 bg-card/50 backdrop-blur-sm border-2 ${rankColors[rank as keyof typeof rankColors]} transition-all hover:scale-[1.02]`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className={rank === 1 ? "bg-primary/20 text-primary border-primary" : rank === 2 ? "bg-accent/20 text-accent border-accent" : "bg-muted/20"}>
              {rank === 1 ? "🏆 Top-Empfehlung" : rank === 2 ? "🥈 Alternative" : "🥉 Option 3"}
            </Badge>
            <Badge className={complexityColors[recommendation.complexity]}>
              {recommendation.complexity === "niedrig" ? "Einfach" : recommendation.complexity === "mittel" ? "Mittel" : "Komplex"}
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {recommendation.categoryName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {recommendation.categoryId}
          </p>
        </div>
      </div>

      {/* Cost Range */}
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <DollarSign className="w-5 h-5 text-primary" />
        <div>
          <div className="text-sm text-muted-foreground">Kostenrahmen</div>
          <div className="font-semibold text-foreground">{recommendation.costRange}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Stand: ca. 2025, aktuelle Preise prüfen</div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-4">
        <p className="text-sm text-foreground leading-relaxed">
          {recommendation.explanation}
        </p>
      </div>

      {/* Providers */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Empfohlene Anbieter</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recommendation.providers.map((provider, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {provider}
            </Badge>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Ideal für</span>
        </div>
        <ul className="space-y-1.5">
          {recommendation.useCases.map((useCase, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technical Implementation */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Wrench className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Technische Umsetzung</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {recommendation.technicalImplementation}
        </p>
      </div>

      {/* Risks */}
      {recommendation.risks.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">Zu beachten</span>
          </div>
          <ul className="space-y-1.5">
            {recommendation.risks.map((risk, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">⚠</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
