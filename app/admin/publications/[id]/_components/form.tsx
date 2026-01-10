"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { FloatLabel } from "primereact/floatlabel";
import { Publication, TypePublication } from "@/lib/api/type";
import { Dropdown } from "primereact/dropdown";
import Quill from "@/components/quill";
import { NouvellePublicationSchema } from "@/lib/schema/publications";

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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-[35%] flex-col items-center gap-[25px]"
    >
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="titre"
            name="titre"
            value={formik.values.titre}
            onChange={formik.handleChange}
            invalid={!!formik.errors.titre}
            aria-errormessage={formik.errors.titre}
            className="w-full"
          />
          <span id="titre-error" className="p-error pl-[5px]">
            {formik.errors.titre}
          </span>
          <label htmlFor="titre">Titre</label>
        </FloatLabel>
      </div>

      <div className="w-[350px]">
        <Dropdown
          id="type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          options={Object.values(TypePublication)}
          placeholder="Type de publication"
          className="w-full"
        />
        <span id="type-error" className="p-error pl-[5px]">
          {formik.errors.type}
        </span>
      </div>
      <div className="w-full">
        <Quill
          name="contenu"
          value={formik.values.contenu}
          onChange={formik.handleChange}
          error={formik.errors.contenu as string}
          touched={formik.touched.contenu}
        />
      </div>
      <Bouton variant="secondary" className="w-[150px]">
        Modifier
      </Bouton>
    </form>
  );
}
