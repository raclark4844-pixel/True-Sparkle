import { createFileRoute, redirect } from "@tanstack/react-router";
import { KIT_META } from "@/lib/kit-copy";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/kit/$id")({
  beforeLoad: ({ params }) => {
    const meta = KIT_META[params.id];
    const product = PRODUCTS.find((p) => p.id === params.id || p.slug === params.id);
    const slug = meta?.slug ?? product?.slug ?? params.id;
    throw redirect({ href: `/kits/${slug}` });
  },
});
