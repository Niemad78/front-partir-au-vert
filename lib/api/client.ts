import { makeUrl } from "@/lib/api/utils";
import { RequestType, Json, RequestOptions } from "@/lib/api/type";

const headersInit: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function client<TResponse, TBody = unknown>(
  method: RequestType,
  endpoint: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const { headers, cache, revalidateSeconds, credentials, body } = options;

  const url = makeUrl(endpoint);

  const params: RequestInit & { next?: { revalidate?: number } } = {
    method,
    headers: {
      ...headersInit,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache,
    credentials,
    next:
      revalidateSeconds != null ? { revalidate: revalidateSeconds } : undefined,
  };

  try {
    const response = await fetch(url, params);
    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        errorMessage: data.message,
      } as unknown as TResponse;
    }

    return data as TResponse;
  } catch (error: any) {
    return {
      ok: false,
      status: error.status || 500,
      errorMessage: error.message || "An unexpected error occurred",
    } as unknown as TResponse;
  }
}

export async function GET<TResponse>(
  endpoint: string,
  options?: Omit<RequestOptions<never>, "body">,
): Promise<TResponse> {
  return client<TResponse>(RequestType.GET, endpoint, options);
}

export async function POST<
  TResponse,
  TPayload extends Json | undefined = undefined,
>(
  endpoint: string,
  payload: TPayload,
  options: Omit<RequestOptions<TPayload>, "body"> = {},
): Promise<TResponse> {
  return client<TResponse, TPayload>(RequestType.POST, endpoint, {
    ...options,
    body: payload,
  });
}

export async function PUT<
  TResponse,
  TPayload extends Json | undefined = undefined,
>(
  endpoint: string,
  payload: TPayload,
  options: Omit<RequestOptions<TPayload>, "body"> = {},
): Promise<TResponse> {
  return client<TResponse, TPayload>(RequestType.PUT, endpoint, {
    ...options,
    body: payload,
  });
}
