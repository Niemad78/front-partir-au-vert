import { DELETE, GET, POST, PUT } from "../client";
import { BaseResult, Faq } from "../type";

type FaqListe = BaseResult & {
  faq: Faq[];
};

export async function getFaq() {
  const response = await GET<FaqListe>("/faq/liste", {
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

type FaqUnique = BaseResult & {
  faq: Faq;
};

export async function getFaqById(faqId: string) {
  const response = await GET<FaqUnique>(`/faq/${faqId}`, {
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

type NouvelleFaq = {
  data: {
    question: string;
    reponse: string;
  };
  token?: string;
};

type CreationFaqResult = BaseResult & {
  faq: Faq;
};

export async function nouvelleFaq({
  data,
  token,
}: NouvelleFaq): Promise<BaseResult & { id?: string }> {
  const response = await POST<CreationFaqResult, Faq>("/faq/creation", data, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: `session=${token}`,
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

type ModificationFaq = {
  data: {
    id: string;
    question: string;
    reponse: string;
  };
  token?: string;
};

export async function modificationFaq({
  data,
  token,
}: ModificationFaq): Promise<BaseResult> {
  const response = await PUT<BaseResult, Faq>(
    `/faq/modification/${data.id}`,
    data,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `session=${token}`,
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

export async function deleteFaq(faqId: string, token: string) {
  const response = await DELETE<BaseResult>(`/faq/suppression/${faqId}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: `session=${token}`,
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
