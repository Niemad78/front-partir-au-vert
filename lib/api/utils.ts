import { NEXT_PUBLIC_API } from "@/lib/constants";

export function makeUrl(endpoint: string) {
  const base = NEXT_PUBLIC_API?.replace(/\/+$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_API is not defined");
  }

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}
