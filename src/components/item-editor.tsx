import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_DRILLS,
  DEFAULT_SIZES,
  LEAD_OPTIONS,
  MOODS,
  formatUsd,
  type LeadTime,
  type Mood,
  type PriceOption,
  type Product,
} from "@/lib/products";
import { saveShopItem } from "@/lib/catalog-fns";

const fieldClass =
  "mt-2 min-h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne";
const areaClass =
  "mt-2 min-h-28 w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne";
const rowClass =
  "min-h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-fg outline-none focus:border-champagne";

function blankRow(prefix: string): PriceOption {
  return { id: `${prefix}-${Date.now()}`, label: "", price: 0 };
}

export function ItemEditor({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const save = useServerFn(saveShopItem);
  const isNew = !product;
  const [img, setImg] = useState(product?.img ?? "");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sizes, setSizes] = useState<PriceOption[]>(
    product ? product.sizes : DEFAULT_SIZES,
  );
  const [drills, setDrills] = useState<PriceOption[]>(
    product ? product.drills : DEFAULT_DRILLS,
  );
  const [sizeId, setSizeId] = useState("");
  const [drillId, setDrillId] = useState("");

  const size = sizes.find((s) => s.id === sizeId);
  const drill = drills.find((d) => d.id === drillId);
  const previewTotal = useMemo(() => {
    if (!size || !drill) return null;
    return (Number(size.price) || 0) + (Number(drill.price) || 0);
  }, [size, drill]);

  function patch(
    list: PriceOption[],
    setList: (next: PriceOption[]) => void,
    id: string,
    key: "label" | "price",
    value: string,
  ) {
    setList(
      list.map((row) =>
        row.id === id
          ? { ...row, [key]: key === "price" ? Number(value) || 0 : value }
          : row,
      ),
    );
  }

  function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Use a photo file.");
      return;
    }
    if (file.size > 2_000_000) {
      setError("Keep the photo under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImg(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    if (!img) {
      setError("Add an image.");
      return;
    }
    setPending(true);
    try {
      await save({
        data: {
          id: product?.id,
          name: String(data.get("name") ?? ""),
          blurb: String(data.get("blurb") ?? ""),
          price: String(data.get("price") ?? ""),
          img,
          leadTime: String(data.get("leadTime") ?? "") as LeadTime,
          mood: String(data.get("mood") ?? product?.mood ?? "fun") as Mood,
          buy: String(data.get("buy") ?? ""),
          sizes,
          drills,
        },
      });
      await router.invalidate({ sync: true });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-4 sm:items-center">
      <form
        onSubmit={onSubmit}
        className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-bg p-5 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-champagne">
              {isNew ? "New kit" : "Edit kit"}
            </p>
            <h2 className="mt-1 font-display text-3xl">
              {isNew ? "Add an item" : product.name}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Size and drills work like the live store: pick both, then the
              price fills in (canvas + drills).
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-[0.75rem] border border-line"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <label className="mt-6 block">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">Name *</span>
          <input name="name" required defaultValue={product?.name ?? ""} className={fieldClass} />
        </label>
        {isNew ? (
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">Mood</span>
            <select name="mood" className={fieldClass} defaultValue="fun">
              {MOODS.filter((m) => m.id !== "all").map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">
            Description *
          </span>
          <textarea name="blurb" required defaultValue={product?.blurb ?? ""} className={areaClass} />
        </label>
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">
            Live store link
          </span>
          <input
            name="buy"
            defaultValue={product?.buy ?? ""}
            className={fieldClass}
            placeholder="https://truesprakle.my-online.store/product/…"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">
            Simple price
          </span>
          <input
            name="price"
            defaultValue={product?.sizes?.length ? "" : product?.price ?? ""}
            className={fieldClass}
            placeholder="Only for accessories with no size/drill options"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">
            Lead time *
          </span>
          <select
            name="leadTime"
            required
            className={fieldClass}
            defaultValue={product?.leadTime ?? "1 month"}
          >
            {LEAD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-4">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">Image *</span>
          {img ? (
            <img src={img} alt="" className="mt-2 aspect-square w-28 rounded-[0.75rem] object-cover" />
          ) : null}
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full text-sm text-muted"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>

        <OptionList
          title="Size options"
          hint="Same as the live store Size dropdown."
          rows={sizes}
          onChange={setSizes}
          onPatch={(id, key, value) => patch(sizes, setSizes, id, key, value)}
          prefix="size"
        />
        <OptionList
          title="Drill options"
          hint="Same as the live store Drill option dropdown."
          rows={drills}
          onChange={setDrills}
          onPatch={(id, key, value) => patch(drills, setDrills, id, key, value)}
          prefix="drill"
        />

        <div className="mt-6 rounded-xl border border-line bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-champagne">
            Checkout preview
          </p>
          <p className="mt-1 text-sm text-muted">
            Shoppers pick a size and a drill option. The kit total is canvas +
            drills — same as the current store.
          </p>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Size *
            </span>
            <select
              className={`${fieldClass}`}
              value={sizeId}
              onChange={(e) => setSizeId(e.target.value)}
            >
              <option value="">Please select</option>
              {sizes
                .filter((s) => s.label.trim())
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label} — {formatUsd(Number(s.price) || 0)}
                  </option>
                ))}
            </select>
          </label>
          <label className="mt-3 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Drill option *
            </span>
            <select
              className={`${fieldClass}`}
              value={drillId}
              onChange={(e) => setDrillId(e.target.value)}
            >
              <option value="">Please select</option>
              {drills
                .filter((d) => d.label.trim())
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label} — {formatUsd(Number(d.price) || 0)}
                  </option>
                ))}
            </select>
          </label>
          <div className="mt-4">
            {previewTotal == null ? (
              <p className="text-sm text-muted">
                Pick a size and a drill option to see the kit price.
              </p>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.16em] text-champagne">
                  Kit total
                </p>
                <p className="mt-1 font-display text-4xl">{formatUsd(previewTotal)}</p>
                <p className="mt-1 text-xs text-muted">
                  Canvas {formatUsd(Number(size?.price) || 0)} + drills{" "}
                  {formatUsd(Number(drill?.price) || 0)}
                </p>
              </>
            )}
          </div>
        </div>

        {error ? (
          <p className="mt-4 text-sm text-primary-soft" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="mt-6 w-full" disabled={pending}>
          {pending ? "Saving…" : isNew ? "Add item" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}

function OptionList({
  title,
  hint,
  rows,
  onChange,
  onPatch,
  prefix,
}: {
  title: string;
  hint: string;
  rows: PriceOption[];
  onChange: (next: PriceOption[]) => void;
  onPatch: (id: string, key: "label" | "price", value: string) => void;
  prefix: string;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-xs uppercase tracking-[0.16em] text-champagne">{title}</legend>
      <p className="mt-1 text-sm text-muted">{hint}</p>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_7rem_2.75rem] gap-2">
            <input
              value={row.label}
              onChange={(e) => onPatch(row.id, "label", e.target.value)}
              className={rowClass}
              placeholder="30 × 40 cm"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={row.price || ""}
              onChange={(e) => onPatch(row.id, "price", e.target.value)}
              className={rowClass}
              placeholder="0.00"
            />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[0.75rem] border border-line text-muted hover:text-fg"
              onClick={() => onChange(rows.filter((r) => r.id !== row.id))}
              aria-label="Remove option"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-champagne hover:text-fg"
        onClick={() => onChange([...rows, blankRow(prefix)])}
      >
        <Plus className="size-4" />
        Add {prefix} option
      </button>
    </fieldset>
  );
}
