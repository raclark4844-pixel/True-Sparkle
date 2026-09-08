import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { leadLabel, moodLabel, relatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { KitConfigurator } from "@/components/kit-configurator";

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

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [product.id]);

  return (
    <main className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12">
      <a
        href="/#shop"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Back to catalog
      </a>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <img
            src={product.img}
            alt={product.name}
            className="aspect-square w-full object-cover"
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
