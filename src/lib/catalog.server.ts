import { getSql } from "@/lib/db";
import {
  PRODUCTS,
  STORE_URL,
  type LeadTime,
  type Mood,
  type PriceOption,
  type Product,
} from "@/lib/products";

type Row = {
  id: string;
  name: string;
  mood: string;
  size_label: string;
  img: string;
  buy: string;
  blurb: string;
  kit: string;
  price: string | null;
  featured: boolean;
  disclaimer: string | null;
  sizes_json: string;
  drills_json: string;
  lead_time: string;
  sort_order: number;
};

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function fromRow(row: Row): Product {
  return {
    id: row.id,
    name: row.name,
    mood: (row.mood as Mood) || "fun",
    size: row.size_label,
    img: row.img,
    buy: row.buy || STORE_URL,
    blurb: row.blurb,
    kit: row.kit,
    price: row.price || undefined,
    featured: Boolean(row.featured),
    disclaimer: row.disclaimer || undefined,
    sizes: parseJson<PriceOption[]>(row.sizes_json, []),
    drills: parseJson<PriceOption[]>(row.drills_json, []),
    leadTime: (row.lead_time as LeadTime) || "1 month",
  };
}

async function seedIfEmpty() {
  const sql = await getSql();
  const count = await sql.query<{ n: number }>(
    "select count(*)::int as n from catalog_items",
  );
  if ((count[0]?.n ?? 0) > 0) return;
  for (let i = 0; i < PRODUCTS.length; i += 1) {
    const p = PRODUCTS[i];
    await sql.query(
      `insert into catalog_items
        (id, name, mood, size_label, img, buy, blurb, kit, price, featured, disclaimer, sizes_json, drills_json, lead_time, sort_order)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       on conflict (id) do nothing`,
      [
        p.id,
        p.name,
        p.mood,
        p.size,
        p.img,
        p.buy,
        p.blurb,
        p.kit,
        p.price ?? null,
        Boolean(p.featured),
        p.disclaimer ?? null,
        JSON.stringify(p.sizes),
        JSON.stringify(p.drills),
        p.leadTime ?? "1 month",
        i,
      ],
    );
  }
}

export async function listCatalogItems(): Promise<Product[]> {
  await seedIfEmpty();
  const sql = await getSql();
  const rows = await sql.query<Row>(
    "select * from catalog_items order by sort_order asc, name asc",
  );
  return rows.map(fromRow);
}

export async function getCatalogItem(id: string): Promise<Product | null> {
  await seedIfEmpty();
  const sql = await getSql();
  const rows = await sql.query<Row>(
    "select * from catalog_items where id = $1",
    [id],
  );
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function upsertCatalogItem(input: {
  id?: string;
  name: string;
  blurb: string;
  price: string;
  img: string;
  leadTime: LeadTime;
  mood?: Mood;
  buy?: string;
  sizes: PriceOption[];
  drills: PriceOption[];
}): Promise<Product> {
  const sql = await getSql();
  await seedIfEmpty();
  const name = input.name.trim();
  const id =
    input.id?.trim() ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") ||
    `kit-${Date.now()}`;

  const sizes = input.sizes ?? [];
  const drills = input.drills ?? [];
  const sizeLabel =
    sizes.length === 0
      ? ""
      : sizes.length === 1
        ? sizes[0].label
        : `${sizes[0].label.replace(/ cm$/, "")} to ${sizes[sizes.length - 1].label}`;
  const price = sizes.length ? null : input.price.trim() || null;
  const kit = sizes.length
    ? "Pre-printed adhesive canvas, round or square drills, pen, wax, tray, organizer bags."
    : "As shown.";

  const existing = await getCatalogItem(id);
  if (existing && input.id) {
    await sql.query(
      `update catalog_items
         set name = $2,
             blurb = $3,
             price = $4,
             img = $5,
             lead_time = $6,
             sizes_json = $7,
             drills_json = $8,
             size_label = $9,
             buy = coalesce(nullif($10, ''), buy)
       where id = $1`,
      [
        id,
        name,
        input.blurb.trim(),
        price,
        input.img,
        input.leadTime,
        JSON.stringify(sizes),
        JSON.stringify(drills),
        sizeLabel,
        input.buy ?? "",
      ],
    );
    const updated = await getCatalogItem(id);
    if (!updated) throw new Error("Could not save the kit.");
    return updated;
  }

  let finalId = id;
  if (existing) finalId = `${id}-${Date.now().toString().slice(-4)}`;
  await sql.query(
    `insert into catalog_items
      (id, name, mood, size_label, img, buy, blurb, kit, price, featured, sizes_json, drills_json, lead_time, sort_order)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,false,$10,$11,$12,$13)`,
    [
      finalId,
      name,
      input.mood || "fun",
      sizeLabel,
      input.img,
      input.buy || STORE_URL,
      input.blurb.trim(),
      kit,
      price,
      JSON.stringify(sizes),
      JSON.stringify(drills),
      input.leadTime,
      999,
    ],
  );
  const created = await getCatalogItem(finalId);
  if (!created) throw new Error("Could not add the kit.");
  return created;
}

export async function deleteCatalogItem(id: string) {
  const sql = await getSql();
  await sql.query("delete from catalog_items where id = $1", [id]);
}
