import { DELETE, GET, POST, PUT } from "@/lib/api/client";
import {
  ModificationEmail,
  ModificationInfo,
  ModificationPassword,
  NouvelUtilisateur,
  RoleResponse,
  Utilisateur,
  UtilisateurListeResponse,
  UtilisateurResponse,
} from "./type";
import { BaseResult } from "@/lib/api/type";

export async function getUtilisateurs(token: string) {
  const response = await GET<UtilisateurListeResponse>("/utilisateurs/liste", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
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

type UtilisateurByIdProps = {
  token: string;
};

export async function getUtilisateurById({ token }: UtilisateurByIdProps) {
  const response = await GET<UtilisateurResponse>("/utilisateurs/me", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
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

type TokenProps = {
  token: string;
};

export async function verifyMe({ token }: TokenProps) {
  const response = await GET<BaseResult<Utilisateur>>(
    "/utilisateurs/me/verification",
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function getMyRole({ token }: TokenProps) {
  const response = await GET<RoleResponse>("/utilisateurs/me/role", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
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

type NouvelUtilisateurProps = {
  data: NouvelUtilisateur;
  token?: string;
};

export async function nouvelUtilisateur({
  data,
  token,
}: NouvelUtilisateurProps) {
  const response = await POST<UtilisateurResponse, NouvelUtilisateur>(
    "/utilisateurs/nouvel-utilisateur",
    data,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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

type ModificationPasswordProps = {
  data: ModificationPassword;
  token?: string;
};

export async function modificationPassword({
  data,
  token,
}: ModificationPasswordProps) {
  const response = await PUT<BaseResult<null>, ModificationPassword>(
    "/utilisateurs/me/password",
    data,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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

type ModificationEmailProps = {
  data: ModificationEmail;
  token?: string;
};

export async function modificationEmail({
  data,
  token,
}: ModificationEmailProps) {
  const response = await PUT<BaseResult<null>, ModificationEmail>(
    "/utilisateurs/me/email",
    data,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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

type ModificationInfosProps = {
  data: ModificationInfo;
  token?: string;
};

export async function modificationInfos({
  data,
  token,
}: ModificationInfosProps) {
  const response = await PUT<BaseResult<null>, ModificationInfo>(
    "/utilisateurs/me/infos",
    data,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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

type SuppressionUtilisateurProps = {
  utilisateurId: string;
  token?: string;
};

export async function deleteUser({
  utilisateurId,
  token,
}: SuppressionUtilisateurProps) {
  const response = await DELETE<BaseResult<null>>(
    `/utilisateurs/suppression/${utilisateurId}`,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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
