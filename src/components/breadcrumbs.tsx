import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted">
      <JsonLd data={data} />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {i === items.length - 1 ? (
              <span className="text-fg">{item.name}</span>
            ) : (
              <a href={item.path} className="hover:text-fg">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
