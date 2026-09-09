import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { STUDIO_EMAIL, STUDIO_LOCATION } from "@/lib/studio";

export const Route = createFileRoute("/about")({ component: AboutPage });

const kitParts = [
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
    d: "Scan symbols, color codes, and totals. Sort bags in chart order. This is the whole “instruction set” — there is no guessing once you can read the key.",
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

const benefits = [
  {
    t: "Structured quiet",
    d: "Low decision-making. The next move is already printed. That predictability is what makes the craft feel like rest instead of another task to invent.",
  },
  {
    t: "A repeating rhythm",
    d: "Pick, place, pick, place. The motion is small and steady. Many painters use that rhythm to turn down mental noise and keep their hands busy in a kind way.",
  },
  {
    t: "One thing at a time",
    d: "You cannot place a drill and also scroll the day. The square in front of you asks for concentration — a simple way to land in the present moment.",
  },
  {
    t: "Visible progress",
    d: "Each finished patch is proof. Tracking those little completions gives a healthy feedback loop: you did a square, you can see it, you can stop or keep going.",
  },
  {
    t: "Fine motor play",
    d: "Kids, grandparents, first-timers — the craft trains a light, precise hand without feeling like practice. Families can share a canvas or sit together on their own kits.",
  },
  {
    t: "Art you hang",
    d: "When the last drill is down, you have a sparkling picture with your hours in it. That is the point of True Sparkle: finish proud.",
  },
];

function AboutPage() {
  return (
    <main>
      <section className="border-b border-line pt-24 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:items-center sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-champagne">
              Black-owned · woman-led · family
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
              A family studio for pictures that shine.
            </h1>
            <p className="mt-5 text-muted">
              True Sparkle is a Black-owned, woman-led, family-oriented studio
              based in Cleveland, Ohio. We design original diamond painting
              kits — bold characters, rich portraits, holiday scenes, and
              playful chaos — so our community can create, relax, and hang work
              they are proud of.
            </p>
            <p className="mt-4 text-muted">
              Built for families, first-time painters, and anyone who wants art
              that looks like them. This page is the beginner blueprint we wish
              every kit came with.
            </p>
            <p className="mt-4 text-muted">
              Turn your photo into a kit. If the picture that matters isn’t in
              the catalog, send it to{" "}
              <a
                href={`mailto:${STUDIO_EMAIL}`}
                className="text-champagne underline decoration-champagne/60 hover:text-fg"
              >
                {STUDIO_EMAIL}
              </a>
              . We’ll make a custom layout. Studio in {STUDIO_LOCATION}.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-line">
            <img
              src="/hero-2.jpg"
              alt="Hands placing drills on a True Sparkle canvas"
              className="aspect-[4/5] w-full object-cover sm:aspect-square"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">
            Creative advantages
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
            Why it feels like a reset
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            We are a craft studio, not a clinic. What we hear from painters —
            and what the hobby is known for — is simple: a calm, repeatable
            task that rewards you as you go.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <article
                key={b.t}
                className="rounded-xl border border-line bg-surface p-5"
              >
                <h3 className="font-display text-2xl">{b.t}</h3>
                <p className="mt-2 text-sm text-muted">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className="scroll-mt-20 border-t border-line py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">
            Anatomy of a kit
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
            Everything in the box, named.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            If you can name the five pieces, you can start. No extra tools
            required for your first canvas.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kitParts.map((part) => (
              <article
                key={part.name}
                className="rounded-xl border border-line bg-surface p-5"
              >
                <h3 className="font-display text-2xl">{part.name}</h3>
                <p className="mt-2 text-sm text-muted">{part.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-4xl leading-none sm:text-5xl">
            The physical workflow
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Work small. Keep unused adhesive covered. Press when you are done.
            That is how gems stay on and the sticky stays sticky.
          </p>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {steps.map((s) => (
              <li
                key={s.n}
                className="rounded-xl border border-line bg-bg/40 p-5"
              >
                <p className="font-display text-3xl text-primary">{s.n}</p>
                <h3 className="mt-2 font-display text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-xl border border-line bg-bg/60 p-5">
            <h3 className="font-display text-2xl">The washi tape method</h3>
            <p className="mt-2 max-w-3xl text-sm text-muted">
              Low-tack washi (or painter’s tape) is the beginner hack we
              recommend on bigger kits. Grid the canvas into squares you can
              finish in one sitting. Peel the cover film only inside that tape
              frame. If you need to stop, press the film back down or retape.
              Never leave a large sticky field open on a coffee table — dust
              loves it, and so do sleeves.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-display text-3xl">Ready for your first kit?</p>
          <Button asChild>
            <Link to="/" hash="shop">
              Shop kits
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
