import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { fromPrice, kitPath, leadLabel, moodLabel, relatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { KitConfigurator } from "@/components/kit-configurator";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { THEMES, absoluteUrl } from "@/lib/seo";

export function KitDetail({
  product,
  catalog,
  isAdmin,
}: {
  product: Product;
  catalog?: Product[];
  isAdmin?: boolean;
}) {
  const related = relatedProducts(product, 3, catalog);
  const theme = THEMES.find((t) => t.mood === product.mood);
  const price = fromPrice(product);
  const path = kitPath(product);
  const alt = product.alt ?? `${product.name} diamond painting kit by True Sparkle`;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [product.id]);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: absoluteUrl(product.img),
    description: product.story ?? product.blurb,
    brand: { "@type": "Brand", name: "True Sparkle" },
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      priceCurrency: "USD",
      price: price != null ? price.toFixed(2) : undefined,
      availability: "https://schema.org/MadeToOrder",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
      },
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12">
      <JsonLd data={productLd} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Kits", path: "/kits" },
          ...(theme ? [{ name: theme.label, path: theme.path }] : []),
          { name: product.name, path },
        ]}
      />
      <a
        href="/kits"
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Back to catalog
      </a>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <img
            src={product.img}
            alt={alt}
            className="aspect-square w-full object-cover"
            width={800}
            height={800}
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-champagne">
            {moodLabel(product.mood)}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-muted">{product.size}</p>
          <p className="mt-1 text-sm text-champagne">{leadLabel(product)} lead</p>
          <p className="mt-6 text-lg text-cream/90">{product.blurb}</p>
          {product.story ? (
            <p className="mt-4 text-sm leading-relaxed text-muted">{product.story}</p>
          ) : null}
          <div className="mt-6 rounded-xl border border-line bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-champagne">
              In the kit
            </p>
            <p className="mt-2 text-sm text-fg">{product.kit}</p>
          </div>
          {product.disclaimer ? (
            <p className="mt-4 text-xs text-muted">{product.disclaimer}</p>
          ) : null}
          <KitConfigurator product={product} />
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl">More in this mood</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} isAdmin={isAdmin} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
