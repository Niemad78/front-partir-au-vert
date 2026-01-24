"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { NouvelUtilisateurSchema } from "@/lib/schema/utilisateurs";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { FloatLabel } from "primereact/floatlabel";

export default function Form() {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      nom: "",
      prenom: "",
    },
    validationSchema: NouvelUtilisateurSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/utilisateurs/nouvel-utilisateur", {
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

        router.push("/admin/utilisateurs");
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
      className="flex w-[30%] flex-col items-center gap-[30px]"
    >
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            invalid={!!formik.errors.email}
            aria-errormessage={formik.errors.email}
            className="w-full"
          />
          <span id="email-error" className="p-error pl-[5px]">
            {formik.errors.email}
          </span>
          <label htmlFor="email">Email</label>
        </FloatLabel>
      </div>
      <div className="w-full">
        <FloatLabel>
          <Password
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            invalid={!!formik.errors.password}
            aria-errormessage={formik.errors.password}
            className="w-full"
            inputClassName="w-full"
            feedback={false}
          />
          <span id="password-error" className="p-error pl-[5px]">
            {formik.errors.password}
          </span>
          <label htmlFor="password">Password</label>
        </FloatLabel>
      </div>
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
          <label htmlFor="prenom">Prénom</label>
        </FloatLabel>
      </div>
      <Bouton variant="secondary" className="w-[150px]">
        Ajouter
      </Bouton>
    </form>
  );
}
