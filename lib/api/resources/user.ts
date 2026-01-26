import { DELETE, GET, POST, PUT } from "../client";
import { BaseResult, Utilisateur, UtilisateurDto } from "../type";

type UtilisateurListe = BaseResult & {
  users: Utilisateur[];
};

export async function getUtilisateurs(token: string) {
  const response = await GET<UtilisateurListe>("/utilisateurs/liste", {
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

type UtilisateurUnique = BaseResult & {
  user: Utilisateur;
};

export async function getUtilisateurById(token: string) {
  const response = await GET<UtilisateurUnique>("/utilisateurs/me", {
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
    data: response.user,
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

export async function getMyRole(
  token: string,
): Promise<BaseResult & { role?: string }> {
  const response = await GET<BaseResult & { role?: string }>(
    "/utilisateurs/me/role",
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
    role: response.role,
  };
}

type NouvelUtilisateur = {
  data: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
  };
  token?: string;
};

type CreationUtilisateurResult = BaseResult & {
  utilisateur: Utilisateur;
};

export async function nouvelUtilisateur({
  data,
  token,
}: NouvelUtilisateur): Promise<BaseResult & { id?: string }> {
  const response = await POST<CreationUtilisateurResult, UtilisateurDto>(
    "/utilisateurs/nouvel-utilisateur",
    data,
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

type modificationPassword = {
  data: {
    password: string;
  };
  token?: string;
};

export async function updatePassword({
  data,
  token,
}: modificationPassword): Promise<BaseResult> {
  const response = await PUT<BaseResult, { password: string }>(
    "/utilisateurs/me/password",
    data,
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

type modificationEmail = {
  data: {
    email: string;
  };
  token?: string;
};

export async function updateEmail({
  data,
  token,
}: modificationEmail): Promise<BaseResult> {
  const response = await PUT<BaseResult, { email: string }>(
    "/utilisateurs/me/email",
    data,
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

type modificationInfos = {
  data: {
    nom: string;
    prenom: string;
  };
  token?: string;
};

export async function updateInfos({
  data,
  token,
}: modificationInfos): Promise<BaseResult> {
  const response = await PUT<BaseResult, { nom: string; prenom: string }>(
    "/utilisateurs/me/infos",
    data,
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

type SuppressionUtilisateur = {
  utilisateurId: string;
  token?: string;
};

export async function deleteUser({
  utilisateurId,
  token,
}: SuppressionUtilisateur) {
  const response = await DELETE<BaseResult>(
    `/utilisateurs/suppression/${utilisateurId}`,
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
