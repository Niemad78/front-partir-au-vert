import { DELETE, POST, PUT } from "@/lib/api/client";
import { BaseResult } from "@/lib/api/type";
import { ModificationPointFort, NouveauPointFort, PointFort } from "./type";

type NouveauPointFortProps = {
  data: NouveauPointFort;
  token?: string;
};

export async function nouveauPointFort({ data, token }: NouveauPointFortProps) {
  const response = await POST<BaseResult<PointFort>, NouveauPointFort>(
    "/points-fort/creation",
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

type ModificationPointFortProps = {
  data: ModificationPointFort;
  token?: string;
};

export async function modificationPointFort({
  data,
  token,
}: ModificationPointFortProps) {
  const response = await PUT<BaseResult<PointFort>, ModificationPointFort>(
    `/points-fort/modification/${data.id}`,
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

export async function deletePointFort(pointFortId: string, token: string) {
  const response = await DELETE<BaseResult<PointFort>>(
    `/points-fort/suppression/${pointFortId}`,
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
