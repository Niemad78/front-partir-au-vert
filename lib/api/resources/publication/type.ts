import { Image } from "@/lib/api/resources/image/type";
import { TypePublicationKey } from "@/lib/utils/formatPublication";
import { BaseResult } from "../../type";

export type Publication = {
  id: string;
  titre: string;
  contenu: string;
  type: TypePublicationKey;
  images?: Image[];
};

export enum TypePublication {
  histoire = "Histoire",
  seminaire = "Séminaire",
  autre = "Autre",
  mentions_legales = "Mentions légales",
  cgv = "CGV",
}

export type PublicationResponse = BaseResult<Publication> & {
  publication: Publication;
};

export type PublicationListeResponse = BaseResult<Publication[]> & {
  publications: Publication[];
};

export type ModificationPublication = {
  id: string;
  titre: string;
  contenu: string;
  type: TypePublicationKey;
};

export type NouvellePublication = Omit<ModificationPublication, "id">;

export type PublicationAjoutImage = {
  imageIds: string[];
};
