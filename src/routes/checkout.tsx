import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deliveryFee, inr, useCart, type CartLine } from "@/lib/cart";
import { RESTAURANT } from "@/lib/menu-data";

const TITLE = "Checkout · TERRA Mindspace Online Ordering";
const DESCRIPTION =
  "Confirm your TERRA Mindspace order — choose delivery in Chalakudy or pickup at Tramway Lane, and pay on arrival.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type Mode = "delivery" | "pickup";

type PlacedOrder = {
  id: string;
  lines: CartLine[];
  total: number;
  mode: Mode;
  name: string;
  eta: string;
};

function orderMessage(order: PlacedOrder) {
  const items = order.lines.map((l) => `${l.qty} x ${l.name} — ${inr(l.qty * l.price)}`).join("\n");
  return `New order ${order.id}\nName: ${order.name}\nType: ${order.mode}\n\n${items}\n\nTotal: ${inr(order.total)}`;
}

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [mode, setMode] = useState<Mode>("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  const fee = deliveryFee(subtotal, mode);
  const total = subtotal + fee;

  if (placed) {
    const wa = `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(orderMessage(placed))}`;
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <CheckCircle2 className="mx-auto size-14 text-leaf" />
        <h1 className="mt-6 text-4xl">Order confirmed</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks {placed.name.split(" ")[0]} — order{" "}
          <span className="text-primary">{placed.id}</span> is with our kitchen.
          {placed.mode === "delivery"
            ? " We'll ring you before we ride out."
            : " Collect it at Tramway Lane."}
        </p>
        <div className="mt-8 rounded-lg border border-border/70 bg-card/60 p-6 text-left">
          <ul className="space-y-2 text-sm">
            {placed.lines.map((l) => (
              <li key={l.id} className="flex justify-between">
                <span>
                  {l.qty} × {l.name}
                </span>
                <span className="text-muted-foreground">{inr(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-display text-lg">
            <span>{placed.mode === "delivery" ? "Delivery" : "Pickup"} total</span>
            <span className="text-primary">{inr(placed.total)}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Ready in about {placed.eta}. Pay cash or UPI on{" "}
            {placed.mode === "delivery" ? "delivery" : "pickup"}.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <a href={wa} target="_blank" rel="noreferrer">
              <MessageCircle /> Send on WhatsApp
            </a>
          </Button>
          <Button asChild variant="gold" size="lg">
            <a href={RESTAURANT.phoneHref}>Call the kitchen</a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/menu">Order more</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a puttum beefum and come right back.</p>
        <Button asChild variant="hero" size="lg" className="mt-8">
          <Link to="/menu">Browse the menu</Link>
        </Button>
      </div>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      toast.error("Please add your name and a 10-digit phone number.");
      return;
    }
    if (mode === "delivery" && address.trim().length < 8) {
      toast.error("We need a delivery address in Chalakudy.");
      return;
    }
    const order: PlacedOrder = {
      id: `CM-${Math.floor(1000 + Math.random() * 9000)}`,
      lines,
      total,
      mode,
      name: name.trim(),
      eta: mode === "delivery" ? "35–45 minutes" : "15 minutes",
    };
    setPlaced(order);
    clear();
    toast.success("Order sent to the kitchen");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pt-16 pb-24">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-4 text-5xl">Almost there</h1>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="space-y-6">
          <div className="flex gap-3">
            {(["delivery", "pickup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-lg border px-4 py-4 text-left transition-colors ${
                  mode === m
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="block text-sm font-semibold capitalize">{m}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {m === "delivery" ? "35–45 min in Chalakudy" : "Ready in 15 min"}
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="mt-2"
                required
              />
            </div>
          </div>

          {mode === "delivery" && (
            <div>
              <Label htmlFor="address">Delivery address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / flat, landmark, Chalakudy"
                className="mt-2"
                rows={3}
              />
            </div>
          )}

          <div>
            <Label htmlFor="notes">Kitchen notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Less spicy, extra pappadam…"
              className="mt-2"
              rows={2}
            />
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full">
            Place order · {inr(total)}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Pay cash or UPI on {mode}. No card needed.
          </p>
        </form>

        <aside className="h-fit rounded-lg border border-border/70 bg-card/60 p-6">
          <h2 className="text-xl">Your order</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-4">
                <span>
                  {l.qty} × {l.name}
                </span>
                <span className="text-muted-foreground">{inr(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>{mode === "pickup" ? "Pickup" : "Delivery"}</span>
              <span>{fee === 0 ? "Free" : inr(fee)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-display text-lg">
            <span>Total</span>
            <span className="text-primary">{inr(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
