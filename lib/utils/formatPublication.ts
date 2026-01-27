import { TypePublication } from "../api/type";

export const publicationOptions = Object.entries(TypePublication).map(
  ([key, value]) => ({
    label: value,
    value: key as keyof typeof TypePublication,
  }),
);

export const publicationFormatee = (type: keyof typeof TypePublication) => {
  return TypePublication[type];
};

export type TypePublicationKey = keyof typeof TypePublication;
