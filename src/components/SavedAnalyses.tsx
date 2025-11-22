import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SavedAnalysis } from "@/types/wizard";
import { StorageService } from "@/lib/storageService";
import { Clock, Trash2, Edit2, Check, X, GitCompare } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface SavedAnalysesProps {
  onCompare: (analyses: SavedAnalysis[]) => void;
  onSelect?: (analysis: SavedAnalysis) => void;
}

export const SavedAnalyses = ({ onCompare, onSelect }: SavedAnalysesProps) => {
  const { t, language } = useLanguage();
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = () => {
    const stored = StorageService.getAllAnalyses();
    setAnalyses(stored);
  };

  const handleDelete = (id: string) => {
    StorageService.deleteAnalysis(id);
    loadAnalyses();
    toast.success(t('saved.deleted'));
  };

  const handleStartEdit = (analysis: SavedAnalysis) => {
    setEditingId(analysis.id);
    setEditName(analysis.name || "");
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) {
      StorageService.updateAnalysisName(id, editName.trim());
      loadAnalyses();
      toast.success(t('saved.updated'));
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const toggleSelectForCompare = (id: string) => {
    const newSelected = new Set(selectedForCompare);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (newSelected.size >= 3) {
        toast.error(t('saved.maxCompare'));
        return;
      }
      newSelected.add(id);
    }
    setSelectedForCompare(newSelected);
  };

  const handleCompare = () => {
    const selected = analyses.filter(a => selectedForCompare.has(a.id));
    if (selected.length < 2) {
      toast.error(t('saved.minCompare'));
      return;
    }
    onCompare(selected);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(language === 'de' ? 'de-DE' : 'en-US', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (analyses.length === 0) {
    return (
      <Card className="p-8 text-center bg-card/50 border-border/50 backdrop-blur-sm">
        <p className="text-muted-foreground mb-4">{t('saved.empty')}</p>
        <p className="text-sm text-muted-foreground">
          {t('saved.emptyDesc')}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t('saved.title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('saved.compareInfo').replace('{total}', '10').replace(analyses.length.toString(), analyses.length.toString())}
          </p>
        </div>
        
        {selectedForCompare.size >= 2 && (
          <Button
            onClick={handleCompare}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-cyan"
          >
            <GitCompare className="w-4 h-4 mr-2" />
            {t('saved.compare').replace('{count}', selectedForCompare.size.toString())}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analyses.map((analysis) => {
          const isSelected = selectedForCompare.has(analysis.id);
          const isEditing = editingId === analysis.id;
          const topRec = analysis.result.recommendations[0];

          return (
            <Card
              key={analysis.id}
              className={`p-4 bg-card/50 border-2 backdrop-blur-sm transition-all cursor-pointer ${
                isSelected 
                  ? 'border-primary shadow-glow-cyan' 
                  : 'border-border/50 hover:border-border'
              }`}
              onClick={() => !isEditing && toggleSelectForCompare(analysis.id)}
            >
              <div className="space-y-3">
                {/* Header with Name */}
                <div className="flex items-start justify-between gap-2">
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8 text-sm"
                        placeholder="Analyse-Name"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleSaveEdit(analysis.id)}
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={handleCancelEdit}
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-foreground flex-1">
                        {analysis.name || StorageService.generateAnalysisName(analysis.projectData)}
                      </h3>
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleStartEdit(analysis)}
                        >
                          <Edit2 className="w-3 h-3 text-muted-foreground" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDelete(analysis.id)}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDate(analysis.timestamp)}
                </div>

                {/* Top Recommendation */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary">
                      {t('saved.topRecommendation')}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium text-foreground">{topRec.categoryName}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {topRec.providers.slice(0, 2).join(", ")}
                  </div>
                </div>

                {/* Project Info */}
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {analysis.projectData.step1.projectType.join(", ")} • 
                  {t('saved.budget')}: {analysis.projectData.step4.hostingBudget}€
                </div>

                {isSelected && (
                  <Badge className="w-full justify-center bg-primary/20 text-primary border-primary">
                    {t('saved.selected')}
                  </Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
