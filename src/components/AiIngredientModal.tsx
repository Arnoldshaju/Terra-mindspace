import { Sparkles, Flame, Dumbbell, Wheat, Heart, MapPin, ShieldCheck, Leaf } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from "@/lib/menu-data";
import { getAiDishInsight } from "@/lib/ai-ingredient-guide";

interface AiIngredientModalProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AiIngredientModal({ item, open, onOpenChange }: AiIngredientModalProps) {
  if (!item) return null;

  const insight = getAiDishInsight(item.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border/80 text-foreground p-6 sm:p-8">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-gradient-ember text-primary-foreground font-bold px-2.5 py-0.5 text-xs flex items-center gap-1"
              >
                <Sparkles className="size-3.5" /> AI Culinary Guide
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {insight.calories} kcal / serving
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {insight.healthTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/40 text-primary text-[0.65rem] uppercase tracking-wider"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <DialogTitle className="font-display text-2xl md:text-3xl text-foreground">
            {item.name}
          </DialogTitle>
          {item.malayalam && (
            <p className="text-xs text-muted-foreground font-medium">{item.malayalam}</p>
          )}
          <DialogDescription className="text-xs text-muted-foreground">
            Authentic Kerala spice origin, ingredient heritage, and estimated nutritional breakdown.
          </DialogDescription>
        </DialogHeader>

        {/* Macro Nutrition Grid */}
        <div className="mt-4 p-4 rounded-xl border border-border/60 bg-background/60 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Flame className="size-4 text-amber-500" /> Nutritional Breakdown
            </span>
            <span className="text-[0.7rem] text-muted-foreground">Per standard portion</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-center">
              <div className="text-[0.65rem] text-amber-400 font-semibold uppercase">Calories</div>
              <div className="font-display text-xl text-amber-300 font-bold mt-0.5">
                {insight.calories}
              </div>
              <div className="text-[0.65rem] text-amber-400/80">kcal</div>
            </div>

            <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-center">
              <div className="text-[0.65rem] text-blue-400 font-semibold uppercase flex items-center justify-center gap-1">
                <Dumbbell className="size-3" /> Protein
              </div>
              <div className="font-display text-xl text-blue-300 font-bold mt-0.5">
                {insight.protein}g
              </div>
              <div className="text-[0.65rem] text-blue-400/80">Muscle build</div>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-center">
              <div className="text-[0.65rem] text-emerald-400 font-semibold uppercase flex items-center justify-center gap-1">
                <Wheat className="size-3" /> Carbs
              </div>
              <div className="font-display text-xl text-emerald-300 font-bold mt-0.5">
                {insight.carbs}g
              </div>
              <div className="text-[0.65rem] text-emerald-400/80">Sustained energy</div>
            </div>

            <div className="p-3 rounded-lg border border-purple-500/30 bg-purple-500/10 text-center">
              <div className="text-[0.65rem] text-purple-400 font-semibold uppercase flex items-center justify-center gap-1">
                <Heart className="size-3" /> Healthy Fat
              </div>
              <div className="font-display text-xl text-purple-300 font-bold mt-0.5">
                {insight.fat}g
              </div>
              <div className="text-[0.65rem] text-purple-400/80">MCT & coconut</div>
            </div>

            <div className="p-3 rounded-lg border border-orange-500/30 bg-orange-500/10 text-center col-span-2 sm:col-span-1">
              <div className="text-[0.65rem] text-orange-400 font-semibold uppercase flex items-center justify-center gap-1">
                <Leaf className="size-3" /> Fiber
              </div>
              <div className="font-display text-xl text-orange-300 font-bold mt-0.5">
                {insight.fiber}g
              </div>
              <div className="text-[0.65rem] text-orange-400/80">Gut support</div>
            </div>
          </div>

          {/* Macro Proportion Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[0.7rem] text-muted-foreground font-mono">
              <span>Protein ({Math.round(((insight.protein * 4) / insight.calories) * 100)}%)</span>
              <span>Carbs ({Math.round(((insight.carbs * 4) / insight.calories) * 100)}%)</span>
              <span>Fat ({Math.round(((insight.fat * 9) / insight.calories) * 100)}%)</span>
            </div>
            <Progress
              value={Math.round(((insight.protein * 4) / insight.calories) * 100)}
              className="h-2 bg-muted"
            />
          </div>
        </div>

        {/* Heritage & Spice Lore */}
        <div className="space-y-3 mt-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-primary" /> Heritage & Spice Story
          </h3>

          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-sm leading-relaxed text-muted-foreground italic">
            "{insight.heritageStory}"
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Key Ingredients & Origins Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
            <MapPin className="size-4 text-amber-500" /> Key Ingredients & Origin
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {insight.keyIngredients.map((ing) => (
              <div
                key={ing.name}
                className="p-3 rounded-lg border border-border/50 bg-background/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    {ing.name}
                  </div>
                  <div className="text-[0.75rem] text-muted-foreground mt-0.5">{ing.benefit}</div>
                </div>

                <Badge
                  variant="outline"
                  className="border-amber-500/40 text-amber-400 text-[0.65rem] shrink-0 w-fit"
                >
                  📍 {ing.origin}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
