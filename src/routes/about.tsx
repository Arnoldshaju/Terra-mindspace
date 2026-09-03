import { createFileRoute, Link } from "@tanstack/react-router";

import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-puttu.jpg";
import { Button } from "@/components/ui/button";

const TITLE = "Our Story · TERRA Mindspace, Chalakudy";
const DESCRIPTION =
  "How TERRA Mindspace brings Malabar and Thrissur home cooking to Chalakudy — slow-roasted beef, coconut oil, and recipes kept in the family.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-16 pb-24">
      <p className="eyebrow">Our story</p>
      <h1 className="mt-4 max-w-3xl text-5xl leading-tight md:text-6xl">
        A TERRA kitchen with a{" "}
        <span className="text-gradient-ember">Chalakudy address</span>
      </h1>

      <div className="mt-12 overflow-hidden rounded-lg shadow-plate">
        <img
          src={heroImg}
          alt="Puttu and beef fry plated on banana leaf"
          loading="lazy"
          width={1600}
          height={1200}
          className="w-full object-cover"
        />
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>
            TERRA Mindspace started with one stubborn idea: that the food you
            eat out should taste like the food you grew up eating at home. Not
            lighter. Not tamer. The same coconut oil, the same kudampuli sourness,
            the same pepper heat.
          </p>
          <p>
            Our beef is roasted low for hours until the masala clings to it. Our
            puttu is steamed in batches through the day so it never sits.
            Biryani goes on dum with kaima rice and fried shallots, and the fish
            curry is made fresh each morning with the day's catch.
          </p>
        </div>
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>
            The room off Tramway Lane is deliberately calm — brass lamps, dark
            wood, clean tables and staff who notice when your glass is empty.
            Guests tell us the ambience is why they stay; the beef ularthiyathu is
            why they come back.
          </p>
          <p>
            We keep the menu tight on purpose. Fewer dishes, cooked properly,
            every single service.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { k: "4.2", v: "Google rating across 83 reviews" },
          { k: "₹200–400", v: "Average spend per person" },
          { k: "11:30 am", v: "Doors open, every day" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-border/70 bg-card/50 p-7">
            <p className="font-display text-3xl text-primary">{s.k}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 overflow-hidden rounded-lg shadow-plate">
        <img
          src={interiorImg}
          alt="Dining room interior with brass pendant lamps"
          loading="lazy"
          width={1600}
          height={1008}
          className="w-full object-cover"
        />
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild variant="hero" size="lg">
          <Link to="/menu">Order online</Link>
        </Button>
        <Button asChild variant="gold" size="lg">
          <Link to="/contact">Visit us</Link>
        </Button>
      </div>
    </div>
  );
}
