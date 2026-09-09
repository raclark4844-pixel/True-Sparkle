import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteBottomNav } from "@/components/site-bottom-nav";
import { getAdminStatus } from "@/lib/catalog-fns";
import { studioJsonLd } from "@/lib/studio";
import appCss from "../styles.css?url";

const APP_NAME = "True Sparkle";

export const Route = createRootRoute({
  loader: () => getAdminStatus(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "True Sparkle original diamond painting kits. Create it. Sparkle it. Make it yours.",
      },
      { name: "theme-color", content: "#0c0708" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { isAdmin } = Route.useLoaderData();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(studioJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHeader isAdmin={isAdmin} />
          <Outlet />
          <SiteFooter />
          <SiteBottomNav />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
