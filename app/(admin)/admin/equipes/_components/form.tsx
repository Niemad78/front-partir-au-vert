"use client";

import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { ImageUploader } from "@/components/imageUploader";
import { FloatLabel } from "primereact/floatlabel";
import Quill from "@/components/quill";
import { ImageNext } from "@/components/image";
import { Equipe } from "@/lib/api/resources/equipe/type";

type FormProps = {
  formik: any;
  equipe?: Equipe;
  fonction: "ajouter" | "modifier";
};

export default function FormEquipe({ formik, equipe, fonction }: FormProps) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-[50%] flex-col items-center gap-[20px]"
    >
      <div className="w-[50%]">
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
        <Quill
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description as string}
          touched={formik.touched.description}
        />
      </div>
      {equipe && equipe.image?.nom && (
        <div className="flex w-full justify-center">
          <ImageNext
            src={equipe.image?.nom}
            alt={equipe.nom}
            width={150}
            height={150}
          />
        </div>
      )}
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
        {fonction === "ajouter" ? "Ajouter" : "Modifier"}
      </Bouton>
    </form>
  );
}
