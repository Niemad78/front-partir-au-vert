import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { login } from "@/lib/api/resources/auth";
import { NODE_ENV } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const response = await login(data);

  if (response.status !== 200) {
    const status = response.status ?? 500;

    const message =
      status === 401 || status === 404
        ? "Utilisateur ou mot de passe incorrect"
        : (response.errorMessage ?? "Une erreur est survenue");

    return NextResponse.json({ status, errorMessage: message }, { status });
  }

  if (!response.token) {
    return NextResponse.json(
      { status: 500, errorMessage: "Une erreur est survenue" },
      { status: 500 },
    );
  }

  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "session",
    value: response.token,
    httpOnly: NODE_ENV === "production",
    secure: NODE_ENV === "production",
    sameSite: "lax",
  });

  return NextResponse.json({ status: 200 });
}
