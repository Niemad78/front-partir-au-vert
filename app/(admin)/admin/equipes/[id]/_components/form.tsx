"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import FormEquipe from "../../_components/form";
import { Equipe } from "@/lib/api/type";
import { NouvelleEquipeSchema } from "@/lib/schema/equipes";

export default function Form({ equipe }: { equipe: Equipe }) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nom: equipe.nom,
      description: equipe.description,
      imageId: equipe.image?.id || "",
    },
    validationSchema: NouvelleEquipeSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = {
        id: equipe.id,
        ...values,
      };
      const res = await fetch("/api/equipes/modification", {
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

  return <FormEquipe formik={formik} equipe={equipe} fonction="modifier" />;
}
