import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { nouvelleImage } from "@/lib/api/resources/image/image";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const formData = await request.formData();

  const image = formData.get("image") as File;

  const response = await nouvelleImage({ image, token });

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
      imageId: response.imageId,
    }),
  );
}
