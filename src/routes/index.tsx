import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Catalog } from "@/components/catalog";
import { CraftPrimer } from "@/components/craft-primer";
import { PRODUCTS } from "@/lib/products";
import { KIT_META } from "@/lib/kit-copy";
import { loadShop } from "@/lib/catalog-fns";
import { Button, CtaGroup } from "@/components/ui/button";
import { pageHead, SITE_DESCRIPTION, SITE_TITLE, THEMES } from "@/lib/seo";

type HomeSearch = { kit?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    kit:
      typeof search.kit === "string" && search.kit.length > 0
        ? search.kit
        : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (search.kit) {
      const slug = KIT_META[search.kit]?.slug ?? search.kit;
      throw redirect({ href: `/kits/${slug}` });
    }
  },
  loader: () => loadShop(),
  head: () =>
    pageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: "/",
    }),
  component: Home,
});

function Home() {
  const shop = Route.useLoaderData();
  const products = shop.products.length ? shop.products : PRODUCTS;

  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src="/hero-2.jpg"
          alt="Hands placing drills on a True Sparkle original diamond painting kit"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/25" />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32">
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">
            Black-owned · woman-led · family studio
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] text-fg sm:text-7xl">
            Original diamond painting kits
            <span className="mt-2 block text-3xl italic text-primary-soft sm:text-5xl">
              and custom photo kits
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-cream/90">
            Create it. Sparkle it. Make it yours. Glam, wildlife, heroes, holidays,
            and beginner kits with round or square drills — designed in Cleveland.
          </p>
          <CtaGroup className="mt-8">
            <Button asChild>
              <Link to="/kits">Browse original kits</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/custom">Turn your photo into a kit</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/how-it-works">How it works</Link>
            </Button>
          </CtaGroup>
        </div>
      </section>

      <section className="border-b border-line py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 sm:px-6">
          {THEMES.map((theme) => (
            <Link
              key={theme.id}
              to="/kits/$slug"
              params={{ slug: theme.id }}
              className="inline-flex h-11 items-center rounded-full border border-line px-4 text-xs uppercase tracking-[0.16em] hover:border-champagne"
            >
              {theme.label}
            </Link>
          ))}
        </div>
      </section>

      <CraftPrimer />

      <Catalog products={products} isAdmin={shop.isAdmin} />
    </main>
  );
}
