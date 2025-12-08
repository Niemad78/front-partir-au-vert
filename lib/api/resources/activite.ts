import { GET } from "../client";
import { BaseResult } from "../type";

type ActiviteListe = BaseResult & {
  activites: {
    id: string;
    nom: string;
    description: string;
    prix: number;
    ville: string;
    departement: string;
    nbPersonnesMax: number;
    themeId: string;
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
