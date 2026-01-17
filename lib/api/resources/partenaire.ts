import { DELETE, GET, POST } from "../client";
import { BaseResult, Partenaire } from "../type";

type PartenaireListe = BaseResult & {
  partenaires: Partenaire[];
};

export async function getPartenaires() {
  const response = await GET<PartenaireListe>("/partenaires/liste", {
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
    data: response.partenaires,
  };
}

type PartenairePayload = {
  nom: string;
  imageId: string;
};

type NouveauPartenaire = {
  data: PartenairePayload;
  token?: string;
};

type CreationPartenaireResult = BaseResult & {
  partenaire: Partenaire;
};

export async function nouveauPartenaire({
  data,
  token,
}: NouveauPartenaire): Promise<BaseResult & { data?: Partenaire }> {
  const reponse = await POST<CreationPartenaireResult, PartenairePayload>(
    "/partenaires/creation",
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

  if (!reponse.ok) {
    return {
      ok: reponse.ok,
      status: reponse.status ?? 500,
      errorMessage: reponse.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: reponse.ok,
    data: reponse.partenaire,
  };
}

export async function deletePartenaire(
  id: string,
  token?: string,
): Promise<BaseResult> {
  const response = await DELETE<BaseResult>(`/partenaires/suppression/${id}`, {
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
