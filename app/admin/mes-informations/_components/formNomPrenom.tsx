"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { MesInformationsSchema } from "@/lib/schema/utilisateurs";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { Utilisateur } from "@/lib/api/type";

type MesInformationsFormProps = {
  utilisateur: Utilisateur;
};

export default function FormNomPrenom({
  utilisateur,
}: MesInformationsFormProps) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
    },
    validationSchema: MesInformationsSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/utilisateurs/mes-informations", {
        method: "PUT",
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
      className="flex w-[80%] w-[400px] flex-col items-center gap-[30px]"
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
        <FloatLabel>
          <InputText
            id="prenom"
            name="prenom"
            value={formik.values.prenom}
            onChange={formik.handleChange}
            invalid={!!formik.errors.prenom}
            aria-errormessage={formik.errors.prenom}
            className="w-full"
          />
          <span id="prenom-error" className="p-error pl-[5px]">
            {formik.errors.prenom}
          </span>
          <label htmlFor="prenom">Prenom</label>
        </FloatLabel>
      </div>
      <Bouton type="submit" className="w-[150px]">
        Modifier
      </Bouton>
    </form>
  );
}
