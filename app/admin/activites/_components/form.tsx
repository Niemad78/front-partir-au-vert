"use client";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Bouton } from "@/components/bouton";
import { FloatLabel } from "primereact/floatlabel";
import { MultiSelect } from "primereact/multiselect";
import { Theme } from "@/lib/api/type";
import Quill from "@/components/quill";
import { Dropdown } from "primereact/dropdown";
import { dureeOptions } from "@/lib/utils/formatDuree";

type Props = {
  formik: any;
  themes: Theme[];
  fonction: "ajouter" | "modifier";
};

export default function FormActivite({ formik, fonction, themes }: Props) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid w-[75%] grid-cols-3 gap-[30px] py-[30px]"
    >
      <div className="col-span-1">
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
      <div className="col-span-1">
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
      <div className="col-span-1">
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
      <div className="col-span-1">
        <FloatLabel>
          <InputText
            id="adresse"
            name="adresse"
            value={formik.values.adresse}
            onChange={formik.handleChange}
            invalid={!!formik.errors.adresse}
            aria-errormessage={formik.errors.adresse}
            className="w-full"
          />
          <span id="adresse-error" className="p-error pl-[5px]">
            {formik.errors.adresse}
          </span>
          <label htmlFor="adresse">Adresse</label>
        </FloatLabel>
      </div>
      <div className="col-span-1">
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
      <div className="col-span-1">
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
      <div className="col-span-1">
        <MultiSelect
          id="themeIds"
          name="themeIds"
          value={formik.values.themeIds}
          onChange={formik.handleChange}
          options={themes.map((theme) => ({
            label: theme.nom,
            value: theme.id,
          }))}
          filter
          placeholder="Thème"
          selectionLimit={3}
          className="w-full"
        />
        <span id="themeIds-error" className="p-error pl-[5px]">
          {formik.errors.themeIds}
        </span>
      </div>
      <div className="col-span-1">
        <Dropdown
          id="duree"
          name="duree"
          value={formik.values.duree}
          onChange={formik.handleChange}
          options={dureeOptions}
          placeholder="Durée"
          className="w-full"
        />
        <span id="duree-error" className="p-error pl-[5px]">
          {formik.errors.duree}
        </span>
      </div>
      <div className="col-span-3">
        <Quill
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description as string}
          touched={formik.touched.description}
          placeholder="Description"
        />
      </div>
      <div className="col-span-1">
        <FloatLabel>
          <InputNumber
            id="latitude"
            name="latitude"
            value={formik.values.latitude}
            onValueChange={formik.handleChange}
            invalid={!!formik.errors.latitude}
            aria-errormessage={formik.errors.latitude}
            className="w-full"
            showButtons={false}
            maxFractionDigits={10}
            min={0}
            max={50}
          />
          <span id="latitude-error" className="p-error pl-[5px]">
            {formik.errors.latitude}
          </span>
          <label htmlFor="latitude">Latitude</label>
        </FloatLabel>
      </div>
      <div className="col-span-1">
        <FloatLabel>
          <InputNumber
            id="longitude"
            name="longitude"
            value={formik.values.longitude}
            onValueChange={formik.handleChange}
            invalid={!!formik.errors.longitude}
            aria-errormessage={formik.errors.longitude}
            className="w-full"
            showButtons={false}
            maxFractionDigits={10}
            min={0}
            max={50}
          />
          <span id="longitude-error" className="p-error pl-[5px]">
            {formik.errors.longitude}
          </span>
          <label htmlFor="longitude">Longitude</label>
        </FloatLabel>
      </div>
      <div className="col-span-2">
        <Quill
          name="accessibilite"
          value={formik.values.accessibilite}
          onChange={formik.handleChange}
          error={formik.errors.accessibilite as string}
          touched={formik.touched.accessibilite}
          placeholder="Accessibilité"
        />
      </div>
      <div className="col-span-3 flex justify-center">
        <Bouton variant="secondary" className="w-[150px]">
          {fonction === "ajouter" ? "Ajouter" : "Modifier"}
        </Bouton>
      </div>
    </form>
  );
}
