"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { FloatLabel } from "primereact/floatlabel";
import { NouvelleActiviteSchema } from "@/lib/schema/activites";
import { MultiSelect } from "primereact/multiselect";
import { Theme } from "@/lib/api/type";
import Quill from "@/components/quill";

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
      themeId: "",
    },
    validationSchema: NouvelleActiviteSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = { ...values, themeId: values.themeId?.[0] || null };
      const res = await fetch("/api/activites/nouvelle-activite", {
        method: "POST",
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

        router.push(`/admin/activites/${result.data?.id}`);
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
      className="flex w-[75%] flex-col items-center gap-[25px]"
    >
      <div className="w-[350px]">
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
      <div className="w-[350px]">
        <FloatLabel>
          <InputNumber
            id="prix"
            name="prix"
            value={formik.values.prix}
            onValueChange={formik.handleChange}
            invalid={!!formik.errors.prix}
            aria-errormessage={formik.errors.prix}
            className="w-full"
            showButtons
            min={0}
          />
          <span id="prix-error" className="p-error pl-[5px]">
            {formik.errors.prix}
          </span>
          <label htmlFor="prix">Prix</label>
        </FloatLabel>
      </div>
      <div className="w-[350px]">
        <FloatLabel>
          <InputText
            id="ville"
            name="ville"
            value={formik.values.ville}
            onChange={formik.handleChange}
            invalid={!!formik.errors.ville}
            aria-errormessage={formik.errors.ville}
            className="w-full"
          />
          <span id="ville-error" className="p-error pl-[5px]">
            {formik.errors.ville}
          </span>
          <label htmlFor="ville">Ville</label>
        </FloatLabel>
      </div>
      <div className="w-[350px]">
        <FloatLabel>
          <InputNumber
            id="departement"
            name="departement"
            value={formik.values.departement}
            onValueChange={formik.handleChange}
            invalid={!!formik.errors.departement}
            aria-errormessage={formik.errors.departement}
            className="w-full"
            showButtons
            min={0}
            max={95}
          />
          <span id="departement-error" className="p-error pl-[5px]">
            {formik.errors.departement}
          </span>
          <label htmlFor="departement">Département</label>
        </FloatLabel>
      </div>
      <div className="w-[350px]">
        <FloatLabel>
          <InputNumber
            id="nbPersonnesMax"
            name="nbPersonnesMax"
            value={formik.values.nbPersonnesMax}
            onValueChange={formik.handleChange}
            invalid={!!formik.errors.nbPersonnesMax}
            aria-errormessage={formik.errors.nbPersonnesMax}
            className="w-full"
            showButtons
            min={0}
            max={50}
          />
          <span id="nbPersonnesMax-error" className="p-error pl-[5px]">
            {formik.errors.nbPersonnesMax}
          </span>
          <label htmlFor="nbPersonnesMax">Nombre de personnes maximum</label>
        </FloatLabel>
      </div>
      <div className="w-[350px]">
        <MultiSelect
          id="themeId"
          name="themeId"
          value={formik.values.themeId}
          onChange={formik.handleChange}
          options={themes.map((theme) => ({
            label: theme.nom,
            value: theme.id,
          }))}
          filter
          placeholder="Thème"
          selectionLimit={1}
          className="w-full"
        />
        <span id="themeId-error" className="p-error pl-[5px]">
          {formik.errors.themeId}
        </span>
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
      <Bouton variant="secondary" className="w-[150px]">
        Ajouter
      </Bouton>
    </form>
  );
}
