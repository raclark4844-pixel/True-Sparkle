import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { sendContactMail } from "@/lib/custom-art-mail";
import { pageHead } from "@/lib/seo";
import {
  STUDIO_CONTACT,
  STUDIO_EMAIL,
  STUDIO_EST,
  STUDIO_LOCATION,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/studio";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact True Sparkle | Cleveland Studio",
      description:
        "Email Lana Moss about original diamond painting kits, custom photo-to-kit, shipping, or pickup in Cleveland, Ohio.",
      path: "/contact",
    }),
  component: ContactPage,
});

const TOPICS = [
  "Order question",
  "Kit help",
  "Custom design",
  "Wholesale",
  "Press / collab",
  "Something else",
];

const fieldClass =
  "mt-2 min-h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne";

const areaClass =
  "mt-2 min-h-36 w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-champagne";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const order = String(data.get("order") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Name, email, and a message are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email so we can write back.");
      return;
    }

    const subject = topic
      ? `True Sparkle — ${topic} from ${name}`
      : `True Sparkle message from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      topic ? `Topic: ${topic}` : null,
      order ? `Order / kit: ${order}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    setPending(true);
    try {
      await sendContactMail({ name, email, phone, topic, order, message });
      setSent(true);
      e.currentTarget.reset();
    } catch {
      window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSent(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">
            Contact
          </p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
            Write Lana Moss.
          </h1>
          <p className="mt-5 text-muted">
            Questions about a kit, an order on the current store, or a custom
            piece — send a note to {STUDIO_CONTACT}. We are a family studio in{" "}
            {STUDIO_LOCATION}. We read every message. For a kit from your own
            photo, use{" "}
            <a href="/custom" className="text-fg underline decoration-champagne">
              custom art
            </a>
            .
          </p>
          <p className="mt-8 font-display text-3xl text-fg">{STUDIO_CONTACT}</p>
          <a
            href={`mailto:${STUDIO_EMAIL}`}
            className="mt-3 flex min-h-11 items-center gap-3 text-fg hover:text-champagne"
          >
            <Mail className="size-5 text-primary" aria-hidden />
            {STUDIO_EMAIL}
          </a>
          <a
            href={`tel:${STUDIO_PHONE_TEL}`}
            className="flex min-h-11 items-center gap-3 text-fg hover:text-champagne"
          >
            <Phone className="size-5 text-primary" aria-hidden />
            {STUDIO_PHONE}
          </a>
          <p className="flex min-h-11 items-center gap-3 text-fg">
            <MapPin className="size-5 text-primary" aria-hidden />
            {STUDIO_LOCATION} · {STUDIO_EST}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-champagne">
            Follow
          </p>
          <SocialLinks className="mt-1 -ml-1" />
          <p className="mt-6 max-w-sm text-sm text-muted">
            If you already checked out on the live cart, include the order
            number or kit name so we can find you faster.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-line bg-surface p-5 sm:p-8"
          noValidate
        >
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Name *
            </span>
            <input
              name="name"
              autoComplete="name"
              required
              className={fieldClass}
              placeholder="Your name"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Email *
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className={fieldClass}
              placeholder="you@email.com"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Phone <span className="normal-case tracking-normal">(optional)</span>
            </span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className={fieldClass}
              placeholder="Mobile number"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Topic
            </span>
            <select name="topic" className={fieldClass} defaultValue="">
              <option value="">Please select</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Order or kit{" "}
              <span className="normal-case tracking-normal">(optional)</span>
            </span>
            <input
              name="order"
              className={fieldClass}
              placeholder="Order number or kit name"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.16em] text-champagne">
              Your message *
            </span>
            <textarea
              name="message"
              required
              className={areaClass}
              placeholder="How can we help?"
            />
          </label>

          {error ? (
            <p className="mt-4 text-sm text-primary-soft" role="alert">
              {error}
            </p>
          ) : null}
          {sent ? (
            <p className="mt-4 text-sm text-champagne">
              Message sent to {STUDIO_CONTACT}. If nothing arrives, email{" "}
              {STUDIO_EMAIL} directly.
            </p>
          ) : null}

          <Button type="submit" className="mt-6 max-sm:w-full" disabled={pending}>
            {pending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </main>
  );
}
