import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  getPublicationsByType,
  nouvellePublication,
} from "@/lib/api/resources/publication";
import { Publication, TypePublication } from "@/lib/api/type";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const data: Publication = await request.json();

  if (data.type !== TypePublication.autre) {
    const verification = await getPublicationsByType(data.type);

    if (verification.ok && verification.data.length >= 1) {
      return new Response(
        JSON.stringify({
          ok: false,
          status: 400,
          errorMessage: "Une publication de ce type existe déjà.",
        }),
      );
    }
  }

  const response = await nouvellePublication({ data, token });

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
