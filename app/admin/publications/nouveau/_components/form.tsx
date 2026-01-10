"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import { NouvellePublicationSchema } from "@/lib/schema/publications";
import FormPublication from "../../_components/form";

export default function Form() {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      titre: "",
      contenu: "",
      type: "",
    },
    validationSchema: NouvellePublicationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/publications/nouvelle-publication", {
        method: "POST",
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

  return <FormPublication formik={formik} fonction="ajouter" />;
}
