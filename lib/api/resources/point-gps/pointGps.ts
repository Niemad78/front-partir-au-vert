import { DELETE, POST, PUT } from "@/lib/api/client";
import { BaseResult } from "@/lib/api/type";
import {
  ModificationCoordonnees,
  NouvelleCoordonnees,
  Coordonnees,
} from "./type";

type NouveauPointgpsProps = {
  data: NouvelleCoordonnees;
  token?: string;
};

export async function nouveauPointGps({ data, token }: NouveauPointgpsProps) {
  const response = await POST<BaseResult<Coordonnees>, NouvelleCoordonnees>(
    "/coordonnees/creation",
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

type ModificationPointGpsProps = {
  data: ModificationCoordonnees;
  token?: string;
};

export async function modificationPointGps({
  data,
  token,
}: ModificationPointGpsProps) {
  const response = await PUT<BaseResult<Coordonnees>, ModificationCoordonnees>(
    `/coordonnees/modification/${data.id}`,
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

export async function deletePointGps(pointGpsId: string, token: string) {
  const response = await DELETE<BaseResult<Coordonnees>>(
    `/coordonnees/suppression/${pointGpsId}`,
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
