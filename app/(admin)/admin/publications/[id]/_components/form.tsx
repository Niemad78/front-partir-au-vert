"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import { Publication } from "@/lib/api/resources/publication/type";
import { NouvellePublicationSchema } from "@/lib/schema/publications";
import FormPublication from "../../_components/form";

export default function Form({ publication }: { publication: Publication }) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      titre: publication.titre,
      contenu: publication.contenu,
      type: publication.type,
    },
    validationSchema: NouvellePublicationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = {
        id: publication.id,
        ...values,
      };
      const res = await fetch("/api/publications/modification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.ok) {
        show({
          severity: "success",
          summary: "Succès",
          detail: result.message,
        });

        router.push("/admin/publications");
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

  return <FormPublication formik={formik} fonction="modifier" />;
}
