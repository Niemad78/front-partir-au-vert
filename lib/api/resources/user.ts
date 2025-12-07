import { DELETE, GET, POST, PUT } from "../client";
import { BaseResult, LoginData } from "../type";

type ChangePasswordProps = {
  data: LoginData;
  token?: string;
};

export async function changePassword({
  data,
  token,
}: ChangePasswordProps): Promise<BaseResult> {
  const values = {
    email: data.email,
    password: data.password,
  };
  const response = await PUT<BaseResult, LoginData>(
    "/utilisateurs/me/modification",
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

export async function verifyMe(token: string): Promise<BaseResult> {
  const response = await GET<BaseResult>("/utilisateurs/me/verification", {
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

type RoleResult = BaseResult & {
  role?: string;
};

export async function getMyRole(token: string): Promise<RoleResult> {
  const response = await GET<RoleResult>("/utilisateurs/me/role", {
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
    role: response.role,
  };
}

export async function nouvelUtilisateur({
  data,
  token,
}: ChangePasswordProps): Promise<BaseResult> {
  const values = {
    email: data.email,
    password: data.password,
  };
  const response = await POST<BaseResult, LoginData>(
    "/utilisateurs/nouvel-utilisateur",
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

type UserList = BaseResult & {
  users: {
    id: string;
    email: string;
  }[];
};

export async function getUsers(token: string) {
  const response = await GET<UserList>("/utilisateurs/liste", {
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
    data: response.users,
  };
}

export async function deleteUser(userId: string, token: string) {
  const response = await DELETE<BaseResult>(
    `/utilisateurs/suppression/${userId}`,
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
