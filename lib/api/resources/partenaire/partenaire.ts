import { DELETE, GET, POST } from "@/lib/api/client";
import {
  NouveauPartenaire,
  Partenaire,
  PartenaireListeResponse,
  PartenaireResponse,
} from "./type";
import { BaseResult } from "../../type";

export async function getPartenaires() {
  const response = await GET<PartenaireListeResponse>("/partenaires/liste", {
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

type NouveauPartenaireProps = {
  data: NouveauPartenaire;
  token?: string;
};

export async function nouveauPartenaire({
  data,
  token,
}: NouveauPartenaireProps) {
  const reponse = await POST<PartenaireResponse, NouveauPartenaire>(
    "/partenaires/creation",
    data,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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

type DeletePartenaireProps = {
  id: string;
  token?: string;
};

export async function deletePartenaire({ id, token }: DeletePartenaireProps) {
  const response = await DELETE<BaseResult<Partenaire>>(
    `/partenaires/suppression/${id}`,
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
