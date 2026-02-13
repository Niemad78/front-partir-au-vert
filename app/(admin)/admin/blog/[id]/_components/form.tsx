"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import { Utilisateur } from "@/lib/api/type";
import FormArticle from "../../_components/form";
import { NouvelArticleSchema } from "@/lib/schema/articles";
import { Article } from "@/lib/api/resources/blog/type";

type Props = {
  article: Article;
  auteurs: Utilisateur[];
};

export default function Form({ article, auteurs }: Props) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      titre: article.titre,
      contenu: article.contenu,
      userId: article.user.id,
    },
    validationSchema: NouvelArticleSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = { ...values, id: article.id };
      const res = await fetch("/api/articles/modification", {
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
    <div className="mt-[20px] flex justify-center">
      <FormArticle formik={formik} auteurs={auteurs} fonction="modifier" />
    </div>
  );
}
