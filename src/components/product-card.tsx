import type { Product } from "@/lib/products";
import { formatUsd, fromPrice, kitPath, leadLabel, moodLabel } from "@/lib/products";
import { Button, CtaGroup } from "@/components/ui/button";
import { trackEvent } from "@/lib/seo";

export function ProductCard({
  product,
  isAdmin,
  onEdit,
  onDelete,
}: {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}) {
  const start = fromPrice(product);
  const href = kitPath(product);
  const alt = product.alt ?? `${product.name} diamond painting kit by True Sparkle`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-transform duration-200 hover:-translate-y-1">
      <a href={href} className="block aspect-square overflow-hidden bg-surface-2">
        <img
          src={product.img}
          alt={alt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </a>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-champagne">
          {moodLabel(product.mood)}
        </p>
        <h3 className="font-display text-2xl leading-tight text-fg">
          <a href={href}>{product.name}</a>
        </h3>
        <p className="mt-auto pt-3 text-sm font-medium tabular-nums text-fg">
          {product.price
            ? product.price.startsWith("$")
              ? product.price
              : `From ${product.price}`
            : product.sizes.length
              ? start != null
                ? `From ${formatUsd(start)}`
                : "Select size & drills"
              : "Price on request"}
        </p>
        <p className="text-xs text-muted">{leadLabel(product)} lead</p>
        <CtaGroup className="pt-2">
          <Button asChild variant="ghost">
            <a href={href}>View kit</a>
          </Button>
          <Button asChild>
            <a
              href={product.buy}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("add_to_cart", {
                  item_id: product.id,
                  item_name: product.name,
                  currency: "USD",
                })
              }
            >
              Buy
            </a>
          </Button>
        </CtaGroup>
        {isAdmin ? (
          <CtaGroup className="pt-1">
            <Button type="button" variant="ghost" onClick={() => onEdit?.(product)}>
              Edit
            </Button>
            <Button type="button" variant="ghost" onClick={() => onDelete?.(product)}>
              Delete
            </Button>
          </CtaGroup>
        ) : null}
      </div>
    </article>
  );
}
