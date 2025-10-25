import { GET, PUT } from "../client";
import { LoginData } from "../type";

type ChangePasswordProps = {
  data: LoginData;
  token?: string;
};

type ChangePasswordResult = {
  ok?: boolean;
  status?: number;
  message?: string;
  errorMessage?: string;
};

export async function changePassword({
  data,
  token,
}: ChangePasswordProps): Promise<ChangePasswordResult> {
  const values = {
    email: data.email,
    password: data.password,
  };
  const response = await PUT<ChangePasswordResult, LoginData>(
    "/users/me/modify",
    values,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `session=${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    message: response.message,
  };
}

type VerifyMeResult = {
  ok?: boolean;
  status?: number;
  message?: string;
  errorMessage?: string;
};

export async function verifyMe(token: string): Promise<VerifyMeResult> {
  const response = await GET<VerifyMeResult>("/users/me/verify", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: `session=${token}`,
    },
    cache: "no-store",
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
    message: response.message,
  };
}
