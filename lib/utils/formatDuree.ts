import { Duree } from "../api/resources/activite/type";

export const dureeOptions = Object.entries(Duree).map(([key, value]) => ({
  label: value,
  value: key as keyof typeof Duree,
}));

export const dureeFormatee = (duree: keyof typeof Duree) => {
  return Duree[duree];
};

export type DureeKey = keyof typeof Duree;
