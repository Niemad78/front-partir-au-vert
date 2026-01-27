import { DELETE, GET, POST, PUT } from "../client";
import { Activite, BaseResult, DureeKey, Theme } from "../type";

type ActiviteListe = BaseResult & {
  activites: {
    id: string;
    nom: string;
    description: string;
    prix: number;
    ville: string;
    departement: string;
    nbPersonnesMax: number;
    theme: Theme;
    duree: DureeKey | null;
  }[];
};

export async function getActivites() {
  const response = await GET<ActiviteListe>("/activites/liste", {
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

type ActiviteUnique = BaseResult & {
  activite: Activite;
};

export async function getActiviteById(activiteId: string) {
  const response = await GET<ActiviteUnique>(`/activites/${activiteId}`, {
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

type NouvelleActivite = {
  data: Activite;
  token?: string;
};

type CreationActiviteResult = BaseResult & {
  activite: {
    id: string;
  };
};

export async function nouvelleActivite({
  data,
  token,
}: NouvelleActivite): Promise<BaseResult & { id?: string }> {
  const response = await POST<CreationActiviteResult, Activite>(
    "/activites/creation",
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
    id: response.activite.id,
  };
}

export async function modificationActivite({
  data,
  token,
}: NouvelleActivite): Promise<BaseResult> {
  const response = await PUT<BaseResult, Activite>(
    `/activites/modification/${data.id}`,
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

type AjoutImageActiviteProps = {
  data: { id: string; imageIds: string[] };
  token?: string;
};

type ActiviteAjoutImage = {
  imageIds?: string[];
};

export async function ajoutImageActivite({
  data,
  token,
}: AjoutImageActiviteProps): Promise<BaseResult> {
  const values = { imageIds: data.imageIds };
  const response = await POST<BaseResult, ActiviteAjoutImage>(
    `/activites/ajout-images/${data.id}`,
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

export async function deleteActivite(activiteId: string, token: string) {
  const response = await DELETE<BaseResult>(
    `/activites/suppression/${activiteId}`,
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
