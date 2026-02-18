import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { nouvellesImages } from "@/lib/api/resources/image/image";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const formData = await request.formData();

  const images = formData.getAll("images") as File[];

  const response = await nouvellesImages({ images, token });

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        ok: response.ok,
        status: response.status ?? 500,
        errorMessage: response.errorMessage ?? "Une erreur est survenue",
      }),
    );
  }

  return new Response(
    JSON.stringify({
      ok: response.ok,
      imageIds: response.imageIds,
    }),
  );
}
