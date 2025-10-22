export enum RequestType {
  GET = "get",
  POST = "post",
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
