import { DELETE, GET, POST, PUT } from "../../client";
import { BaseResult } from "../../type";
import {
  Article,
  ArticleAjoutImage,
  ArticleListeResponse,
  ArticleResponse,
  ModificationArticle,
  NouvelleArticle,
} from "./type";

export async function getArticles() {
  const response = await GET<ArticleListeResponse>("/articles/liste", {
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
    data: response.articles,
  };
}

export async function getArticleById(articleId: string) {
  const response = await GET<ArticleResponse>(`/articles/${articleId}`, {
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
    data: response.article,
  };
}

type NouvelArticleProps = {
  data: NouvelleArticle;
  token?: string;
};

export async function nouvelArticle({ data, token }: NouvelArticleProps) {
  const response = await POST<ArticleResponse, NouvelleArticle>(
    "/articles/creation",
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
    id: response.article.id,
  };
}

type modificationArticleProps = {
  data: ModificationArticle;
  token?: string;
};

export async function modificationArticle({
  data,
  token,
}: modificationArticleProps) {
  const response = await PUT<ArticleResponse, ModificationArticle>(
    `/articles/modification/${data.id}`,
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

type AjoutImageArticleProps = {
  data: { id: string; imageIds: string[] };
  token?: string;
};

export async function ajoutImageArticle({
  data,
  token,
}: AjoutImageArticleProps) {
  const values = { imageIds: data.imageIds };
  const response = await POST<ArticleResponse, ArticleAjoutImage>(
    `/articles/ajout-images/${data.id}`,
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

type SuppressionArticleProps = {
  articleId: string;
  token?: string;
};

export async function deleteArticle({
  articleId,
  token,
}: SuppressionArticleProps) {
  const response = await DELETE<BaseResult<Article>>(
    `/articles/suppression/${articleId}`,
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
