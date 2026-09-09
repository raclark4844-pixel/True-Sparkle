import { applyKitMeta } from "@/lib/kit-copy";

export const STORE_URL = "https://truesprakle.my-online.store/";

export type Mood =
  | "glam"
  | "wildlife"
  | "fun"
  | "seasonal"
  | "heroes"
  | "tools";

export const MOODS: { id: Mood | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "glam", label: "Glam" },
  { id: "wildlife", label: "Wildlife & scenic" },
  { id: "fun", label: "Fun" },
  { id: "seasonal", label: "Seasonal" },
  { id: "heroes", label: "Heroes & game day" },
  { id: "tools", label: "Tools" },
];

export type LeadTime = "1 week" | "2 weeks" | "3 weeks" | "1 month";

export const LEAD_OPTIONS: LeadTime[] = [
  "1 week",
  "2 weeks",
  "3 weeks",
  "1 month",
];

export type PriceOption = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  mood: Mood;
  size: string;
  img: string;
  buy: string;
  blurb: string;
  kit: string;
  price?: string;
  featured?: boolean;
  disclaimer?: string;
  sizes: PriceOption[];
  drills: PriceOption[];
  leadTime?: LeadTime;
  slug?: string;
  alt?: string;
  story?: string;
};

export function leadLabel(product: Product) {
  return product.leadTime ?? "1 month";
}

export const DEFAULT_SIZES: PriceOption[] = [
  { id: "30x40", label: "30 × 40 cm", price: 0 },
  { id: "40x40", label: "40 × 40 cm", price: 0 },
  { id: "50x50", label: "50 × 50 cm", price: 0 },
  { id: "60x60", label: "60 × 60 cm", price: 0 },
  { id: "70x70", label: "70 × 70 cm", price: 0 },
];

export const DEFAULT_DRILLS: PriceOption[] = [
  { id: "round", label: "Standard round drills", price: 0 },
  { id: "square", label: "Standard square drills", price: 0 },
  { id: "ab", label: "AB drills", price: 0 },
  { id: "fairy", label: "Fairy dust drills", price: 0 },
];

export function formatUsd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function fromPrice(product: Product): number | null {
  if (product.price) {
    const n = Number(product.price.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  if (!product.sizes.length || !product.drills.length) return null;
  const sizes = product.sizes.map((s) => s.price).filter((p) => p > 0);
  const drills = product.drills.map((d) => d.price);
  if (!sizes.length) return Math.min(...drills);
  return Math.min(...sizes) + Math.min(...drills);
}

const S = (id: string, a: number, b: number, price: number): PriceOption => ({
  id,
  label: `${a} × ${b} cm`,
  price,
});

export const PRODUCTS: Product[] = [
  {
    id: "lioness",
    name: "Lioness Family at Sunset Safari",
    mood: "wildlife",
    size: "30 × 40 to 70 × 70 cm",
    img: "/products/lioness.jpg",
    buy: `${STORE_URL}product/lioness-family-at-sunset-safari`,
    blurb:
      "A mother lion and her cubs at a golden watering hole, with elephants, giraffes, zebras, and flamingos gathered at sunset.",
    kit: "Pre-printed adhesive canvas, round or square drills, pen, wax, tray, organizer bags.",
    featured: true,
    sizes: [
      S("30x40", 30, 40, 22.1),
      S("40x40", 40, 40, 32.1),
      S("50x50", 50, 50, 45.65),
      S("60x60", 60, 60, 52.1),
      S("70x70", 70, 70, 66.76),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 86.75 },
      { id: "square", label: "Standard square drills", price: 96.11 },
      { id: "ab", label: "AB drills", price: 104.75 },
      { id: "fairy", label: "Fairy dust drills", price: 115.75 },
    ],
  },
  {
    id: "barbie",
    name: "Sparkle Glam Closet",
    mood: "glam",
    size: "30 × 40 to 70 × 70 cm",
    img: "/products/barbie.jpg",
    buy: `${STORE_URL}product/sparkle-barbie-glam-closet`,
    blurb:
      "Fashion closet energy: gowns, heels, handbags, a convertible, a puppy, and a city skyline that lights up drill by drill.",
    kit: "Premium canvas, round or square drills, chart, pen, wax, tray, full drill count.",
    featured: true,
    sizes: [
      S("30x40", 30, 40, 23.9),
      S("40x40", 40, 40, 34.95),
      S("50x50", 50, 50, 0),
      S("60x60", 60, 60, 42.56),
      S("70x70", 70, 70, 66.25),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 82.25 },
      { id: "square", label: "Standard square drills", price: 96.25 },
      { id: "ab", label: "AB drills", price: 110.15 },
      { id: "fairy", label: "Fairy dust drills", price: 125.1 },
    ],
  },
  {
    id: "halloween",
    name: "Enchanted Halloween Masquerade Fairy",
    mood: "seasonal",
    size: "40 × 40 to 70 × 70 cm",
    img: "/products/halloween.jpg",
    buy: `${STORE_URL}product/enchanted-halloween-masquerade-fairy`,
    blurb:
      "A masquerade fairy in purple, orange, and gold with glowing pumpkins, chandeliers, and Halloween-night sparkle.",
    kit: "Pre-printed canvas, resin drills, pen, wax, tray, color key.",
    featured: true,
    sizes: [
      S("40x40", 40, 40, 31.1),
      S("50x50", 50, 50, 36.45),
      S("60x60", 60, 60, 45.7),
      S("70x70", 70, 70, 68.5),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 91.1 },
      { id: "square", label: "Standard square drills", price: 105.65 },
      { id: "fairy", label: "Fairy dust drills", price: 135.65 },
    ],
  },
  {
    id: "candy",
    name: "Sparkling Sweet Treats Candy Land",
    mood: "fun",
    size: "30 × 40 to 70 × 70 cm",
    img: "/products/candy.jpg",
    buy: `${STORE_URL}product/sparkling-sweet-treats-candy-land`,
    blurb:
      "A heart-shaped candy machine overflowing with lollipops, gems, and jewel-tone sweets.",
    kit: "Canvas, color-coded drills, pen, tray, wax, symbol guide.",
    featured: true,
    sizes: [
      S("30x40", 30, 40, 27.25),
      S("40x40", 40, 40, 31.5),
      S("50x50", 50, 50, 36.75),
      S("60x60", 60, 60, 43.95),
      S("70x70", 70, 70, 51.6),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 82.25 },
      { id: "square", label: "Standard square drills", price: 96.25 },
      { id: "ab", label: "AB drills", price: 105.65 },
    ],
  },
  {
    id: "firefighter",
    name: "Firefighter Heroes",
    mood: "heroes",
    size: "40 × 40 to 70 × 70 cm",
    img: "/products/firefighter.jpg",
    buy: `${STORE_URL}product/fire-fighter`,
    blurb:
      "A tribute kit with a Black female firefighter, her crew, a fire truck, flames, and a firehouse pup. Messages of courage and teamwork run through the design.",
    kit: "Premium canvas, round or square drills, chart, pen, wax, tray.",
    sizes: [
      S("40x40", 40, 40, 34.25),
      S("50x50", 50, 50, 38.45),
      S("60x60", 60, 60, 46.35),
      S("70x70", 70, 70, 61.79),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 84.75 },
      { id: "square", label: "Standard square drills", price: 98.76 },
      { id: "ab", label: "AB drills", price: 120.79 },
    ],
  },
  {
    id: "steelers",
    name: "Glamorous Game Day Lounge",
    mood: "heroes",
    size: "30 × 40 to 70 × 70 cm",
    img: "/products/steelers.jpg",
    buy: `${STORE_URL}product/glamorous-steelers-game-day-bling-lounge`,
    blurb:
      "Fan-inspired game-day glam in black and gold. A sparkle lounge scene for football nights at home.",
    kit: "Premium canvas, round or square drills, chart, pen, wax, tray.",
    disclaimer:
      "Fan-inspired decorative design. Not officially licensed or affiliated with the Pittsburgh Steelers or the NFL.",
    sizes: [
      S("30x40", 30, 40, 35.1),
      S("40x40", 40, 40, 45.25),
      S("50x50", 50, 50, 65.75),
      S("60x60", 60, 60, 85.1),
      S("70x70", 70, 70, 110.75),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 82.25 },
      { id: "square", label: "Standard square drills", price: 96.25 },
      { id: "fairy", label: "Fairy dust drills", price: 105.65 },
    ],
  },
  {
    id: "chase",
    name: "Crazy Police Chase",
    mood: "fun",
    size: "30 × 40 to 70 × 70 cm",
    img: "/products/chase.jpg",
    buy: `${STORE_URL}product/crazy-police-chase`,
    blurb:
      "Loud color, humor, and motion — a chase scene for painters who want something other than florals.",
    kit: "Canvas, round or square drills, pen, wax, tray, color key.",
    sizes: [
      S("30x40", 30, 40, 37.25),
      S("40x40", 40, 40, 48.7),
      S("50x50", 50, 50, 55.66),
      S("60x60", 60, 60, 87.45),
      S("70x70", 70, 70, 115.65),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 86.27 },
      { id: "square", label: "Standard square drills", price: 96.25 },
      { id: "fairy", label: "Fairy dust drills", price: 125.75 },
    ],
  },
  {
    id: "gala",
    name: "Diamond Gala Romance",
    mood: "glam",
    size: "30 × 40 to 60 × 60 cm",
    img: "/products/gala.jpg",
    buy: `${STORE_URL}product/diamond-gala-romance-betty-boop-inspired-kit`,
    blurb:
      "Old-Hollywood gala energy. A sparkly night-out scene for collectors who love vintage glam.",
    kit: "Full kit with choice of drill shape.",
    sizes: [
      S("30x40", 30, 40, 26.75),
      S("40x40", 40, 40, 33.65),
      S("50x50", 50, 50, 45.65),
      S("60x60", 60, 60, 66.85),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 82.25 },
      { id: "square", label: "Standard square drills", price: 96.75 },
      { id: "ab", label: "AB drills", price: 112.65 },
    ],
  },
  {
    id: "fairy",
    name: "Enchanted Fairy Portrait",
    mood: "glam",
    size: "50 × 50 to 80 × 80 cm",
    img: "/products/fairy.jpg",
    buy: `${STORE_URL}product/khaki-wrap-tunic-top`,
    blurb:
      "A luminous fairy portrait — rich skin tones, wings, and jewel colors designed to shine when the drills catch light.",
    kit: "Pre-printed canvas and complete drill set.",
    sizes: [
      S("50x50", 50, 50, 52.1),
      S("60x60", 60, 60, 68.75),
      S("70x70", 70, 70, 81.1),
      S("80x80", 80, 80, 94.56),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 96.75 },
      { id: "square", label: "Standard square drills", price: 117.56 },
      { id: "ab", label: "AB drills", price: 124.67 },
      { id: "fairy", label: "Fairy dust drills", price: 134.5 },
    ],
  },
  {
    id: "polar",
    name: "Festive Winter Departure",
    mood: "seasonal",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/polar.jpg",
    buy: `${STORE_URL}product/festive-polar-express-winter-departure`,
    blurb:
      "A winter-night train departure for holiday crafting and cozy December evenings.",
    kit: "Canvas, round or square drills, pen, tray, full drill count.",
    sizes: [
      S("40x40", 40, 40, 41.05),
      S("50x50", 50, 50, 53.67),
      S("60x60", 60, 60, 61.75),
      S("70x70", 70, 70, 72.45),
      S("80x80", 80, 80, 84.11),
    ],
    drills: [
      { id: "square", label: "Standard square drills", price: 94.25 },
      { id: "round", label: "Standard round drills", price: 110.45 },
      { id: "fairy", label: "Fairy dust drills", price: 123 },
    ],
  },
  {
    id: "grocery",
    name: "Grocery Cart Chaos",
    mood: "fun",
    size: "40 × 40 to 70 × 70 cm",
    img: "/products/grocery.jpg",
    buy: `${STORE_URL}product/pink-tie-neck-blouse`,
    blurb:
      "A humorous aisle-scene kit — loud, busy, and full of little details to hunt while you paint.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("40x40", 40, 40, 46.75),
      S("50x50", 50, 50, 61.75),
      S("60x60", 60, 60, 71.89),
      S("70x70", 70, 70, 89.02),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 94.75 },
      { id: "square", label: "Standard square drills", price: 112.87 },
      { id: "ab", label: "AB drills", price: 125.89 },
      { id: "fairy", label: "Fairy dust drills", price: 143.76 },
    ],
  },
  {
    id: "queen",
    name: "Jewel-Toned Mosaic Queen",
    mood: "glam",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/queen.jpg",
    buy: `${STORE_URL}product/white-shoulder-sleeve-top`,
    blurb:
      "A mosaic queen in deep jewel tones. The kind of piece that becomes wall jewelry when it is finished.",
    kit: "Complete kit with chart and tools.",
    sizes: [
      S("40x40", 40, 40, 41.75),
      S("50x50", 50, 50, 56.75),
      S("60x60", 60, 60, 71.69),
      S("70x70", 70, 70, 86.89),
      S("80x80", 80, 80, 105.76),
    ],
    drills: [
      { id: "round", label: "Round drills", price: 91.1 },
      { id: "square", label: "Square drills", price: 103.4 },
      { id: "ab", label: "AB drills", price: 115.7 },
    ],
  },
  {
    id: "cowboy",
    name: "Cowboy Paradise",
    mood: "wildlife",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/cowboy.jpg",
    buy: `${STORE_URL}product/yellow-wrap-tunic-top`,
    blurb: "Open-sky western atmosphere with warm dust, denim, and sunset color.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("40x40", 40, 40, 32.45),
      S("50x50", 50, 50, 41.25),
      S("60x60", 60, 60, 58.25),
      S("70x70", 70, 70, 64.9),
      S("80x80", 80, 80, 84.25),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 91.25 },
      { id: "square", label: "Standard square drills", price: 105.7 },
      { id: "ab", label: "AB drills", price: 120.65 },
      { id: "fairy", label: "Fairy dust drills", price: 130.64 },
    ],
  },
  {
    id: "puppy",
    name: "Puppy Playground",
    mood: "wildlife",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/puppy.jpg",
    buy: `${STORE_URL}product/puppy-playground`,
    blurb:
      "A bright dog-park scene packed with pups. Life is better with a dog — and a tray of drills.",
    kit: "Canvas, drills, trays, pen.",
    sizes: [
      S("40x40", 40, 40, 34.5),
      S("50x50", 50, 50, 41.25),
      S("60x60", 60, 60, 54.67),
      S("70x70", 70, 70, 70.65),
      S("80x80", 80, 80, 78.9),
    ],
    drills: [
      { id: "round", label: "Round drills", price: 88.95 },
      { id: "square", label: "Square drills", price: 96.5 },
      { id: "ab", label: "AB drills", price: 115.6 },
      { id: "fairy", label: "Fairy dust drills", price: 122.69 },
    ],
  },
  {
    id: "waves",
    name: "Riding Waves in Paradise",
    mood: "wildlife",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/waves.jpg",
    buy: `${STORE_URL}product/riding-waves-in-paradise`,
    blurb:
      "Salt, sun, and motion — a paradise-wave design for painters who want water and color.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("40x40", 40, 40, 43.75),
      S("50x50", 50, 50, 51.65),
      S("60x60", 60, 60, 67.65),
      S("70x70", 70, 70, 73.45),
      S("80x80", 80, 80, 81.25),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 86.25 },
      { id: "square", label: "Standard square drills", price: 98.3 },
      { id: "ab", label: "AB drills", price: 110.25 },
      { id: "fairy", label: "Fairy dust drills", price: 126.7 },
    ],
  },
  {
    id: "cheer",
    name: "Sassy Cheerleader",
    mood: "fun",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/cheer.jpg",
    buy: `${STORE_URL}product/light-blue-bardot-top`,
    blurb:
      "High-energy portrait kit with pom energy, attitude, and a lot of sparkle in the uniform details.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("40x40", 40, 40, 45.1),
      S("50x50", 50, 50, 58.1),
      S("60x60", 60, 60, 68.9),
      S("70x70", 70, 70, 76.45),
      S("80x80", 80, 80, 96.75),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 96.25 },
      { id: "square", label: "Standard square drills", price: 116.7 },
      { id: "ab", label: "AB drills", price: 123.95 },
      { id: "fairy", label: "Fairy dust drills", price: 145.6 },
    ],
  },
  {
    id: "duo",
    name: "Duo Shopping Spree",
    mood: "glam",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/duo.jpg",
    buy: `${STORE_URL}product/pink-diamante-embellished-printed-t-shirt`,
    blurb: "Best-friend shopping day energy — bags, city light, and coordinated glam.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("40x40", 40, 40, 44.5),
      S("50x50", 50, 50, 53.45),
      S("60x60", 60, 60, 68.45),
      S("70x70", 70, 70, 71.45),
      S("80x80", 80, 80, 95.65),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 86.47 },
      { id: "square", label: "Standard square drills", price: 98.05 },
      { id: "ab", label: "AB drills", price: 113.75 },
      { id: "fairy", label: "Fairy dust drills", price: 124.59 },
    ],
  },
  {
    id: "mall",
    name: "Luxury Mall Shopping",
    mood: "glam",
    size: "30 × 40 to 70 × 70 cm",
    img: "/products/mall.jpg",
    buy: `${STORE_URL}product/coral-tie-neck-short-sleeve-blouse`,
    blurb:
      "A polished mall-and-boutique scene for anyone who likes their crafts with a little retail drama.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("30x40", 30, 40, 27.5),
      S("40x40", 40, 40, 31.56),
      S("50x50", 50, 50, 35.65),
      S("60x60", 60, 60, 37.65),
      S("70x70", 70, 70, 39.75),
    ],
    drills: [
      { id: "round", label: "Round drills", price: 82.25 },
      { id: "square", label: "Square drills", price: 96.25 },
      { id: "ab", label: "AB drills", price: 105.65 },
    ],
  },
  {
    id: "garden",
    name: "Sparkling Garden Hammock Day",
    mood: "wildlife",
    size: "30 × 40 to 70 × 70 cm",
    img: "/products/garden.jpg",
    buy: `${STORE_URL}product/sparkling-garden-hammock-day`,
    blurb:
      "Slow afternoon in a blooming garden hammock — greens, florals, and soft light.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("30x40", 30, 40, 34.95),
      S("40x40", 40, 40, 46.95),
      S("50x50", 50, 50, 42.5),
      S("60x60", 60, 60, 55.6),
      S("70x70", 70, 70, 54.25),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 82.25 },
      { id: "square", label: "Standard square drills", price: 96.25 },
      { id: "ab", label: "AB drills", price: 105.65 },
    ],
  },
  {
    id: "princess",
    name: "Sparkling Little Princess Nursery",
    mood: "fun",
    size: "40 × 40 to 80 × 80 cm",
    img: "/products/princess.jpg",
    buy: `${STORE_URL}product/grey-peplum-cami-top`,
    blurb:
      "A sweet nursery fairytale scene made to hang in a kid room or gift to a new parent who crafts.",
    kit: "Complete diamond painting kit.",
    sizes: [
      S("40x40", 40, 40, 28.98),
      S("50x50", 50, 50, 36.7),
      S("60x60", 60, 60, 45.89),
      S("70x70", 70, 70, 62.95),
      S("80x80", 80, 80, 88.78),
    ],
    drills: [
      { id: "round", label: "Standard round drills", price: 91.25 },
      { id: "square", label: "Standard square drills", price: 105.1 },
      { id: "ab", label: "AB drills", price: 130.04 },
      { id: "fairy", label: "Fairy dust drills", price: 152.07 },
    ],
  },
  {
    id: "pen",
    name: "Blue Swirl Diamond Painting Pen Set",
    mood: "tools",
    size: "Accessory",
    img: "/products/pen.jpg",
    buy: `${STORE_URL}product/blue-swirl-diamond-painting-pen-set`,
    blurb:
      "A swirl pen set for faster, prettier placement — the one accessory already priced on the live store.",
    kit: "Pen set as shown.",
    price: "$15.00",
    sizes: [],
    drills: [],
  },
];

applyKitMeta(PRODUCTS);

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function kitPath(product: Product) {
  return `/kits/${product.slug ?? product.id}`;
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function relatedProducts(product: Product, limit = 3, catalog?: Product[]) {
  const list = catalog ?? PRODUCTS;
  return list.filter((p) => p.id !== product.id && p.mood === product.mood).slice(
    0,
    limit,
  );
}

export function moodLabel(mood: Mood) {
  return MOODS.find((m) => m.id === mood)?.label ?? mood;
}
