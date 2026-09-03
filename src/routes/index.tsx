import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Leaf, Star, UtensilsCrossed } from "lucide-react";

import heroImg from "@/assets/hero-simple-vibe.jpg";
import interiorImg from "@/assets/interior.jpg";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/cart";
import { MENU, RESTAURANT } from "@/lib/menu-data";

const TITLE = "TERRA Mindspace · Kerala Restaurant & Online Ordering, Chalakudy";
const DESCRIPTION =
  "Authentic Malabar and Kerala food in Chalakudy — puttum beefum, Thalassery biryani, kudampuli fish curry. Order online for delivery or pickup.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: RESTAURANT.name,
          servesCuisine: ["Kerala", "Malabar", "Indian"],
          priceRange: "₹200–400",
          telephone: "+918921920058",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ukken Varghese Arcade, Tramway Ln",
            addressLocality: "Chalakudy",
            addressRegion: "Kerala",
            postalCode: "680307",
            addressCountry: "IN",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: RESTAURANT.rating,
            reviewCount: RESTAURANT.reviews,
          },
        }),
      },
    ],
  }),
  component: Home,
});

const REVIEWS = [
  {
    quote: "Had a good experience — great food, good staff, clean place. Highly recommended.",
    author: "Google review",
  },
  {
    quote: "Yummy food and good service. One of the best food spots in Chalakudy.",
    author: "Google review",
  },
  {
    quote: "Traditional combos like puttum beefum with really satisfying portions.",
    author: "Swiggy diner",
  },
];

function Home() {
  const signatures = MENU.filter((m) => m.signature).slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Softly lit restaurant interior with warm ambient light"
          width={1600}
          height={1200}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-veil" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-32">
          <p className="eyebrow animate-rise">Chalakudy · Thrissur · Since day one</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[0.95] animate-rise sm:text-6xl md:text-7xl">
            Malabar fire,
            <br />
            <span className="text-gradient-ember">served on a banana leaf.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground animate-rise md:text-lg">
            Puttum beefum, dum biryani and kudampuli curries — cooked in coconut oil, plated hot,
            and now delivered to your door in Chalakudy.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-rise">
            <Button asChild variant="hero" size="xl">
              <Link to="/menu">Order online</Link>
            </Button>
            <Button asChild variant="gold" size="xl">
              <a href={RESTAURANT.phoneHref}>Call {RESTAURANT.phone}</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Star className="size-4 text-primary" />
              {RESTAURANT.rating} · {RESTAURANT.reviews} Google reviews
            </span>
            <span>{RESTAURANT.priceRange}</span>
            <span>{RESTAURANT.hours}</span>
          </div>
        </div>
      </section>

      {/* SIGNATURES */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The house classics</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Dishes people drive down for</h2>
          </div>
          <Button asChild variant="gold">
            <Link to="/menu">See full menu</Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {signatures.map((item) => (
            <article key={item.id} className="group">
              <div className="overflow-hidden rounded-lg shadow-plate">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 text-2xl">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <p className="mt-3 font-display text-lg text-primary">{inr(item.price)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* STRIP */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-3">
          {[
            {
              icon: Flame,
              title: "Roasted, not rushed",
              body: "Beef ularthiyathu takes two hours on low flame. We don't shortcut it.",
            },
            {
              icon: Leaf,
              title: "Coconut oil only",
              body: "Fresh grated coconut, kudampuli and curry leaf sourced weekly.",
            },
            {
              icon: UtensilsCrossed,
              title: "Portions that satisfy",
              body: "Diners keep saying it: generous plates at ₹200–400 per person.",
            },
          ].map((f) => (
            <div key={f.title}>
              <f.icon className="size-6 text-primary" />
              <h3 className="mt-4 text-xl">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AMBIANCE */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg shadow-plate">
          <img
            src={interiorImg}
            alt="Warm lamplit dining room at TERRA Mindspace"
            loading="lazy"
            width={1600}
            height={1008}
            className="w-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">The room</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Brass lamps, dark teak, clean tables</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            A calm room off Tramway Lane where families sit long after the plates are cleared.
            Attentive staff, spotless floors and the smell of roasting spice — the reason guests
            call it the best food spot in Chalakudy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero">
              <Link to="/contact">Reserve a table</Link>
            </Button>
            <Button asChild variant="gold">
              <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">
                Directions
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <p className="eyebrow text-center">4.2 across 83 reviews</p>
          <h2 className="mt-4 text-center text-4xl md:text-5xl">What diners say</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <blockquote
                key={r.quote}
                className="rounded-lg border border-border/70 bg-background/60 p-7"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 leading-relaxed">“{r.quote}”</p>
                <footer className="mt-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {r.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h2 className="text-4xl md:text-6xl">
          Hungry? <span className="text-gradient-ember">We're 20 minutes away.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Free delivery on orders above ₹499 across Chalakudy. Pickup ready in 15 minutes.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="xl">
            <Link to="/menu">Start your order</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
