import type { NextRequest } from "next/server";
import { login } from "@/lib/api/resources/auth";
import { NODE_ENV } from "@/lib/constants";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const response = await login(data);

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        ok: response.ok,
        status: response.status ?? 500,
        errorMessage: response.errorMessage ?? "Une erreur est survenue",
      }),
    );
  }

  if (!response.token) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        errorMessage: "Une erreur est survenue",
      }),
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("session", response.token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return new Response(JSON.stringify(response));
}
