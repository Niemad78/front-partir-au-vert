"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { NouveauThemeSchema } from "@/lib/schema/themes";
import { ImageUploader } from "@/components/imageUploader";
import { FloatLabel } from "primereact/floatlabel";

export default function Form() {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nom: "",
      imageId: "",
    },
    validationSchema: NouveauThemeSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/themes/nouveau-theme", {
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

        router.push("/admin/themes");
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
            id="nom"
            name="nom"
            value={formik.values.nom}
            onChange={formik.handleChange}
            invalid={!!formik.errors.nom}
            aria-errormessage={formik.errors.nom}
            className="w-full"
          />
          <span id="nom-error" className="p-error pl-[5px]">
            {formik.errors.nom}
          </span>
          <label htmlFor="nom">Nom</label>
        </FloatLabel>
      </div>
      <div className="w-full">
        <ImageUploader
          onUploaded={(imageId) => formik.setFieldValue("imageId", imageId)}
          chooseLabel="Choisir"
          cancelLabel="Annuler"
        />
        <span id="nom-error" className="p-error pl-[5px]">
          {formik.errors.imageId}
        </span>
      </div>
      <Bouton variant="secondary" className="w-[150px]">
        Ajouter
      </Bouton>
    </form>
  );
}
