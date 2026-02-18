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
