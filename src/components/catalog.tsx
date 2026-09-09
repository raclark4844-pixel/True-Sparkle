import { useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MOODS, type Mood, type Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { ItemEditor } from "@/components/item-editor";
import { deleteShopItem } from "@/lib/catalog-fns";
import { cn } from "@/lib/cn";
import { STUDIO_EMAIL } from "@/lib/studio";

export function Catalog({
  products,
  isAdmin,
}: {
  products: Product[];
  isAdmin: boolean;
}) {
  const [mood, setMood] = useState<Mood | "all">("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const router = useRouter();
  const remove = useServerFn(deleteShopItem);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (mood !== "all" && p.mood !== mood) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.mood.includes(q)
      );
    });
  }, [mood, query, products]);

  async function onDelete(product: Product) {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    await remove({ data: { id: product.id } });
    await router.invalidate({ sync: true });
  }

  return (
    <section id="shop" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-champagne">
              Catalog
            </p>
            <h2 className="font-display text-5xl leading-none text-fg sm:text-6xl">
              Shop by mood
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            Open a kit, pick size and drills to see the price, then check out on
            the current store. Each kit lists its lead time.
          </p>
        </div>

        {isAdmin ? (
          <div className="mb-6">
            <Button type="button" onClick={() => setEditing("new")}>
              Add item
            </Button>
          </div>
        ) : null}

        <article className="mb-10 grid overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-2">
          <img
            src="/hero-2.jpg"
            alt="Hands placing drills on a custom diamond painting canvas"
            className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto"
          />
          <div className="flex flex-col justify-center p-5 sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-champagne">
              Custom art
            </p>
            <h3 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
              Turn your photo into a kit.
            </h3>
            <p className="mt-3 text-sm text-muted">
              Upload a portrait, pet, or family picture. It emails straight to{" "}
              <a
                href={`mailto:${STUDIO_EMAIL}`}
                className="text-champagne underline decoration-champagne/60 hover:text-fg"
              >
                {STUDIO_EMAIL}
              </a>{" "}
              — we send back size, drills, and a price.
            </p>
            <div className="mt-5">
              <Button asChild>
                <a href="/custom">Upload photos</a>
              </Button>
            </div>
          </div>
        </article>

        <div className="mb-6">
          <label className="sr-only" htmlFor="kit-search">
            Search kits
          </label>
          <input
            id="kit-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kits"
            className="min-h-11 w-full rounded-full border border-line bg-surface px-5 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne sm:max-w-sm"
          />
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMood(m.id)}
              className={cn(
                "shrink-0 rounded-[0.75rem] border px-4 text-sm font-medium h-11",
                mood === m.id
                  ? "border-primary bg-primary text-white"
                  : "border-line text-fg hover:border-champagne",
              )}
            >
              {m.label}
            </button>
          ))}
          <a
            href="/custom"
            className="inline-flex h-11 shrink-0 items-center rounded-[0.75rem] border border-line px-4 text-sm font-medium text-fg hover:border-champagne"
          >
            Custom art
          </a>
        </div>

        {list.length === 0 ? (
          <p className="text-muted">No kits match that filter yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isAdmin={isAdmin}
                onEdit={setEditing}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
      {editing ? (
        <ItemEditor
          product={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </section>
  );
}
