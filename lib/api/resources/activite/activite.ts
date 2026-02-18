import { DELETE, GET, POST, PUT } from "../../client";
import { BaseResult } from "../../type";
import type {
  Activite,
  ActiviteAjoutImage,
  ActiviteListeResponse,
  ActiviteResponse,
  ModificationActivite,
  NouvelleActivite,
} from "./type";

export async function getActivites() {
  const response = await GET<ActiviteListeResponse>("/activites/liste", {
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
    data: response.activites,
  };
}

export async function getActiviteById(activiteId: string) {
  const response = await GET<ActiviteResponse>(`/activites/${activiteId}`, {
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
    data: response.activite,
  };
}

type NouvelleActiviteProps = {
  data: NouvelleActivite;
  token?: string;
};

export async function nouvelleActivite({ data, token }: NouvelleActiviteProps) {
  const response = await POST<ActiviteResponse, NouvelleActivite>(
    "/activites/creation",
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
    id: response.activite.id,
  };
}

type ModificationActiviteProps = {
  data: ModificationActivite;
  token?: string;
};

export async function modificationActivite({
  data,
  token,
}: ModificationActiviteProps) {
  const response = await PUT<ActiviteResponse, ModificationActivite>(
    `/activites/modification/${data.id}`,
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

type AjoutImageActiviteProps = {
  data: { id: string; imageIds: string[] };
  token?: string;
};

export async function ajoutImageActivite({
  data,
  token,
}: AjoutImageActiviteProps) {
  const values = { imageIds: data.imageIds };
  const response = await POST<ActiviteResponse, ActiviteAjoutImage>(
    `/activites/ajout-images/${data.id}`,
    values,
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

type SuppressionActiviteProps = {
  activiteId: string;
  token?: string;
};

export async function deleteActivite({
  activiteId,
  token,
}: SuppressionActiviteProps) {
  const response = await DELETE<BaseResult<Activite>>(
    `/activites/suppression/${activiteId}`,
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
