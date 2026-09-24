import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Sparkles, Flame, Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { deliveryFee, FREE_DELIVERY_OVER, inr, useCart } from "@/lib/cart";
import { calculateCartNutrition } from "@/lib/ai-ingredient-guide";

export function CartSheet() {
  const { lines, open, setOpen, setQty, remove, subtotal, count } = useCart();
  const navigate = useNavigate();
  const fee = deliveryFee(subtotal, "delivery");

  const cartItems = lines.map((l) => ({ id: l.id, quantity: l.qty }));
  const nutritionSummary = calculateCartNutrition(cartItems);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 border-border bg-card sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="tracking-[0.14em] uppercase">Your order</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Nothing here yet — the puttum beefum is calling."
              : `${count} item${count > 1 ? "s" : ""} from the Chalakudy kitchen`}
          </SheetDescription>
        </SheetHeader>

        {/* AI Order Nutrition Banner */}
        {lines.length > 0 && (
          <div className="mt-3 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="size-3.5 text-amber-400" /> AI Meal Nutrition
              </span>
              <Badge variant="outline" className="border-amber-400/40 text-amber-300 text-[0.65rem]">
                {nutritionSummary.healthGrade}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-[0.7rem] font-mono text-slate-300 pt-0.5">
              <span className="flex items-center gap-1">
                <Flame className="size-3 text-amber-400" /> {nutritionSummary.totalCalories} kcal
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="size-3 text-blue-400" /> {nutritionSummary.totalProtein}g protein
              </span>
              <span>{nutritionSummary.totalCarbs}g carbs</span>
              <span>{nutritionSummary.totalFat}g fat</span>
            </div>
          </div>
        )}

        <div className="-mx-6 flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <ShoppingBag className="size-10 text-muted-foreground" />
              <Button
                variant="hero"
                onClick={() => {
                  setOpen(false);
                  void navigate({ to: "/menu" });
                }}
              >
                Browse the menu
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-start justify-between gap-3 border-b border-border/60 pb-4"
                >
                  <div>
                    <p className="text-sm font-medium">{line.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{inr(line.price)} each</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="size-7"
                        onClick={() => setQty(line.id, line.qty - 1)}
                        aria-label={`Reduce ${line.name}`}
                      >
                        <Minus />
                      </Button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="size-7"
                        onClick={() => setQty(line.id, line.qty + 1)}
                        aria-label={`Add ${line.name}`}
                      >
                        <Plus />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 text-muted-foreground"
                        onClick={() => remove(line.id)}
                        aria-label={`Remove ${line.name}`}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-primary">{inr(line.price * line.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Delivery</span>
              <span>{fee === 0 ? "Free" : inr(fee)}</span>
            </div>
            {subtotal < FREE_DELIVERY_OVER && (
              <p className="text-xs text-primary">
                Add {inr(FREE_DELIVERY_OVER - subtotal)} more for free delivery.
              </p>
            )}
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={() => {
                setOpen(false);
                void navigate({ to: "/checkout" });
              }}
            >
              Checkout · {inr(subtotal + fee)}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
