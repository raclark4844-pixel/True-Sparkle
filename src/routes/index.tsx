import { createFileRoute, Link } from "@tanstack/react-router";
import { Catalog } from "@/components/catalog";
import { CraftPrimer } from "@/components/craft-primer";
import { KitDetail } from "@/components/kit-detail";
import { PRODUCTS, STORE_URL } from "@/lib/products";
import { loadShop } from "@/lib/catalog-fns";
import { Button, CtaGroup } from "@/components/ui/button";

type HomeSearch = { kit?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    kit:
      typeof search.kit === "string" && search.kit.length > 0
        ? search.kit
        : undefined,
  }),
  loader: () => loadShop(),
  component: Home,
});

function Home() {
  const { kit } = Route.useSearch();
  const shop = Route.useLoaderData();
  const products = shop.products.length ? shop.products : PRODUCTS;
  const selected = kit ? products.find((p) => p.id === kit) : undefined;
  if (selected) {
    return (
      <KitDetail product={selected} catalog={products} isAdmin={shop.isAdmin} />
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src="/hero-2.jpg"
          alt="Black woman's hands placing diamond painting drills"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/25" />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32">
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">
            Black-owned · woman-led · family studio
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-6xl leading-[0.92] text-fg sm:text-8xl">
            Create it.
            <br />
            <em className="text-primary-soft">Sparkle it.</em>
            <br />
            Make it yours.
          </h1>
          <p className="mt-4 max-w-lg text-cream/90">
            Turn your photo into a kit — paste a picture and we’ll chart a
            custom diamond layout.
          </p>
          <p className="mt-2">
            <a
              href="/custom"
              className="text-sm text-champagne underline decoration-champagne/60 hover:text-fg"
            >
              Send a photo
            </a>
          </p>
          <p className="mt-5 max-w-lg text-lg text-cream/90">
            Original kits you actually want to hang — glam, wildlife, heroes,
            holidays, and the fun stuff that never shows up in a big-box craft
            aisle.
          </p>
          <CtaGroup className="mt-8">
            <Button asChild>
              <a href="#shop">Browse the catalog</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                Checkout on the current store
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#why">Why we paint</a>
            </Button>
          </CtaGroup>
        </div>
      </section>

      <CraftPrimer />

      <div className="overflow-hidden border-y border-line py-3">
        <p className="whitespace-nowrap text-center text-xs uppercase tracking-[0.22em] text-champagne">
          Create it · Sparkle it · Make it yours · Where creativity meets the
          sparkle · Round or square drills · Beginner friendly
        </p>
      </div>

      <Catalog products={products} isAdmin={shop.isAdmin} />

      <section id="how" className="scroll-mt-20 border-t border-line bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-5xl leading-none sm:text-6xl">
            How a kit works
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Pick a world",
                d: "Glam closet, safari sunset, candy shop, firehouse, winter train — shop by mood.",
              },
              {
                n: "02",
                t: "Choose your drills",
                d: "Most kits offer round or square. Round is faster. Square gives a tighter finish.",
              },
              {
                n: "03",
                t: "Peel, place, sparkle",
                d: "Pre-printed adhesive canvas, symbol chart, pen, wax, and tray come in the box.",
              },
              {
                n: "04",
                t: "Hang it",
                d: "Finished pieces are made to display. Frame it, gift it, or let the light hit the drills.",
              },
              {
                n: "05",
                t: "Or turn your photo into a kit",
                d: "Paste your picture and we’ll chart it.",
              },
            ].map((s) => (
              <article
                key={s.n}
                className="rounded-xl border border-line bg-bg/40 p-5"
              >
                <p className="font-display text-3xl text-primary">{s.n}</p>
                <h3 className="mt-2 font-display text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:items-center sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-champagne">
              Black-owned · woman-led · family
            </p>
            <h2 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
              Every picture deserves a chance to shine.
            </h2>
            <p className="mt-5 text-muted">
              True Sparkle is a Black-owned, woman-led, family-oriented studio.
              We design original diamond painting kits — bold characters, rich
              portraits, holiday scenes, and playful chaos — so our community
              can create, relax, and hang work they are proud of.
            </p>
            <p className="mt-4 text-muted">
              Built for families, first-time painters, and anyone who wants art
              that looks like them. Whether this is kit number one or kit number
              fifty, the aim is the same: excitement while you work, and a
              finished canvas that belongs on the wall.
            </p>
            <p className="mt-8">
              <Button asChild variant="ghost">
                <Link to="/about">Our story, kit guide, and why we paint</Link>
              </Button>
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-line">
            <img
              src="/products/queen.jpg"
              alt="Jewel-toned mosaic queen diamond painting design"
              className="aspect-[4/5] w-full object-cover sm:aspect-square"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-display text-3xl">Ready to start a canvas?</p>
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
