import { Link } from "@tanstack/react-router";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { RESTAURANT } from "@/lib/menu-data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Order Online" },
  { to: "/billing", label: "Billing" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Visit" },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-[0.18em] uppercase md:text-xl">
            TERRA <span className="text-primary">Mindspace</span>
          </span>
          <span className="mt-1 text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
            Chalakudy · Kerala
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={RESTAURANT.phoneHref}
            className="hidden text-muted-foreground transition-colors hover:text-primary md:block"
            aria-label={`Call ${RESTAURANT.name}`}
          >
            <Phone className="size-4" />
          </a>
          <Button
            variant="gold"
            size="sm"
            className="relative"
            onClick={() => setOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-gradient-ember text-[0.65rem] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobile ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobile && (
        <nav className="border-t border-border/60 bg-card px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobile(false)}
              className="block py-3 text-sm tracking-[0.18em] uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
