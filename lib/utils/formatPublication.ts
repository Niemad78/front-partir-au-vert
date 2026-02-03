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

export const normalizePublication = (
  type: string | null,
): TypePublicationKey | null => {
  if (!type) return null;

  const entry = Object.entries(TypePublication).find(
    ([, value]) => value.toLowerCase() === type.toLowerCase(),
  );

  return entry ? (entry[0] as TypePublicationKey) : null;
};
