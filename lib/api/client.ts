import { NEXT_PUBLIC_API } from "../constants";
import { RequestType } from "./type";

type Json = Record<string, unknown> | unknown[];

export class HttpError extends Error {
  status: number;
  url: string;
  body?: unknown;

  constructor(
    message: string,
    opts: { status: number; url: string; body?: unknown },
  ) {
    super(message);
    this.name = "Erreur";
    this.status = opts.status;
    this.url = opts.url;
    this.body = opts.body;
  }
}

type BaseOptions = {
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidateSeconds?: number;
  timeoutMs?: number;
  retries?: number;
  credentials?: RequestCredentials;
};

type RequestOptions<TBody> = BaseOptions & {
  body?: TBody;
};

const defaultHeaders: HeadersInit = {
  Accept: "application/json",
};

function isJsonResponse(response: Response) {
  const contentType = response.headers.get("Content-Type") || "";
  return contentType.includes("application/json");
}

async function parseResponse<T>(response: Response): Promise<T | undefined> {
  if (response.status === 204) {
    return undefined;
  }

  if (!isJsonResponse(response)) {
    try {
      return (await response.json()) as T;
    } catch {
      const texte = await response.text();
      return texte as T;
    }
  }

  return (await response.json()) as T;
}

function makeUrl(endpoint: string) {
  const base = NEXT_PUBLIC_API?.replace(/\/+$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_API is not defined");
  }

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

async function coreFetch<TResponse, TBody = unknown>(
  method: RequestType,
  endpoint: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    headers,
    body,
    cache,
    revalidateSeconds,
    timeoutMs = 15_000,
    retries = 0,
    credentials,
  } = options;

  const url = makeUrl(endpoint);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const init: RequestInit & { next?: { revalidate?: number } } = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: controller.signal,
    cache,
    credentials,
    next:
      revalidateSeconds != null ? { revalidate: revalidateSeconds } : undefined,
  };

  let attempt = 0;
  while (true) {
    try {
      const response = await fetch(url, init);
      clearTimeout(timeout);

      if (!response.ok) {
        let errorMessage = response.statusText;
        try {
          const err = await parseResponse<any>(response);
          if (
            err &&
            typeof err === "object" &&
            "message" in err &&
            err.message
          ) {
            errorMessage = err.message;
          }
        } catch {
          // on garde statusText
        }

        if (response.status >= 500 && attempt < retries) {
          attempt++;
          await new Promise((res) => setTimeout(res, 250 * attempt));
          continue;
        }

        return {
          status: response.status,
          errorMessage,
        } as unknown as TResponse;
      }

      const data = await parseResponse<TResponse>(response);
      return data as TResponse;
    } catch (error) {
      clearTimeout(timeout);
      const isAbort =
        error instanceof DOMException && error.name === "AbortError";
      const isNetwork = error instanceof TypeError;

      if ((isAbort || isNetwork) && attempt < retries) {
        attempt++;
        await new Promise((res) => setTimeout(res, 250 * attempt));
        continue;
      }

      throw error;
    }
  }
}

export async function GET<TResponse>(
  endpoint: string,
  options?: Omit<RequestOptions<never>, "body">,
): Promise<TResponse> {
  return coreFetch<TResponse>(RequestType.GET, endpoint, options);
}

export async function POST<
  TResponse,
  TPayload extends Json | undefined = undefined,
>(
  endpoint: string,
  payload: TPayload,
  options: Omit<RequestOptions<TPayload>, "body"> = {},
): Promise<TResponse> {
  return coreFetch<TResponse, TPayload>(RequestType.POST, endpoint, {
    ...options,
    body: payload,
  });
}
