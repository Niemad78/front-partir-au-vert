import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { login, verifyMe } from "@/lib/api/resources/auth";
import { NODE_ENV } from "@/lib/constants";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return NextResponse.json(
      { status: 401, errorMessage: "Non authentifié" },
      { status: 401 },
    );
  }

  const response = await verifyMe(token);

  if (response.status !== 200) {
    return NextResponse.json(
      {
        status: response.status ?? 500,
        errorMessage: response.errorMessage ?? "Une erreur est survenue",
      },
      { status: response.status ?? 500 },
    );
  }

  return NextResponse.json({ status: 200 });
}

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

  const res = NextResponse.json({ status: 200 });

  res.cookies.set({
    name: "session",
    value: response.token,
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
