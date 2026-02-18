import { TypePublicationKey } from "@/lib/utils/formatPublication";
import { DELETE, GET, POST, PUT } from "@/lib/api/client";
import {
  ModificationPublication,
  NouvellePublication,
  Publication,
  PublicationAjoutImage,
  PublicationListeResponse,
  PublicationResponse,
} from "./type";
import { BaseResult } from "@/lib/api/type";

export async function getPublications() {
  const response = await GET<PublicationListeResponse>("/publications/liste", {
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
    data: response.publications,
  };
}

type PublicationByTypeProps = {
  type: TypePublicationKey;
};

export async function getPublicationsByType({ type }: PublicationByTypeProps) {
  const response = await GET<PublicationListeResponse>(
    `/publications/liste/${type}`,
    {
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
    data: response.publications,
  };
}

type PublicationByIdProps = {
  publicationId: string;
};

export async function getPublicationById({
  publicationId,
}: PublicationByIdProps) {
  const response = await GET<PublicationResponse>(
    `/publications/${publicationId}`,
    {
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
    data: response.publication,
  };
}

type NouvellePublicationProps = {
  data: NouvellePublication;
  token?: string;
};

export async function nouvellePublication({
  data,
  token,
}: NouvellePublicationProps) {
  const response = await POST<PublicationResponse, NouvellePublication>(
    "/publications/creation",
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
    id: response.publication.id,
  };
}

type ModificationPublicationProps = {
  data: ModificationPublication;
  token?: string;
};

export async function modificationPublication({
  data,
  token,
}: ModificationPublicationProps) {
  const response = await PUT<PublicationResponse, ModificationPublication>(
    `/publications/modification/${data.id}`,
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

type AjoutImagePublicationProps = {
  data: { id: string; imageIds: string[] };
  token?: string;
};

export async function ajoutImagePublication({
  data,
  token,
}: AjoutImagePublicationProps) {
  const values = { imageIds: data.imageIds };
  const response = await POST<PublicationResponse, PublicationAjoutImage>(
    `/publications/ajout-images/${data.id}`,
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

type DeletePublicationProps = {
  publicationId: string;
  token: string;
};

export async function deletePublication({
  publicationId,
  token,
}: DeletePublicationProps) {
  const response = await DELETE<BaseResult<Publication>>(
    `/publications/suppression/${publicationId}`,
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
