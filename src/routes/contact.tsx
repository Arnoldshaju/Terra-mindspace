import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RESTAURANT } from "@/lib/menu-data";

const TITLE = "Visit & Reservations · TERRA Mindspace, Chalakudy";
const DESCRIPTION =
  "Find TERRA Mindspace at Ukken Varghese Arcade, Tramway Lane, Chalakudy. Opening hours, phone number, directions and table reservations.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 pb-24">
      <p className="eyebrow">Visit</p>
      <h1 className="mt-4 text-5xl md:text-6xl">Come sit with us</h1>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex gap-4">
            <MapPin className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Address</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {RESTAURANT.address}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Also known at Kallingal Complex, near Chalakudy Railway Station.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Hours</h2>
              <p className="mt-1 text-sm text-muted-foreground">{RESTAURANT.hours}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Call or WhatsApp</h2>
              <a
                href={RESTAURANT.phoneHref}
                className="mt-1 block text-sm text-primary hover:underline"
              >
                {RESTAURANT.phone}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Utensils className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Reservations</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Tables for 2–12. Ring us and we'll hold one — weekends fill up
                after 7 pm.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <a href={RESTAURANT.phoneHref}>Call to reserve</a>
            </Button>
            <Button asChild variant="gold" size="lg">
              <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">
                Open in Maps
              </a>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/70 shadow-plate">
          <iframe
            title="Map to TERRA Mindspace, Chalakudy"
            src="https://www.google.com/maps?q=TERRA%20Mindspace%20Chalakudy%20Kerala%20680307&output=embed"
            className="h-[420px] w-full md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
