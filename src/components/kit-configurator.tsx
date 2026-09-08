import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { formatUsd, leadLabel } from "@/lib/products";
import { Button, CtaGroup } from "@/components/ui/button";

const selectClass =
  "min-h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-fg outline-none focus:border-champagne";

export function KitConfigurator({ product }: { product: Product }) {
  const isAccessory = product.sizes.length === 0;
  const [sizeId, setSizeId] = useState("");
  const [drillId, setDrillId] = useState("");

  const size = product.sizes.find((s) => s.id === sizeId);
  const drill = product.drills.find((d) => d.id === drillId);

  const total = useMemo(() => {
    if (isAccessory) {
      const n = Number((product.price ?? "").replace(/[^0-9.]/g, ""));
      return Number.isFinite(n) ? n : null;
    }
    if (!size || !drill) return null;
    return size.price + drill.price;
  }, [isAccessory, product.price, size, drill]);

  const ready = isAccessory || (Boolean(size) && Boolean(drill));

  return (
    <div className="mt-6 space-y-4">
      {isAccessory ? (
        <p className="font-display text-4xl text-fg">{product.price}</p>
      ) : (
        <>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Size *
            </span>
            <select
              className={`${selectClass} mt-2`}
              value={sizeId}
              onChange={(e) => setSizeId(e.target.value)}
            >
              <option value="">Please select</option>
              {product.sizes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} — {formatUsd(s.price)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Drill option *
            </span>
            <select
              className={`${selectClass} mt-2`}
              value={drillId}
              onChange={(e) => setDrillId(e.target.value)}
            >
              <option value="">Please select</option>
              {product.drills.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} — {formatUsd(d.price)}
                </option>
              ))}
            </select>
          </label>
          <div className="rounded-xl border border-line bg-surface p-4">
            {total == null ? (
              <p className="text-sm text-muted">
                Pick a size and a drill option to see the kit price.
              </p>
            ) : (
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-champagne">
                  Kit total
                </p>
                <p className="mt-1 font-display text-4xl text-fg">
                  {formatUsd(total)}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Canvas {formatUsd(size!.price)} + drills {formatUsd(drill!.price)}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <CtaGroup>
        <Button asChild className={ready ? undefined : "pointer-events-none opacity-50"}>
          <a href={product.buy} target="_blank" rel="noopener noreferrer">
            {ready ? "Buy on current store" : "Select options to buy"}
          </a>
        </Button>
        <Button asChild variant="ghost">
          <a href={product.buy} target="_blank" rel="noopener noreferrer">
            Open live cart
          </a>
        </Button>
      </CtaGroup>
      <p className="text-xs text-muted">
        {leadLabel(product)} lead. Checkout still happens on the current store.
        Choose the same size and drills there to match this total.
      </p>
    </div>
  );
}
