import { STUDIO_EMAIL } from "@/lib/studio";

export { STUDIO_EMAIL };

export const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(STUDIO_EMAIL)}`;

export function buildStudioMailPayload(input: {
  name: string;
  email: string;
  phone?: string;
  size?: string;
  notes?: string;
  files: File[];
}) {
  const outbound = new FormData();
  outbound.set("_subject", `True Sparkle custom art from ${input.name}`);
  outbound.set("_template", "box");
  outbound.set("_captcha", "false");
  outbound.set("Name", input.name);
  outbound.set("Email", input.email);
  if (input.phone) outbound.set("Phone", input.phone);
  if (input.size) outbound.set("Preferred size", input.size);
  outbound.set("Notes", input.notes || "(none)");
  outbound.set("Photo count", String(input.files.length));
  outbound.set(
    "message",
    [
      "New custom diamond painting request from the True Sparkle shop.",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      input.phone ? `Phone: ${input.phone}` : null,
      input.size ? `Preferred size: ${input.size}` : null,
      input.notes ? `Notes: ${input.notes}` : null,
      `Photos attached: ${input.files.length}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  input.files.forEach((file, i) => {
    outbound.set(`attachment${i + 1}`, file, file.name || `photo-${i + 1}.jpg`);
  });
  return outbound;
}

export async function sendStudioMail(input: {
  name: string;
  email: string;
  phone?: string;
  size?: string;
  notes?: string;
  files: File[];
}) {
  const res = await fetch(FORMSUBMIT_URL, {
    method: "POST",
    body: buildStudioMailPayload(input),
    headers: { Accept: "application/json" },
  });
  const payload = (await res.json().catch(() => ({}))) as {
    success?: string;
    message?: string;
  };
  if (!res.ok) {
    throw new Error(payload.message || "Mail service rejected the request.");
  }
  return payload.success || "Photos sent to the studio.";
}
