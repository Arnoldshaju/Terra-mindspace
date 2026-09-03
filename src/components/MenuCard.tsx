import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { inr, useCart } from "@/lib/cart";
import type { MenuItem } from "@/lib/menu-data";

export function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <article className="group relative flex flex-col justify-between gap-4 rounded-lg border border-border/70 bg-card/60 transition-colors hover:border-primary/50">
      {item.image && (
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={600}
            height={360}
            className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg leading-tight">{item.name}</h3>
              {item.malayalam && (
                <p className="mt-1 text-xs text-muted-foreground">{item.malayalam}</p>
              )}
            </div>
            <span
              className={`mt-1 size-3 shrink-0 rounded-sm border ${
                item.veg ? "border-leaf bg-leaf/40" : "border-spice bg-spice/40"
              }`}
              aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-primary">{inr(item.price)}</span>
          <Button
            size="sm"
            variant={added ? "leaf" : "gold"}
            onClick={() => {
              add(item);
              setAdded(true);
            }}
          >
            {added ? <Check /> : <Plus />}
            {added ? "Added" : "Add"}
          </Button>
        </div>
      </div>
      {item.signature && (
        <span className="absolute -top-2.5 left-5 rounded-full bg-gradient-ember px-2.5 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] text-primary-foreground uppercase">
          Signature
        </span>
      )}
    </article>
  );
}
