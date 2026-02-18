import { BaseResult } from "@/lib/api/type";

export type Faq = {
  id: string;
  question: string;
  reponse: string;
};

export type FaqResponse = BaseResult<Faq> & {
  faq: Faq;
};

export type FaqListeResponse = BaseResult<Faq[]> & {
  faq: Faq[];
};

export type ModificationFaq = {
  id: string;
  question: string;
  reponse: string;
};

export type NouvelleFaq = Omit<ModificationFaq, "id">;
