import { Link } from "@tanstack/react-router";
import { Gem, Heart, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  {
    icon: LayoutGrid,
    title: "Low decisions, high sparkle",
    body: "The chart tells you where each color goes. You follow the symbols, one drill at a time — a steady rhythm instead of a blank page.",
  },
  {
    icon: Heart,
    title: "A quiet that you can feel",
    body: "Placing stones asks for your full attention. That focus is what many painters use to step out of the day’s noise and into the present square.",
  },
  {
    icon: Gem,
    title: "Progress you can see",
    body: "Every finished patch is a small win. Watching a scene fill in gives a clean reward loop — and a canvas you can hang when you are done.",
  },
];

export function CraftPrimer() {
  return (
    <section id="why" className="scroll-mt-20 border-b border-line bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">
            Why this craft sticks
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-fg sm:text-5xl">
            Structured relaxation, one diamond at a time.
          </h2>
          <p className="mt-4 text-muted">
            Diamond painting is simple on purpose. Predictable placement, a
            repeating motion, and a picture that slowly appears — that is the
            whole loop. We wrote the full beginner blueprint on our About page.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-line bg-bg/50 p-5"
            >
              <item.icon className="size-5 text-primary" aria-hidden />
              <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <article className="mt-6 rounded-xl border border-line bg-bg/50 p-5">
          <h3 className="font-display text-2xl">Turn your photo into a kit.</h3>
          <p className="mt-2 text-sm text-muted">
            Family portraits, pets, and pictures that never show up in a
            big-box aisle — send the photo, we design the layout.
          </p>
        </article>
        <Button asChild variant="ghost" className="mt-8">
          <Link to="/about" hash="guide">
            Read the full kit guide
          </Link>
        </Button>
      </div>
    </section>
  );
}
