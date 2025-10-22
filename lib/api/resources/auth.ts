import { GET, POST } from "../client";

type LoginData = {
  email: string;
  password: string;
};

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

type VerifyMeResult = {
  ok?: boolean;
  status?: number;
  message?: string;
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
  const response = await POST<ChangePasswordResult, LoginData>(
    "/auth/change-password",
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
