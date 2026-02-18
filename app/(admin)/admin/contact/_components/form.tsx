"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { ContactSchema } from "@/lib/schema/contacts";
import { Contact } from "@/lib/api/resources/contact/type";

type Props = {
  contact: Contact;
};

export default function Form({ contact }: Props) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      telephone: contact.telephone,
      email: contact.email,
      facebook: contact.facebook ?? "",
      instagram: contact.instagram ?? "",
      twitter: contact.twitter ?? "",
      linkedin: contact.linkedin ?? "",
      tiktok: contact.tiktok ?? "",
    },
    validationSchema: ContactSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/contact/modification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (result.ok) {
        show({
          severity: "success",
          summary: "Succès",
          detail: result.message,
        });

        router.refresh();
      } else {
        show({
          severity: "error",
          summary: "Erreur",
          detail: `${result.status} - ${result.errorMessage}`,
        });
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-[35%] flex-col items-center gap-[20px]"
    >
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="telephone"
            name="telephone"
            value={formik.values.telephone}
            onChange={formik.handleChange}
            invalid={!!formik.errors.telephone}
            className="w-full"
          />
          <label htmlFor="telephone">Téléphone</label>
        </FloatLabel>
        <span className="p-error pl-[5px]">{formik.errors.telephone}</span>
      </div>
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            invalid={!!formik.errors.email}
            className="w-full"
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <span className="p-error pl-[5px]">{formik.errors.email}</span>
      </div>
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="facebook"
            name="facebook"
            value={formik.values.facebook}
            onChange={formik.handleChange}
            invalid={!!formik.errors.facebook}
            className="w-full"
          />
          <label htmlFor="facebook">Facebook</label>
        </FloatLabel>
        <span className="p-error pl-[5px]">{formik.errors.facebook}</span>
      </div>
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="instagram"
            name="instagram"
            value={formik.values.instagram}
            onChange={formik.handleChange}
            invalid={!!formik.errors.instagram}
            className="w-full"
          />
          <label htmlFor="instagram">Instagram</label>
        </FloatLabel>
        <span className="p-error pl-[5px]">{formik.errors.instagram}</span>
      </div>
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="twitter"
            name="twitter"
            value={formik.values.twitter}
            onChange={formik.handleChange}
            invalid={!!formik.errors.twitter}
            className="w-full"
          />
          <label htmlFor="twitter">Twitter</label>
        </FloatLabel>
        <span className="p-error pl-[5px]">{formik.errors.twitter}</span>
      </div>
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="linkedin"
            name="linkedin"
            value={formik.values.linkedin}
            onChange={formik.handleChange}
            invalid={!!formik.errors.linkedin}
            className="w-full"
          />
          <label htmlFor="linkedin">LinkedIn</label>
        </FloatLabel>
        <span className="p-error pl-[5px]">{formik.errors.linkedin}</span>
      </div>
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="tiktok"
            name="tiktok"
            value={formik.values.tiktok}
            onChange={formik.handleChange}
            invalid={!!formik.errors.tiktok}
            className="w-full"
          />
          <label htmlFor="tiktok">TikTok</label>
        </FloatLabel>
        <span className="p-error pl-[5px]">{formik.errors.tiktok}</span>
      </div>
      <Bouton variant="secondary" className="w-[150px]">
        Modifier
      </Bouton>
    </form>
  );
}
