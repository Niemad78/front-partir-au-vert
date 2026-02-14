import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { deletePointFort } from "@/lib/api/resources/pointfort/pointFort";

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const data = await request.json();
  const response = await deletePointFort(data.pointFortId, token || "");

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
