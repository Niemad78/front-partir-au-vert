import { BaseResult } from "@/lib/api/type";
import { Image } from "@/lib/api/resources/image/type";

export type Partenaire = {
  id: string;
  nom: string;
  image: Image;
};

export type PartenaireResponse = BaseResult<Partenaire> & {
  partenaire: Partenaire;
};

export type PartenaireListeResponse = BaseResult<Partenaire[]> & {
  partenaires: Partenaire[];
};

export type ModificationPartenaire = {
  id: string;
  nom: string;
  imageId: string;
};

export type NouveauPartenaire = Omit<ModificationPartenaire, "id">;
