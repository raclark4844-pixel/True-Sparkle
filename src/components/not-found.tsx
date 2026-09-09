import { KAYZ_URL } from "@/lib/seo";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-champagne">404</p>
      <h1 className="mt-3 font-display text-4xl">That kit isn’t here</h1>
      <p className="mt-4 text-muted">
        Browse original diamond painting kits, send a photo for a custom chart, or write the studio.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="/kits" className="rounded-full bg-primary px-5 py-3 text-sm text-primary-fg">
          Shop kits
        </a>
        <a href="/custom" className="rounded-full border border-line px-5 py-3 text-sm">
          Custom photo kit
        </a>
        <a href="/contact" className="rounded-full border border-line px-5 py-3 text-sm">
          Contact
        </a>
      </div>
      <p className="mt-8 text-sm text-muted">
        Looking for tumblers or candles?{" "}
        <a href={KAYZ_URL} className="text-champagne underline">
          Handmade gifts at KayzCharmzz
        </a>
        .
      </p>
    </main>
  );
}
