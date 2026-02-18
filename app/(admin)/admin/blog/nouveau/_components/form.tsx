"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import { NouvelArticleSchema } from "@/lib/schema/articles";
import { Utilisateur } from "@/lib/api/resources/user/type";
import FormArticle from "../../_components/form";

type FormProps = {
  auteurs: Utilisateur[];
};

export default function Form({ auteurs }: FormProps) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      titre: "",
      contenu: "",
      userId: "",
    },
    validationSchema: NouvelArticleSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/articles/nouvel-article", {
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

        router.push(`/admin/blog/${result.id}`);
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

  return <FormArticle formik={formik} auteurs={auteurs} fonction="ajouter" />;
}
