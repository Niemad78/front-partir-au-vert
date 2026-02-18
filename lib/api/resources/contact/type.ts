import { BaseResult } from "@/lib/api/type";

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

export type ContactResponse = BaseResult<Contact> & {
  contact: Contact;
};
