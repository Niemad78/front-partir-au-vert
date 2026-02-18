"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useToast } from "@/components/toast";
import { NouvelleActiviteSchema } from "@/lib/schema/activites";
import { Theme } from "@/lib/api/resources/theme/type";
import FormActivite from "../../_components/form";
import { Activite } from "@/lib/api/resources/activite/type";

type Props = {
  activite: Activite;
  themes: Theme[];
};

export default function Form({ activite, themes }: Props) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nom: activite.nom || "",
      description: activite.description || "",
      prix: activite.prix || null,
      ville: activite.ville || "",
      departement: activite.departement || null,
      nbPersonnesMax: activite.nbPersonnesMax || null,
      themeIds: activite.themes.map((theme) => theme.id) || [],
      duree: activite.duree || null,
      latitude: activite.latitude || null,
      longitude: activite.longitude || null,
      adresse: activite.adresse || null,
      accessibilite: activite.accessibilite || null,
    },
    validationSchema: NouvelleActiviteSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = {
        ...values,
        id: activite.id,
        themeIds: values.themeIds,
        duree: values.duree,
      };
      const res = await fetch("/api/activites/modification", {
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
    <div className="flex w-full justify-center">
      <FormActivite formik={formik} fonction="modifier" themes={themes} />
    </div>
  );
}
