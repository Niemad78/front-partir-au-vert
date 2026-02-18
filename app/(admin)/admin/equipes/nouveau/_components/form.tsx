"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import FormEquipe from "../../_components/form";
import { NouvelleEquipeSchema } from "@/lib/schema/equipes";

export default function Form() {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nom: "",
      description: "",
      imageId: "",
    },
    validationSchema: NouvelleEquipeSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/equipes/nouvelle-equipe", {
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

        router.push("/admin/equipes");
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

  return <FormEquipe formik={formik} fonction="ajouter" />;
}
