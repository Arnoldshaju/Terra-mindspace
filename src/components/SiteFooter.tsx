import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

import { RESTAURANT } from "@/lib/menu-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <h3 className="text-xl tracking-[0.14em] uppercase">
            TERRA <span className="text-primary">Mindspace</span>
          </h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {RESTAURANT.tagline}. Puttum beefum, Malabar biryani and kudampuli curries cooked the
            way our grandmothers did.
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p className="eyebrow">Find us</p>
          <p className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{RESTAURANT.address}</span>
          </p>
          <p className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{RESTAURANT.hours}</span>
          </p>
          <p className="flex gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
            <a href={RESTAURANT.phoneHref} className="hover:text-primary">
              {RESTAURANT.phone}
            </a>
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="eyebrow">Explore</p>
          <Link to="/menu" className="block hover:text-primary">
            Order online
          </Link>
          <Link to="/about" className="block hover:text-primary">
            Our story
          </Link>
          <Link to="/contact" className="block hover:text-primary">
            Visit & reservations
          </Link>
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="block hover:text-primary"
          >
            Get directions
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TERRA Mindspace, Chalakudy · Rated {RESTAURANT.rating} by{" "}
        {RESTAURANT.reviews} diners
      </div>
    </footer>
  );
}
