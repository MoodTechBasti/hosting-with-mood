import { CategoryScore } from "@/types/wizard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { TrendingUp } from "lucide-react";

interface CategoryScoresChartProps {
  categoryScores: CategoryScore[];
}

export const CategoryScoresChart = ({ categoryScores }: CategoryScoresChartProps) => {
  // Sort by score for bar chart
  const sortedScores = [...categoryScores].sort((a, b) => b.score - a.score);

  // Colors for different score ranges
  const getScoreColor = (score: number) => {
    if (score >= 70) return "hsl(var(--primary))"; // Cyan for high scores
    if (score >= 50) return "hsl(var(--accent))"; // Gold for medium scores
    return "hsl(var(--muted-foreground))"; // Gray for low scores
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 bg-card border-border shadow-lg">
          <p className="font-semibold text-foreground text-sm mb-1">
            {payload[0].payload.categoryName}
          </p>
          <p className="text-sm text-muted-foreground">
            Score: <span className="font-semibold text-foreground">{payload[0].value}/100</span>
          </p>
        </Card>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Kategorie-Scores im Detail</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Diese Visualisierung zeigt, wie gut jede Hosting-Kategorie zu Ihren Anforderungen passt.
        Höhere Scores (näher an 100) bedeuten bessere Eignung.
      </p>

      <Tabs defaultValue="radar" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="radar">Radar-Chart</TabsTrigger>
          <TabsTrigger value="bar">Balken-Diagramm</TabsTrigger>
        </TabsList>

        <TabsContent value="radar" className="mt-0">
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart data={categoryScores}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="categoryId" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Radar 
                name="Score" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="bar" className="mt-0">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart 
              data={sortedScores}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                type="category" 
                dataKey="categoryId" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="score" 
                name="Eignung (0-100)"
                radius={[0, 8, 8, 0]}
              >
                {sortedScores.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--primary))" }} />
            <span className="text-muted-foreground">Hohe Eignung (70-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--accent))" }} />
            <span className="text-muted-foreground">Mittlere Eignung (50-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-muted-foreground">Geringe Eignung (0-49)</span>
          </div>
        </div>
      </div>

      {/* Top 3 Quick View */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Top 3 Kategorien</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sortedScores.slice(0, 3).map((score, idx) => (
            <div 
              key={score.categoryId}
              className="p-3 rounded-lg border bg-gradient-to-br from-card to-card/50"
              style={{
                borderColor: idx === 0 ? "hsl(var(--primary))" : idx === 1 ? "hsl(var(--accent))" : "hsl(var(--border))"
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">{score.categoryId}</span>
                <span className="text-lg font-bold text-foreground">{score.score}</span>
              </div>
              <div className="text-xs text-muted-foreground line-clamp-1">
                {score.categoryName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
