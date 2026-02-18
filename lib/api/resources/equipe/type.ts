import { Image } from "@/lib/api/resources/image/type";
import { BaseResult } from "@/lib/api/type";

export type Equipe = {
  id: string;
  nom: string;
  description: string;
  image: Image;
};

export type EquipeResponse = BaseResult<Equipe> & {
  equipe: Equipe;
};

export type EquipeListeResponse = BaseResult<Equipe[]> & {
  equipes: Equipe[];
};

export type ModificationEquipe = {
  id: string;
  nom: string;
  description: string;
  imageId: string;
};

export type NouvelleEquipe = Omit<ModificationEquipe, "id">;
