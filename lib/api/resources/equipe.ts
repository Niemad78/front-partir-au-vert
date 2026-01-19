import { DELETE, GET, POST, PUT } from "../client";
import { BaseResult, Equipe, Theme } from "../type";

type EquipeListe = BaseResult & {
  equipes: Equipe[];
};

export async function getEquipes(token?: string) {
  const response = await GET<EquipeListe>("/equipes/liste", {
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
    data: response.equipes,
  };
}

type EquipeById = BaseResult & {
  equipe: Equipe;
};

export async function getEquipeById(token: string, id: string) {
  const response = await GET<EquipeById>(`/equipes/${id}`, {
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
    data: response.equipe,
  };
}

type NouvelleEquipe = {
  data: Equipe;
  token?: string;
};

export async function nouvelleEquipe({
  data,
  token,
}: NouvelleEquipe): Promise<BaseResult> {
  const response = await POST<BaseResult, Equipe>("/equipes/creation", data, {
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

export async function modifierEquipe({
  data,
  token,
}: NouvelleEquipe): Promise<BaseResult> {
  const response = await PUT<BaseResult, Equipe>(
    `/equipes/modification/${data.id}`,
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

export async function deleteEquipe(equipeId: string, token: string) {
  const response = await DELETE<BaseResult>(
    `/equipes/suppression/${equipeId}`,
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
