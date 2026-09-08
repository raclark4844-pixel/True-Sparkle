import { createFileRoute } from "@tanstack/react-router";
import { sendStudioMail } from "@/lib/custom-art-mail";

const MAX_FILES = 5;
const MAX_BYTES = 8 * 1024 * 1024;

function json(
  status: number,
  body: { ok?: boolean; error?: string; retryClient?: boolean },
) {
  return Response.json(body, { status });
}

export const Route = createFileRoute("/api/custom-art")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const incoming = await request.formData();
        const name = String(incoming.get("name") ?? "").trim();
        const email = String(incoming.get("email") ?? "").trim();
        const phone = String(incoming.get("phone") ?? "").trim();
        const size = String(incoming.get("size") ?? "").trim();
        const notes = String(incoming.get("notes") ?? "").trim();
        const website = String(incoming.get("website") ?? "").trim();

        if (website) return json(200, { ok: true });
        if (!name || !email) {
          return json(400, { error: "Name and email are required." });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json(400, { error: "Enter a valid email so we can write back." });
        }

        const files = incoming
          .getAll("photos")
          .filter((item): item is File => item instanceof File && item.size > 0);

        if (!files.length) return json(400, { error: "Add at least one photo." });
        if (files.length > MAX_FILES) {
          return json(400, { error: `Up to ${MAX_FILES} photos per request.` });
        }
        for (const file of files) {
          const type = file.type || "";
          if (type && !type.startsWith("image/")) {
            return json(400, { error: "Photos only — JPEG, PNG, HEIC, or WebP." });
          }
          if (file.size > MAX_BYTES) {
            return json(400, {
              error: `${file.name} is over 8 MB. Try a smaller photo.`,
            });
          }
        }

        try {
          await sendStudioMail({ name, email, phone, size, notes, files });
          return json(200, { ok: true });
        } catch (err) {
          const message = err instanceof Error ? err.message : "";
          const rateLimited = /rate limit/i.test(message);
          return json(502, {
            error: rateLimited
              ? "Mail is busy. Retrying from your device…"
              : message ||
                "Could not send the photos just now. Try again, or email them to truesprakle@yahoo.com.",
            retryClient: true,
          });
        }
      },
    },
  },
});
