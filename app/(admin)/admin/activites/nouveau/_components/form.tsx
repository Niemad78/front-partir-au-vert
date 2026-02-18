"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import { NouvelleActiviteSchema } from "@/lib/schema/activites";
import { Theme } from "@/lib/api/resources/theme/type";
import FormActivite from "../../_components/form";

type Props = {
  themes: Theme[];
};

export default function Form({ themes }: Props) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nom: "",
      description: "",
      prix: null,
      ville: "",
      departement: null,
      nbPersonnesMax: null,
      themeIds: [],
      duree: null,
      latitude: null,
      longitude: null,
      adresse: null,
      accessibilite: null,
    },
    validationSchema: NouvelleActiviteSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/activites/nouvelle-activite", {
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

        router.push(`/admin/activites/${result.id}`);
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

  return <FormActivite formik={formik} fonction="ajouter" themes={themes} />;
}
