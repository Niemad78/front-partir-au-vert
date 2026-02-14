import { DELETE, GET, POST, PUT } from "@/lib/api/client";
import { BaseResult } from "@/lib/api/type";
import {
  ModificationTheme,
  NouveauTheme,
  Theme,
  ThemeListeResponse,
  ThemeResponse,
} from "./type";

export async function getThemes() {
  const response = await GET<ThemeListeResponse>("/themes/liste", {
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

export async function getThemeById(token: string, id: string) {
  const response = await GET<ThemeResponse>(`/themes/${id}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
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
    data: response.theme,
  };
}

type NouveauThemeProps = {
  data: NouveauTheme;
  token?: string;
};

export async function nouveauTheme({ data, token }: NouveauThemeProps) {
  const response = await POST<ThemeResponse, NouveauTheme>(
    "/themes/creation",
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

type ModifierThemeProps = {
  data: ModificationTheme;
  token?: string;
};

export async function modifierTheme({ data, token }: ModifierThemeProps) {
  const response = await PUT<ThemeResponse, ModificationTheme>(
    `/themes/modification/${data.id}`,
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

export async function deleteTheme(themeId: string, token: string) {
  const response = await DELETE<BaseResult<Theme>>(
    `/themes/suppression/${themeId}`,
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
