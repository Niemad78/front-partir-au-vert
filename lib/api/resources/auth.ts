import { POST } from "../client";
import { LoginData } from "../type";

type LoginResult = {
  ok?: boolean;
  status?: number;
  token?: string;
  message?: string;
  errorMessage?: string;
};

export async function login(values: LoginData): Promise<LoginResult> {
  const response = await POST<LoginResult, LoginData>("/auth/login", values, {
    credentials: "include",
  });

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    token: response.token,
    message: response.message,
  };
}
