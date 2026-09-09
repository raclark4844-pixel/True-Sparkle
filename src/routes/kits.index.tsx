import { createFileRoute, Link } from "@tanstack/react-router";
import { Catalog } from "@/components/catalog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { loadShop } from "@/lib/catalog-fns";
import { PRODUCTS } from "@/lib/products";
import { pageHead, THEMES } from "@/lib/seo";

export const Route = createFileRoute("/kits/")({
  loader: () => loadShop(),
  head: () =>
    pageHead({
      title: "Original Diamond Painting Kits | True Sparkle",
      description:
        "Shop original diamond painting kits by theme — glam, wildlife, holiday, heroes, and beginner. Round or square drills, made to order in Cleveland.",
      path: "/kits",
    }),
  component: KitsIndex,
});

function KitsIndex() {
  const shop = Route.useLoaderData();
  const products = shop.products.length ? shop.products : PRODUCTS;
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Kits", path: "/kits" },
          ]}
        />
        <p className="mt-6 text-xs uppercase tracking-[0.28em] text-champagne">Catalog</p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl">Original diamond painting kits</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Clean URLs, one kit per page. Choose a theme or browse the full studio catalog.
          Custom photo kits are a separate page.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {THEMES.map((theme) => (
            <li key={theme.id}>
              <Link
                to="/kits/$slug"
                params={{ slug: theme.id }}
                className="inline-flex h-10 items-center rounded-full border border-line px-4 text-xs uppercase tracking-[0.16em] hover:border-champagne"
              >
                {theme.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Catalog products={products} isAdmin={shop.isAdmin} />
    </main>
  );
}
