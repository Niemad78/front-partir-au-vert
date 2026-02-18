import type { Image } from "@/lib/api/resources/image/type";
import { BaseResult } from "@/lib/api/type";

export type Theme = {
  id?: string;
  nom: string;
  image: Image;
};

export type ThemeResponse = BaseResult<Theme> & {
  theme: Theme;
};

export type ThemeListeResponse = BaseResult<Theme[]> & {
  themes: Theme[];
};

export type ModificationTheme = {
  id: string;
  nom: string;
  imageId: string;
};

export type NouveauTheme = Omit<ModificationTheme, "id">;
