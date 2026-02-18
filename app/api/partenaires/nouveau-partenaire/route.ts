import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { nouveauPartenaire } from "@/lib/api/resources/partenaire/partenaire";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const data = await request.json();
  const response = await nouveauPartenaire({ data, token });

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        ok: response.ok,
        status: response.status ?? 500,
        errorMessage: response.errorMessage ?? "Une erreur est survenue",
      }),
    );
  }

  return new Response(JSON.stringify(response));
}
