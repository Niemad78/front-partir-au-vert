import { DELETE, GET, POST, PUT } from "@/lib/api/client";
import {
  Faq,
  FaqListeResponse,
  FaqResponse,
  ModificationFaq,
  NouvelleFaq,
} from "./type";
import { BaseResult } from "@/lib/api/type";

export async function getFaq() {
  const response = await GET<FaqListeResponse>("/faq/liste", {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    data: response.faq,
  };
}

type FaqById = {
  faqId: string;
};

export async function getFaqById({ faqId }: FaqById) {
  const response = await GET<FaqResponse>(`/faq/${faqId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    data: response.faq,
  };
}

type NouvelleFaqProps = {
  data: NouvelleFaq;
  token?: string;
};

export async function nouvelleFaq({ data, token }: NouvelleFaqProps) {
  const response = await POST<FaqResponse, NouvelleFaq>("/faq/creation", data, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    id: response.faq.id,
  };
}

type ModificationFaqProps = {
  data: ModificationFaq;
  token?: string;
};

export async function modificationFaq({ data, token }: ModificationFaqProps) {
  const response = await PUT<FaqResponse, ModificationFaq>(
    `/faq/modification/${data.id}`,
    data,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    message: response.message,
  };
}

type DeleteFaqProps = {
  faqId: string;
  token: string;
};

export async function deleteFaq({ faqId, token }: DeleteFaqProps) {
  const response = await DELETE<BaseResult<Faq>>(`/faq/suppression/${faqId}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    message: response.message,
  };
}
