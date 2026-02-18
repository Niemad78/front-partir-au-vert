export type PointFort = {
  id: string;
  nom: string;
};

export type ModificationPointFort = PointFort;

export type NouveauPointFort = Omit<PointFort, "id">;
