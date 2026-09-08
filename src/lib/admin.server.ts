import { createHmac, timingSafeEqual } from "node:crypto";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";

const COOKIE = "ts_admin";
const USER = "admin";
const PASS = "sparkle";
const SECRET = "true-sparkle-admin-session";

function tokenFor(user: string) {
  return createHmac("sha256", SECRET).update(user).digest("hex");
}

export function isAdminRequest() {
  const cookie = getCookie(COOKIE);
  if (!cookie) return false;
  const expected = tokenFor(USER);
  const a = Buffer.from(cookie);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function requireAdmin() {
  if (!isAdminRequest()) {
    throw new Error("Sign in as admin to change the shop.");
  }
}

export function checkAdminLogin(username: string, password: string) {
  const userOk = timingSafeEqual(
    createHmac("sha256", SECRET).update(username.trim()).digest(),
    createHmac("sha256", SECRET).update(USER).digest(),
  );
  const passOk = timingSafeEqual(
    createHmac("sha256", SECRET).update(password).digest(),
    createHmac("sha256", SECRET).update(PASS).digest(),
  );
  return userOk && passOk;
}

export function setAdminCookie() {
  setCookie(COOKIE, tokenFor(USER), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminCookie() {
  deleteCookie(COOKIE, { path: "/" });
}
