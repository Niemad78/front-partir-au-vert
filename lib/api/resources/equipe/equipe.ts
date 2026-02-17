import { DELETE, GET, POST, PUT } from "@/lib/api/client";
import {
  EquipeListeResponse,
  EquipeResponse,
  ModificationEquipe,
  NouvelleEquipe,
} from "./type";
import { BaseResult } from "@/lib/api/type";

export async function getEquipes() {
  const response = await GET<EquipeListeResponse>("/equipes/liste", {
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

type EquipeByIdProps = {
  id: string;
  token?: string;
};

export async function getEquipeById({ id, token }: EquipeByIdProps) {
  const response = await GET<EquipeResponse>(`/equipes/${id}`, {
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
    data: response.equipe,
  };
}

type NouvelleEquipeProps = {
  data: NouvelleEquipe;
  token?: string;
};

export async function nouvelleEquipe({ data, token }: NouvelleEquipeProps) {
  const response = await POST<EquipeResponse, NouvelleEquipe>(
    "/equipes/creation",
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

type ModifierEquipeProps = {
  data: ModificationEquipe;
  token?: string;
};

export async function modifierEquipe({ data, token }: ModifierEquipeProps) {
  const response = await PUT<EquipeResponse, ModificationEquipe>(
    `/equipes/modification/${data.id}`,
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

type DeleteEquipeProps = {
  equipeId: string;
  token?: string;
};

export async function deleteEquipe({ equipeId, token }: DeleteEquipeProps) {
  const response = await DELETE<BaseResult<EquipeResponse>>(
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
