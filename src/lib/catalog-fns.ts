import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import {
  LEAD_OPTIONS,
  type LeadTime,
  type Mood,
  type PriceOption,
} from "@/lib/products";

export const getAdminStatus = createServerFn({ method: "GET" }).handler(
  async () => {
    const { isAdminRequest } = await import("@/lib/admin.server");
    return { isAdmin: isAdminRequest() };
  },
);

export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { checkAdminLogin, setAdminCookie } = await import(
      "@/lib/admin.server"
    );
    if (!checkAdminLogin(data.username, data.password)) {
      throw new Error("Wrong username or password.");
    }
    setAdminCookie();
    throw redirect({ to: "/login" });
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(
  async () => {
    const { clearAdminCookie } = await import("@/lib/admin.server");
    clearAdminCookie();
    throw redirect({ to: "/" });
  },
);

export const loadShop = createServerFn({ method: "GET" }).handler(async () => {
  const { isAdminRequest } = await import("@/lib/admin.server");
  try {
    const { listCatalogItems } = await import("@/lib/catalog.server");
    const products = await listCatalogItems();
    return { products, isAdmin: isAdminRequest() };
  } catch (err) {
    console.error("[shop] falling back to static catalog", err);
    const { PRODUCTS } = await import("@/lib/products");
    return { products: PRODUCTS, isAdmin: isAdminRequest() };
  }
});

export const loadShopItem = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { isAdminRequest } = await import("@/lib/admin.server");
    try {
      const { getCatalogItem, listCatalogItems } = await import(
        "@/lib/catalog.server"
      );
      const product = await getCatalogItem(data.id);
      const products = product ? await listCatalogItems() : [];
      return { product, products, isAdmin: isAdminRequest() };
    } catch (err) {
      console.error("[shop] falling back to static kit", err);
      const { PRODUCTS } = await import("@/lib/products");
      const product = PRODUCTS.find((p) => p.id === data.id) ?? null;
      return { product, products: PRODUCTS, isAdmin: isAdminRequest() };
    }
  });

export type OptionInput = { id?: string; label: string; price: number };

export type ItemInput = {
  id?: string;
  name: string;
  blurb: string;
  price: string;
  img: string;
  leadTime: LeadTime;
  mood?: Mood;
  buy?: string;
  sizes: OptionInput[];
  drills: OptionInput[];
};

function cleanOptions(list: OptionInput[] | undefined): PriceOption[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((row, i) => ({
      id: (row.id || row.label || `opt-${i}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || `opt-${i}`,
      label: String(row.label ?? "").trim(),
      price: Number(row.price) || 0,
    }))
    .filter((row) => row.label.length > 0);
}

export const saveShopItem = createServerFn({ method: "POST" })
  .validator((data: ItemInput) => {
    const name = data.name.trim();
    const blurb = data.blurb.trim();
    const img = data.img.trim();
    const price = (data.price ?? "").trim();
    const sizes = cleanOptions(data.sizes);
    const drills = cleanOptions(data.drills);
    if (!name) throw new Error("Name is required.");
    if (!blurb) throw new Error("Description is required.");
    if (!img) throw new Error("Add an image.");
    if (!LEAD_OPTIONS.includes(data.leadTime)) {
      throw new Error("Pick a lead time.");
    }
    if (img.startsWith("data:") && img.length > 2_800_000) {
      throw new Error("Image is too large. Use a photo under 2 MB.");
    }
    if ((sizes.length === 0) !== (drills.length === 0)) {
      throw new Error(
        "Add both size and drill options — same as the live store checkout — or leave both empty for a simple priced item.",
      );
    }
    if (!sizes.length && !price) {
      throw new Error("Add a price, or add size and drill options.");
    }
    return {
      id: data.id,
      name,
      blurb,
      price,
      img,
      leadTime: data.leadTime,
      mood: data.mood,
      buy: data.buy?.trim(),
      sizes,
      drills,
    };
  })
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/admin.server");
    requireAdmin();
    const { upsertCatalogItem } = await import("@/lib/catalog.server");
    return upsertCatalogItem(data);
  });

export const deleteShopItem = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/admin.server");
    requireAdmin();
    const { deleteCatalogItem } = await import("@/lib/catalog.server");
    await deleteCatalogItem(data.id);
    return { ok: true };
  });
