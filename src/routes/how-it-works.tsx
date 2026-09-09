import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead({
      title: "How to Start Diamond Painting | True Sparkle",
      description:
        "Beginner guide: canvas, drills, pen, wax, tray, and the washi-tape method. Round vs square drills explained by a Cleveland studio.",
      path: "/how-it-works",
    }),
  component: HowItWorks,
});

const parts = [
  {
    name: "The canvas",
    body: "A pre-printed adhesive cloth with symbols under a clear cover film. Each symbol maps to one drill color. Peel only the section you are working so the rest stays clean.",
  },
  {
    name: "The drills",
    body: "Tiny resin gems — round or square. Round is faster and softer. Square sits edge-to-edge for a tighter, tiled finish. Bags are labeled to match the chart.",
  },
  {
    name: "The stylus (pen)",
    body: "The applicator. Dip the tip in wax, pick up one drill, and press it onto the matching symbol. A light twist seats it.",
  },
  {
    name: "Wax and tray",
    body: "Wax gives the pen its grip. The tray holds a few drills at a time so you are not fishing in the bag. Shake the tray to line them up, point-side down.",
  },
  {
    name: "The color chart",
    body: "A legend of symbols, color numbers, and drill counts. Find the symbol on the canvas, match it on the chart, pick that bag. Work one color at a time if you like a calmer flow.",
  },
];

const steps = [
  {
    n: "01",
    t: "Unroll and flatten",
    d: "Lay the canvas face-up. If it curls, roll it the opposite way or rest a few heavy books on it (with the cover film still on) for a few hours.",
  },
  {
    n: "02",
    t: "Read the chart once",
    d: "Scan symbols, color codes, and totals. Sort bags in chart order. This is the whole instruction set — there is no guessing once you can read the key.",
  },
  {
    n: "03",
    t: "Section with washi tape",
    d: "On a large sticky canvas, tape off a small daily square. Peel only that patch. The rest stays covered so dust, hair, and skin oils never kill the adhesive.",
  },
  {
    n: "04",
    t: "Place, then press",
    d: "Fill the open square. When a section is done, press it with the back of the tray or a rolling pin. When the whole piece is finished, cover with parchment and stack heavy books overnight so gems stay put.",
  },
];

function HowItWorks() {
  return (
    <main className="pt-24">
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-champagne">Beginner guide</p>
        <h1 className="mt-3 font-display text-5xl">How diamond painting works</h1>
        <p className="mt-4 text-muted">
          This is the ranking page we wish every kit came with. No clinic talk — a calm,
          repeatable craft from a Cleveland studio. Round vs square: round is faster;
          square tiles tighter. Then hang the picture.
        </p>
      </section>
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-4xl">Everything in the box, named</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parts.map((part) => (
            <article key={part.name} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-display text-2xl">{part.name}</h3>
              <p className="mt-2 text-sm text-muted">{part.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-16 max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-4xl">The physical workflow</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-display text-3xl text-primary">{s.n}</p>
              <h3 className="mt-2 font-display text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10">
          <Link
            to="/kits/$slug"
            params={{ slug: "beginner" }}
            className="text-champagne underline"
          >
            Shop beginner diamond painting kits
          </Link>
          {" · "}
          <Link to="/custom" className="text-champagne underline">
            Turn a photo into a kit
          </Link>
        </p>
      </section>
    </main>
  );
}
