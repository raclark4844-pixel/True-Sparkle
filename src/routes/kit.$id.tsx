import { createFileRoute, notFound } from "@tanstack/react-router";
import { KitDetail } from "@/components/kit-detail";
import { loadShopItem } from "@/lib/catalog-fns";

export const Route = createFileRoute("/kit/$id")({
  loader: async ({ params }) => loadShopItem({ data: { id: params.id } }),
  component: KitPage,
});

function KitPage() {
  const { product, products, isAdmin } = Route.useLoaderData();
  if (!product) throw notFound();
  return <KitDetail product={product} catalog={products} isAdmin={isAdmin} />;
}
