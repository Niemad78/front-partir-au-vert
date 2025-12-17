import { DELETE, POST, PUT } from "../client";
import { BaseResult, PointFort } from "../type";

type NouveauPointFort = {
  data: PointFort;
  token?: string;
};

export async function nouveauPointFort({
  data,
  token,
}: NouveauPointFort): Promise<BaseResult> {
  const response = await POST<BaseResult, PointFort>(
    "/points-fort/creation",
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

export async function modificationPointFort({
  data,
  token,
}: NouveauPointFort): Promise<BaseResult> {
  const response = await PUT<BaseResult, PointFort>(
    `/points-fort/modification/${data.id}`,
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

export async function deletePointFort(pointFortId: string, token: string) {
  const response = await DELETE<BaseResult>(
    `/points-fort/suppression/${pointFortId}`,
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
