import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Catalog } from "@/components/catalog";
import { KitDetail } from "@/components/kit-detail";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { loadShop, loadShopItem } from "@/lib/catalog-fns";
import { THEME_SLUGS } from "@/lib/kit-copy";
import { PRODUCTS, type Mood } from "@/lib/products";
import { pageHead, THEMES } from "@/lib/seo";

const SITE_FALLBACK = "Original diamond painting kits from True Sparkle in Cleveland.";
const themeBySlug = Object.fromEntries(THEMES.map((t) => [t.id, t]));

export const Route = createFileRoute("/kits/$slug")({
  loader: async ({ params }) => {
    if (THEME_SLUGS.has(params.slug)) {
      const shop = await loadShop();
      return { kind: "theme" as const, slug: params.slug, shop };
    }
    const data = await loadShopItem({ data: { id: params.slug } });
    if (!data.product) {
      const byOldId = PRODUCTS.find((p) => p.id === params.slug);
      if (byOldId?.slug && byOldId.slug !== params.slug) {
        throw redirect({ href: `/kits/${byOldId.slug}` });
      }
      throw notFound();
    }
    if (data.product.slug && data.product.slug !== params.slug && data.product.id === params.slug) {
      throw redirect({ href: `/kits/${data.product.slug}` });
    }
    return { kind: "kit" as const, slug: params.slug, data };
  },
  head: ({ loaderData, params }) => {
    if (loaderData?.kind === "theme") {
      const theme = themeBySlug[params.slug];
      return pageHead({
        title: `${theme?.title ?? "Diamond Painting Kits"} | True Sparkle`,
        description: `Shop ${theme?.label.toLowerCase() ?? ""} original diamond painting kits from True Sparkle in Cleveland. Round or square drills, made to order.`,
        path: `/kits/${params.slug}`,
      });
    }
    const product = loaderData?.kind === "kit" ? loaderData.data.product : null;
    if (!product) {
      return pageHead({ title: "Kit | True Sparkle", description: SITE_FALLBACK, path: `/kits/${params.slug}` });
    }
    return pageHead({
      title: `${product.name} | True Sparkle`,
      description: product.blurb.slice(0, 155),
      path: `/kits/${product.slug ?? product.id}`,
      image: product.img,
      type: "product",
    });
  },
  component: KitsSlugPage,
});

const moodForTheme: Record<string, Mood> = {
  glam: "glam",
  wildlife: "wildlife",
  holiday: "seasonal",
  seasonal: "seasonal",
  heroes: "heroes",
  beginner: "fun",
  fun: "fun",
  tools: "tools",
};

function KitsSlugPage() {
  const loaded = Route.useLoaderData();
  if (loaded.kind === "theme") {
    const theme = themeBySlug[loaded.slug];
    const mood = moodForTheme[loaded.slug];
    const products = (loaded.shop.products.length ? loaded.shop.products : PRODUCTS).filter(
      (p) => p.mood === mood,
    );
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Kits", path: "/kits" },
              { name: theme?.label ?? loaded.slug, path: `/kits/${loaded.slug}` },
            ]}
          />
          <p className="mt-6 text-xs uppercase tracking-[0.28em] text-champagne">Original kits</p>
          <h1 className="mt-3 font-display text-5xl">{theme?.title}</h1>
          <p className="mt-4 max-w-2xl text-muted">
            {theme?.label} diamond painting kits designed by True Sparkle in Cleveland.
            Round or square drills. Made to order. Handmade tumblers and candles live at
            sister shop KayzCharmzz — this catalog is kits only.
          </p>
        </div>
        <Catalog products={products} isAdmin={loaded.shop.isAdmin} activeMood={mood} />
      </main>
    );
  }
  const { product, products, isAdmin } = loaded.data;
  if (!product) throw notFound();
  return <KitDetail product={product} catalog={products} isAdmin={isAdmin} />;
}
