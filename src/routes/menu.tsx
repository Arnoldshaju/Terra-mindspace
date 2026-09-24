import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, MessageSquare } from "lucide-react";

import { MenuCard } from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { inr, useCart } from "@/lib/cart";
import { CATEGORIES, MENU } from "@/lib/menu-data";
import { getDishStats } from "@/lib/reviews";

const TITLE = "Order Online · TERRA Mindspace Menu, Chalakudy";
const DESCRIPTION =
  "Browse the full TERRA Mindspace menu — Kerala combos, Malabar biryani, curries and breakfast — and order online for delivery or pickup in Chalakudy.";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

type Filter = "all" | "veg" | "nonveg" | "top";

function MenuPage() {
  const [active, setActive] = useState<string>("All");
  const [filter, setFilter] = useState<Filter>("all");
  const { count, subtotal, setOpen } = useCart();

  const items = useMemo(
    () =>
      MENU.filter((m) => (active === "All" ? true : m.category === active)).filter((m) => {
        if (filter === "veg") return m.veg;
        if (filter === "nonveg") return !m.veg;
        if (filter === "top") {
          const stats = getDishStats(m.id);
          return stats.averageRating >= 4.8;
        }
        return true;
      }),
    [active, filter]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, typeof MENU>();
    for (const item of items) {
      map.set(item.category, [...(map.get(item.category) ?? []), item]);
    }
    return [...map.entries()];
  }, [items]);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Order online</p>
          <h1 className="mt-4 text-5xl md:text-6xl">The menu</h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Everything is cooked to order. Delivery across Chalakudy in 35–45 minutes, pickup in 15.
          </p>
        </div>

        {/* Social Proof Trust Badge */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-primary/30 bg-primary/10 backdrop-blur shrink-0">
          <div className="flex -space-x-2">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-amber-500 font-bold text-xs text-background">
              4.9
            </span>
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-xs text-background">
              ★
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
              <Star className="size-3.5 fill-primary text-primary" />
              <span>4.9 / 5 Average Rating</span>
            </div>
            <p className="text-[0.7rem] text-muted-foreground flex items-center gap-1">
              <MessageSquare className="size-3 text-primary" />
              Verified Chalakudy customer reviews
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-30 -mx-5 mt-10 border-b border-border/60 bg-background/90 px-5 py-4 backdrop-blur-xl md:top-20">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs tracking-[0.12em] uppercase transition-colors ${
                active === cat
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {(
            [
              ["all", "Everything"],
              ["top", "★ Top Rated 4.8+"],
              ["veg", "Veg"],
              ["nonveg", "Non-veg"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-md px-3 py-1 text-xs transition-colors flex items-center gap-1 ${
                filter === key
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {grouped.map(([category, list]) => (
        <section key={category} className="mt-14">
          <h2 className="text-2xl tracking-[0.06em]">{category}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {list.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      {items.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">Nothing matches that filter.</p>
      )}

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-5 py-4 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <div className="text-sm">
              <p className="font-medium">
                {count} item{count > 1 ? "s" : ""}
              </p>
              <p className="text-muted-foreground">{inr(subtotal)} subtotal</p>
            </div>
            <Button variant="hero" size="lg" onClick={() => setOpen(true)}>
              View order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
