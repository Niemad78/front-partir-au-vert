import { GET, POST } from "../client";
import { Activite, BaseResult, Theme } from "../type";

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
  }[];
};

export async function getActivites(token: string) {
  const response = await GET<ActiviteListe>("/activites/liste", {
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
    data: response.activites,
  };
}

type NouvelleActivite = {
  data: Activite;
  token?: string;
};

export async function nouvelleActivite({
  data,
  token,
}: NouvelleActivite): Promise<BaseResult> {
  const response = await POST<BaseResult, Activite>(
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
    message: response.message,
  };
}
