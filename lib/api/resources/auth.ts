import { POST } from "../client";

type LoginData = {
  email: string;
  password: string;
};

type LoginResult = {
  status: number;
  token?: string;
  errorMessage?: string;
};

export async function login(values: LoginData): Promise<LoginResult> {
  const response = await POST<LoginResult, LoginData>("/auth/login", values);
  const isError = response.status !== 200;

  return {
    status: response.status ?? 200,
    token: response.token,
    errorMessage: isError
      ? (response.errorMessage ?? "Une erreur est survenue")
      : undefined,
  };
}
