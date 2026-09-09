import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { STUDIO_EMAIL } from "@/lib/studio";
import { pageHead, trackEvent } from "@/lib/seo";

export const Route = createFileRoute("/custom")({
  head: () =>
    pageHead({
      title: "Custom Photo Diamond Painting | True Sparkle",
      description:
        "Turn a photo into a diamond painting kit. Sizes, round or square drills, lead time, and which pictures work — charted in Cleveland.",
      path: "/custom",
    }),
  component: CustomPage,
});

const fieldClass =
  "mt-2 min-h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne";

const areaClass =
  "mt-2 min-h-28 w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne";

const SIZES = [
  "Studio recommends",
  "30 × 40 cm",
  "40 × 40 cm",
  "50 × 50 cm",
  "60 × 60 cm",
  "70 × 70 cm",
];

function CustomPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list)) {
      if (!file.type.startsWith("image/") && file.type !== "") continue;
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      next.push(file);
    }
    setFiles(next.slice(0, 5));
    setSent(false);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!files.length) {
      setError("Add at least one photo.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    files.forEach((file) => data.append("photos", file));
    setPending(true);
    try {
      const res = await fetch("/api/custom-art", { method: "POST", body: data });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        retryClient?: boolean;
      };
      if (res.ok && !payload.error) {
        setSent(true);
        setFiles([]);
        form.reset();
        trackEvent("generate_lead", { form: "custom-kit" });
        return;
      }
      if (payload.retryClient) {
        const { sendStudioMail } = await import("@/lib/custom-art-mail");
        await sendStudioMail({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          size: String(data.get("size") ?? "").trim(),
          notes: String(data.get("notes") ?? "").trim(),
          files,
        });
        setSent(true);
        setFiles([]);
        form.reset();
        trackEvent("generate_lead", { form: "custom-kit" });
        return;
      }
      setError(payload.error || "Could not send. Try again.");
    } catch {
      setError("Could not send. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Custom photo diamond painting kit",
          provider: { "@type": "Organization", name: "True Sparkle" },
          areaServed: "US",
          description:
            "Turn a personal photo into a made-to-order diamond painting kit with size and drill options, charted in Cleveland, Ohio.",
        }}
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">
            Custom art
          </p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
            Send a photo. We make the kit.
          </h1>
          <p className="mt-5 text-muted">
            Portrait, pet, wedding, or game-day shot — upload it here. True Sparkle
            charts a custom layout: size, round or square drills, and a price range
            after we see the photo. Sharp daylight photos work. Tiny faces, heavy
            filters, and screenshots usually do not. Lead time follows the studio
            queue (typically about a month after we confirm). Handmade tumblers and
            jewelry are at sister shop KayzCharmzz — this page is kits only.
          </p>
          <h2 className="mt-8 font-display text-2xl">What photos work</h2>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>Up to 5 photos, 8 MB each.</li>
            <li>Clear, well-lit pictures work best.</li>
            <li>We only use your photos to design your kit.</li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-line bg-surface p-5 sm:p-8"
          noValidate
        >
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Name *
            </span>
            <input name="name" autoComplete="name" required className={fieldClass} placeholder="Your name" />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Email *
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className={fieldClass}
              placeholder="you@email.com"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Phone <span className="normal-case tracking-normal">(optional)</span>
            </span>
            <input name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="Mobile number" />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Preferred size
            </span>
            <select name="size" className={fieldClass} defaultValue={SIZES[0]}>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              What should we make?
            </span>
            <textarea
              name="notes"
              className={areaClass}
              placeholder="Portrait of my daughter, pet, wedding photo…"
            />
          </label>
          <p className="sr-only" aria-hidden>
            <input name="website" tabIndex={-1} autoComplete="off" />
          </p>

          <div className="mt-4">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Photos *
            </span>
            <label className="mt-2 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line bg-bg/40 px-4 py-6 text-center hover:border-champagne">
              <ImagePlus className="size-6 text-primary" aria-hidden />
              <span className="mt-2 text-sm text-fg">Tap to add photos</span>
              <span className="mt-1 text-xs text-muted">
                Phone camera or camera roll · up to 5
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
            {previews.length > 0 ? (
              <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {previews.map((src, i) => (
                  <li key={src} className="relative">
                    <img
                      src={src}
                      alt={files[i]?.name || `Photo ${i + 1}`}
                      className="aspect-square w-full rounded-[0.75rem] object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 inline-flex size-8 items-center justify-center rounded-full bg-bg/80 text-fg"
                      aria-label={`Remove ${files[i]?.name || "photo"}`}
                      onClick={() => setFiles((all) => all.filter((_, j) => j !== i))}
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {error ? (
            <p className="mt-4 text-sm text-primary-soft" role="alert">
              {error}
            </p>
          ) : null}
          {sent ? (
            <p className="mt-4 text-sm text-champagne">
              Photos sent to the studio. We will email you at the address you
              gave.
            </p>
          ) : null}

          <Button type="submit" className="mt-6 max-sm:w-full" disabled={pending}>
            {pending ? "Sending…" : "Send photos to the studio"}
          </Button>
        </form>
      </div>
    </main>
  );
}
