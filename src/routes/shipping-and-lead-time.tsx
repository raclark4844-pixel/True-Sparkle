import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shipping-and-lead-time")({
  head: () =>
    pageHead({
      title: "Shipping & Lead Time | True Sparkle",
      description:
        "True Sparkle kits are made to order in Cleveland. Typical lead time is about one month, then US shipping. Custom photo kits share the same studio queue.",
      path: "/shipping-and-lead-time",
    }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-champagne">Studio queue</p>
      <h1 className="mt-3 font-display text-5xl">Shipping and lead time</h1>
      <p className="mt-6 text-lg text-muted">
        Every original diamond painting kit is made to order in Cleveland, Ohio. We
        chart, pack drills, and ship when your size and drill type are ready — not
        from a warehouse of identical boxes.
      </p>
      <section className="mt-12">
        <h2 className="font-display text-3xl">Catalog kits</h2>
        <p className="mt-4 text-muted">
          Most catalog kits list a one-month lead. That covers layout check, drill
          count, and packing. Busy seasons (holidays) can run longer. The product
          page always shows the current lead for that kit.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-3xl">Custom photo kits</h2>
        <p className="mt-4 text-muted">
          Custom work needs a photo review first. Sharp daylight photos work.
          Screenshots, heavy filters, and tiny faces do not. After we confirm size
          and drill type, the kit joins the same studio queue.{" "}
          <Link to="/custom" className="text-champagne underline">
            How photo-to-kit works
          </Link>
          .
        </p>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-3xl">Shipping</h2>
        <p className="mt-4 text-muted">
          We ship inside the United States. Tracking goes to the email on the order.
          Cleveland pickup can be arranged through{" "}
          <Link to="/contact" className="text-champagne underline">
            contact
          </Link>{" "}
          if you are local.
        </p>
      </section>
    </main>
  );
}
