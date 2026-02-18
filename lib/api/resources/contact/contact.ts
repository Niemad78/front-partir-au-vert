import { GET, PUT } from "@/lib/api/client";
import { Contact, ContactResponse } from "./type";

export async function getContact() {
  const response = await GET<ContactResponse>("/contacts", {
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

type ModificationContactProps = {
  data: Contact;
  token?: string;
};

export async function modificationContact({
  data,
  token,
}: ModificationContactProps) {
  const response = await PUT<ContactResponse, Contact>(
    "/contacts/modification",
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
