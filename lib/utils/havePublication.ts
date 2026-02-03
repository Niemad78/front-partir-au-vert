import { TypePublication } from "../api/type";
import { normalizePublication, TypePublicationKey } from "./formatPublication";

type HavePublicationParams = {
  publications: {
    id: string;
    titre: string;
    contenu: string;
    type: TypePublicationKey;
  }[];
  type: TypePublication;
};

export function havePublication({
  publications,
  type,
}: HavePublicationParams): boolean {
  if (publications.length > 0) {
    return publications.some(
      (publication) => publication.type === normalizePublication(type),
    );
  }

  return false;
}
