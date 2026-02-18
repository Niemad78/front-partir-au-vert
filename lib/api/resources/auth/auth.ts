import { POST } from "../../client";
import { AuthResponse, LoginData } from "./type";

type LoginProps = {
  data: LoginData;
};

export async function login({ data }: LoginProps) {
  const response = await POST<AuthResponse, LoginData>("/auth/login", data, {
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
