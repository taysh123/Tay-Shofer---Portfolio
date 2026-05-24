export function encodePhone(plain: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(plain, "utf-8").toString("base64");
  }
  return btoa(plain);
}

export function decodePhone(encoded: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(encoded, "base64").toString("utf-8");
  }
  return atob(encoded);
}
