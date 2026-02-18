"use client";

import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { FloatLabel } from "primereact/floatlabel";
import Quill from "@/components/quill";
import { Utilisateur } from "@/lib/api/resources/user/type";
import { Dropdown } from "primereact/dropdown";
import { cn } from "@/lib/utils/cn";

type FormProps = {
  className?: string;
  formik: any;
  auteurs: Utilisateur[];
  fonction: "ajouter" | "modifier";
};

export default function FormArticle({
  formik,
  auteurs,
  fonction,
  className,
}: FormProps) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex w-[75%] flex-col items-center gap-[25px]", className)}
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
          id="userId"
          name="userId"
          value={formik.values.userId}
          onChange={formik.handleChange}
          options={auteurs.map((auteur) => ({
            label: `${auteur.nom} ${auteur.prenom}`,
            value: auteur.id,
          }))}
          placeholder="Auteur"
          className="w-full"
        />
        <span id="userId-error" className="p-error pl-[5px]">
          {formik.errors.userId}
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
