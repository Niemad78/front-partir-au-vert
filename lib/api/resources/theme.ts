import { DELETE, GET, POST } from "../client";
import { BaseResult, Theme } from "../type";

type ThemeListe = BaseResult & {
  themes: {
    id: string;
    nom: string;
    description: string;
  }[];
};

export async function getThemes(token: string) {
  const response = await GET<ThemeListe>("/themes/liste", {
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
    data: response.themes,
  };
}

type NouveauTheme = {
  data: Theme;
  token?: string;
};

export async function nouveauTheme({
  data,
  token,
}: NouveauTheme): Promise<BaseResult> {
  const response = await POST<BaseResult, Theme>("/themes/creation", data, {
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

export async function deleteTheme(themeId: string, token: string) {
  const response = await DELETE<BaseResult>(`/themes/suppression/${themeId}`, {
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
