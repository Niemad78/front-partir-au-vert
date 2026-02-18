"use client";

import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Quill from "@/components/quill";
import { Bouton } from "@/components/bouton";
import { publicationOptions } from "@/lib/utils/formatPublication";

type FormProps = {
  formik: any;
  fonction: "ajouter" | "modifier";
};

export default function FormPublication({ formik, fonction }: FormProps) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-[75%] flex-col items-center gap-[25px]"
    >
      <div className="w-[350px]">
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
          options={publicationOptions}
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
        {fonction === "ajouter" ? "Ajouter" : "Modifier"}
      </Bouton>
    </form>
  );
}
