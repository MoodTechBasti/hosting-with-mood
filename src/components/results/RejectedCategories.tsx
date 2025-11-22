import { Card } from "@/components/ui/card";
import { XCircle, Info } from "lucide-react";

interface RejectedCategory {
  categoryId: string;
  categoryName: string;
  reason: string;
  whenUseful: string;
}

interface RejectedCategoriesProps {
  categories: RejectedCategory[];
}

export const RejectedCategories = ({ categories }: RejectedCategoriesProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <XCircle className="w-5 h-5 text-destructive" />
        <h3 className="text-xl font-bold text-foreground">
          Nicht empfohlene Kategorien
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <Card key={category.categoryId} className="p-4 bg-card/30 border-border/50 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">
                    {category.categoryName}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    ({category.categoryId})
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  <strong className="text-destructive">Grund:</strong> {category.reason}
                </p>

                <div className="flex items-start gap-2 p-2 rounded bg-muted/20 border border-border/50">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Wann sinnvoll:</strong> {category.whenUseful}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
