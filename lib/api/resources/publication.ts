import { TypePublicationKey } from "@/lib/utils/formatPublication";
import { DELETE, GET, POST, PUT } from "../client";
import { BaseResult, Publication, TypePublication } from "../type";

type PublicationListe = BaseResult & {
  publications: {
    id: string;
    titre: string;
    contenu: string;
    type: TypePublicationKey;
  }[];
};

export async function getPublications() {
  const response = await GET<PublicationListe>("/publications/liste", {
    cache: "force-cache",
    tags: ["publications"],
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

export async function getPublicationsByType(type: TypePublication) {
  const response = await GET<PublicationListe>(`/publications/liste/${type}`, {
    cache: "no-store",
    tags: ["publications"],
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

type PublicationUnique = BaseResult & {
  publications: Publication;
};

export async function getPublicationById(publicationId: string) {
  const response = await GET<PublicationUnique>(
    `/publications/${publicationId}`,
    {
      cache: "no-store",
      tags: ["publications"],
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

type NouvellePublication = {
  data: Publication;
  token?: string;
};

type CreationPublicationResult = BaseResult & {
  publication: {
    id: string;
  };
};

export async function nouvellePublication({
  data,
  token,
}: NouvellePublication): Promise<BaseResult & { id?: string }> {
  const response = await POST<CreationPublicationResult, Publication>(
    "/publications/creation",
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
    id: response.publication.id,
  };
}

export async function modificationPublication({
  data,
  token,
}: NouvellePublication): Promise<BaseResult> {
  const response = await PUT<BaseResult, Publication>(
    `/publications/modification/${data.id}`,
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

type AjoutImagePublicationProps = {
  data: { id: string; imageIds: string[] };
  token?: string;
};

type PublicationAjoutImage = {
  imageIds?: string[];
};

export async function ajoutImagePublication({
  data,
  token,
}: AjoutImagePublicationProps): Promise<BaseResult> {
  const values = { imageIds: data.imageIds };
  const response = await POST<BaseResult, PublicationAjoutImage>(
    `/publications/ajout-images/${data.id}`,
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

export async function deletePublication(publicationId: string, token: string) {
  const response = await DELETE<BaseResult>(
    `/publications/suppression/${publicationId}`,
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
