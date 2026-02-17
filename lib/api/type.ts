import { Image } from "@/lib/api/resources/image/type";

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

export type BaseResult<TData> = {
  ok: boolean;
  status?: number;
  message?: string;
  errorMessage?: string;
  data?: TData;
};

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
