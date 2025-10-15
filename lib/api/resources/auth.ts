import { GET, POST } from "../client";

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
  const response = await POST<LoginResult, LoginData>("/auth/login", values, {
    credentials: "include",
  });
  const isError = response.status !== 200;

  return {
    status: response.status ?? 200,
    token: response.token,
    errorMessage: isError
      ? (response.errorMessage ?? "Une erreur est survenue")
      : undefined,
  };
}

type VerifyMeResult = {
  status: number;
  errorMessage?: string;
};

export async function verifyMe(token: string): Promise<VerifyMeResult> {
  const response = await GET<VerifyMeResult>("/auth/me", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: `session=${token}`,
    },
    cache: "no-store",
  });
  const isError = response.status !== 200;

  return {
    status: response.status ?? 200,
    errorMessage: isError
      ? (response.errorMessage ?? "Une erreur est survenue")
      : undefined,
  };
}

type LogoutResult = {
  status: number;
  errorMessage?: string;
};

export async function logout(): Promise<LogoutResult> {
  const response = await POST<LogoutResult>("/auth/logout", undefined, {
    credentials: "include",
  });

  const isError = response.status !== 200;

  return {
    status: response.status ?? 200,
    errorMessage: isError
      ? (response.errorMessage ?? "Une erreur est survenue")
      : undefined,
  };
}
