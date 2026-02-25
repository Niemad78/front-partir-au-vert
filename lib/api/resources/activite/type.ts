import { DureeKey } from "@/lib/utils/formatDuree";
import { BaseResult } from "@/lib/api/type";
import type { Image } from "@/lib/api/resources/image/type";
import { PointFort } from "@/lib/api/resources/pointfort/type";
import { Theme } from "@/lib/api/resources/theme/type";
import { Coordonnees } from "../point-gps/type";

export type Activite = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  ville: string;
  departement: number;
  nbPersonnesMax: number;
  duree: DureeKey | null;
  themes: Theme[];
  images?: Image[];
  pointFort?: PointFort[];
  adresse: string | null;
  accessibilite: string | null;
  coordonnees: Coordonnees[];
};

export enum Duree {
  journee = "Journée",
  matinee = "Matinée",
  apres_midi = "Après-midi",
}

export type ActiviteResponse = BaseResult<Activite> & {
  activite: Activite;
};

export type ActiviteListeResponse = BaseResult<Activite[]> & {
  activites: Activite[];
};

export type ModificationActivite = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  ville: string;
  departement: number;
  nbPersonnesMax: number;
  duree: DureeKey | null;
  themeIds: Theme[];
  adresse: string | null;
  accessibilite: string | null;
};

export type NouvelleActivite = Omit<ModificationActivite, "id">;

export type ActiviteAjoutImage = {
  imageIds: string[];
};
