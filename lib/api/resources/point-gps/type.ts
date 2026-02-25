export type Coordonnees = {
  id: string;
  latitude: number;
  longitude: number;
};

export type ModificationCoordonnees = Coordonnees;

export type NouvelleCoordonnees = Omit<Coordonnees, "id">;
