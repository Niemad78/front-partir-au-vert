import { GET, PUT } from "../client";
import { BaseResult, Contact, ContactPayload } from "../type";

type ContactResult = BaseResult & {
  contact: Contact | null;
};

export async function getContact() {
  const response = await GET<ContactResult>("/contacts", {
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
    data: response.contact,
  };
}

type ModificationContact = {
  data: ContactPayload;
  token?: string;
};

type ModificationContactResult = BaseResult & {
  contact: Contact;
};

export async function modificationContact({
  data,
  token,
}: ModificationContact): Promise<BaseResult> {
  const response = await PUT<ModificationContactResult, ContactPayload>(
    "/contacts/modification",
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
