export enum RequestType {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export type Json = Record<string, unknown> | unknown[];

type BaseOptions = {
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidateSeconds?: number;
  timeoutMs?: number;
  retries?: number;
  credentials?: RequestCredentials;
  tags?: string[];
};

export type RequestOptions<TBody> = BaseOptions & {
  body?: TBody;
};

export type ClientResponse<T> = {
  data?: T;
  status: number;
  errorMessage?: string;
  headers?: Headers;
};

export type Client = <TBodyResponse, TData = unknown>(
  method: RequestType,
  url: string,
  data?: TData,
  headers?: HeadersInit,
) => Promise<ClientResponse<TBodyResponse>>;

export type LoginData = {
  email: string;
  password: string;
  nom?: string;
  prenom?: string;
};

export type BaseResult = {
  ok?: boolean;
  status?: number;
  message?: string;
  errorMessage?: string;
};
export type Image = {
  id: string;
  nom: string;
};

export type PointFort = {
  id?: string;
  nom: string;
};

export type Theme = {
  id?: string;
  nom: string;
  imageId: string;
  image?: Image;
};

export type Activite = {
  id?: string;
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
  latitude: number | null;
  longitude: number | null;
  adresse: string | null;
  accessibilite: string | null;
};

export enum Duree {
  journee = "Journée",
  matinee = "Matinée",
  apres_midi = "Après-midi",
}

export type DureeKey = keyof typeof Duree;

export type Faq = {
  id?: string;
  question: string;
  reponse: string;
};

export type Publication = {
  id: string;
  titre: string;
  contenu: string;
  type: TypePublication;
  images?: Image[];
};

export enum TypePublication {
  histoire = "Histoire",
  seminaire = "Séminaire",
  autre = "Autre",
  mentions_legales = "Mentions légales",
  cgv = "CGV",
}

export type Partenaire = {
  id?: string;
  nom: string;
  image: Image;
};

export type Equipe = {
  id: string;
  nom: string;
  description: string;
  image: Image;
};

export type Utilisateur = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
};

export type UtilisateurDto = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
};

export type Contact = {
  id: string;
  telephone: string;
  email: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  tiktok: string | null;
};

export type ContactPayload = {
  telephone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
};

export type Article = {
  id: string;
  titre: string;
  contenu: string;
  createdAt: string;
  images: Image[];
  user: Utilisateur;
};
