import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { ItemEditor } from "@/components/item-editor";
import { adminLogin, deleteShopItem, loadShop } from "@/lib/catalog-fns";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/login")({
  loader: () => loadShop(),
  component: LoginPage,
});

const fieldClass =
  "mt-2 min-h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne";

function LoginPage() {
  const shop = Route.useLoaderData();
  if (shop.isAdmin) {
    return <StudioDesk products={shop.products} />;
  }
  return <SignInForm />;
}

function SignInForm() {
  const login = useServerFn(adminLogin);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    setPending(true);
    try {
      await login({
        data: {
          username: String(data.get("username") ?? ""),
          password: String(data.get("password") ?? ""),
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 pt-28 pb-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-champagne">Studio</p>
      <h1 className="mt-3 font-display text-5xl leading-tight">Sign in</h1>
      <p className="mt-3 text-sm text-muted">
        Shop editing is for the studio only. After you sign in you can add kits
        and set size and drill options the same way the live store checkout
        works.
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-xl border border-line bg-surface p-5 sm:p-8"
      >
        <label className="block">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">
            Username
          </span>
          <input
            name="username"
            autoComplete="username"
            required
            className={fieldClass}
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.16em] text-champagne">
            Password
          </span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={fieldClass}
          />
        </label>
        {error ? (
          <p className="mt-4 text-sm text-primary-soft" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="mt-6 w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </main>
  );
}

function StudioDesk({ products }: { products: Product[] }) {
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const router = useRouter();
  const remove = useServerFn(deleteShopItem);

  async function onDelete(product: Product) {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    await remove({ data: { id: product.id } });
    await router.invalidate({ sync: true });
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-champagne">Studio</p>
      <h1 className="mt-3 font-display text-5xl leading-tight">Shop kits</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Edit size and drill options so the kit page matches the live store:
        shoppers pick a size, pick drills, then the price fills in.
      </p>
      <div className="mt-6">
        <Button type="button" onClick={() => setEditing("new")}>
          Add item
        </Button>
      </div>
      <ul className="mt-8 divide-y divide-line rounded-xl border border-line bg-surface">
        {products.map((p) => (
          <li key={p.id} className="flex items-center gap-3 p-3 sm:p-4">
            <img
              src={p.img}
              alt=""
              className="size-14 shrink-0 rounded-[0.75rem] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-fg">{p.name}</p>
              <p className="text-xs text-muted">
                {p.sizes.length
                  ? `${p.sizes.length} sizes · ${p.drills.length} drill options`
                  : p.price || "No options yet"}
              </p>
            </div>
            <Button type="button" variant="ghost" size="xs" onClick={() => setEditing(p)}>
              Edit
            </Button>
            <Button type="button" variant="ghost" size="xs" onClick={() => onDelete(p)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      {editing ? (
        <ItemEditor
          product={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </main>
  );
}
