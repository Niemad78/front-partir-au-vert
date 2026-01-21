import { DELETE, GET, POST, PUT } from "../client";
import { Article, BaseResult } from "../type";

type ArticleListe = BaseResult & {
  articles: Article[];
};

export async function getArticles() {
  const response = await GET<ArticleListe>("/articles/liste", {
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

type ArticleUnique = BaseResult & {
  article: Article;
};

export async function getArticleById(articleId: string) {
  const response = await GET<ArticleUnique>(`/articles/${articleId}`, {
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

type NouvelArticle = {
  data: Article;
  token?: string;
};

type CreationArticleResult = BaseResult & {
  article: {
    id: string;
  };
};

export async function nouvelArticle({
  data,
  token,
}: NouvelArticle): Promise<BaseResult & { id?: string }> {
  const response = await POST<CreationArticleResult, Article>(
    "/articles/creation",
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
    id: response.article.id,
  };
}

export async function modificationArticle({
  data,
  token,
}: NouvelArticle): Promise<BaseResult> {
  console.log("🚀 ~ modificationArticle ~ data:", data);
  const response = await PUT<BaseResult, Article>(
    `/articles/modification/${data.id}`,
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

type AjoutImageArticleProps = {
  data: { id: string; imageIds: string[] };
  token?: string;
};

type ArticleAjoutImage = {
  imageIds?: string[];
};

export async function ajoutImageArticle({
  data,
  token,
}: AjoutImageArticleProps): Promise<BaseResult> {
  const values = { imageIds: data.imageIds };
  const response = await POST<BaseResult, ArticleAjoutImage>(
    `/articles/ajout-images/${data.id}`,
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

export async function deleteArticle(articleId: string, token: string) {
  const response = await DELETE<BaseResult>(
    `/articles/suppression/${articleId}`,
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
