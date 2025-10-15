import { NextResponse } from "next/server";
import { logout } from "@/lib/api/resources/auth";

export async function POST() {
  await logout();

  const res = NextResponse.json({ status: 200 });

  res.cookies.delete("session");

  return res;
}
