import { SavedAnalysis } from "@/types/wizard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, DollarSign, Users, Server, TrendingUp } from "lucide-react";
import logo from "@/assets/logo-horizontal.svg";

interface ComparisonPageProps {
  analyses: SavedAnalysis[];
  onBack: () => void;
}

export const ComparisonPage = ({ analyses, onBack }: ComparisonPageProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const getComparisonMetrics = (analysis: SavedAnalysis) => {
    const { projectData, result } = analysis;
    return {
      projectTypes: projectData.step1.projectType.join(", "),
      budget: projectData.step4.hostingBudget,
      visitors: projectData.step3.monthlyVisitors,
      topRecommendation: result.recommendations[0].categoryName,
      topProvider: result.recommendations[0].providers[0],
      costRange: result.recommendations[0].costRange,
      complexity: result.recommendations[0].complexity,
      dataProtection: projectData.step5.dataProtectionLevel,
      serverLocation: projectData.step5.serverLocationPreference,
      growthPotential: projectData.step5.growthPotential
    };
  };

  const metrics = analyses.map(getComparisonMetrics);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>

          <div className="text-center">
            <img src={logo} alt="MoodTech Solutions" className="h-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Analysen-Vergleich
              </span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Vergleichen Sie {analyses.length} Projekt-Analysen nebeneinander
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up delay-100">
          {analyses.map((analysis, idx) => (
            <Card key={analysis.id} className="p-4 bg-card/50 border-border/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className={
                  idx === 0 ? "bg-primary/20 text-primary border-primary" :
                  idx === 1 ? "bg-accent/20 text-accent border-accent" :
                  "bg-muted/20"
                }>
                  Analyse {idx + 1}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {formatDate(analysis.timestamp)}
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                {analysis.name || `Projekt ${idx + 1}`}
              </h3>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="overflow-hidden bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in-up delay-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="p-4 text-left font-semibold text-foreground">Kriterium</th>
                  {analyses.map((analysis, idx) => (
                    <th key={analysis.id} className="p-4 text-left">
                      <Badge variant="outline" className={
                        idx === 0 ? "bg-primary/20 text-primary border-primary" :
                        idx === 1 ? "bg-accent/20 text-accent border-accent" :
                        "bg-muted/20"
                      }>
                        Analyse {idx + 1}
                      </Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Project Type */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Projekttyp</span>
                    </div>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4 text-sm text-muted-foreground">
                      {m.projectTypes}
                    </td>
                  ))}
                </tr>

                {/* Budget */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="font-medium text-foreground">Budget/Monat</span>
                    </div>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4 text-sm">
                      <Badge variant="secondary">{m.budget} €</Badge>
                    </td>
                  ))}
                </tr>

                {/* Visitors */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Monatliche Besucher</span>
                    </div>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4 text-sm text-muted-foreground">
                      {m.visitors}
                    </td>
                  ))}
                </tr>

                {/* Top Recommendation */}
                <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">🏆 Top-Empfehlung</span>
                    </div>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4">
                      <div className="font-semibold text-foreground text-sm mb-1">
                        {m.topRecommendation}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {m.topProvider}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Cost Range */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-foreground">Kostenrahmen</span>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4 text-sm text-muted-foreground">
                      {m.costRange.split('\n')[0]}
                    </td>
                  ))}
                </tr>

                {/* Complexity */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-foreground">Komplexität</span>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4">
                      <Badge className={
                        m.complexity === "niedrig" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        m.complexity === "mittel" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                        "bg-red-500/10 text-red-400 border-red-500/20"
                      }>
                        {m.complexity === "niedrig" ? "Einfach" : m.complexity === "mittel" ? "Mittel" : "Komplex"}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* Data Protection */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-foreground">Datenschutz</span>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4 text-sm text-muted-foreground">
                      {m.dataProtection}
                    </td>
                  ))}
                </tr>

                {/* Server Location */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-foreground">Serverstandort</span>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4 text-sm text-muted-foreground">
                      {m.serverLocation}
                    </td>
                  ))}
                </tr>

                {/* Growth Potential */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-foreground">Wachstumspotential</span>
                  </td>
                  {metrics.map((m, idx) => (
                    <td key={idx} className="p-4 text-sm text-muted-foreground">
                      {m.growthPotential}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detailed Recommendations */}
        <div className="space-y-4 animate-fade-in-up delay-300">
          <h2 className="text-2xl font-bold text-foreground">Detaillierte Empfehlungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analyses.map((analysis, idx) => (
              <Card key={analysis.id} className="p-4 bg-card/50 border-border/50 backdrop-blur-sm">
                <Badge variant="outline" className={
                  idx === 0 ? "bg-primary/20 text-primary border-primary mb-3" :
                  idx === 1 ? "bg-accent/20 text-accent border-accent mb-3" :
                  "bg-muted/20 mb-3"
                }>
                  Analyse {idx + 1}
                </Badge>
                
                <div className="space-y-3">
                  {analysis.result.recommendations.map((rec, recIdx) => (
                    <div key={recIdx} className="text-sm">
                      <div className="font-semibold text-foreground mb-1">
                        {recIdx + 1}. {rec.categoryName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {rec.providers.slice(0, 2).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
