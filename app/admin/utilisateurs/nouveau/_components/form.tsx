"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { NouvelUtilisateurSchema } from "@/lib/schema/utilisateurs";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";

export default function Form() {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      className="flex w-[30%] flex-col items-center gap-[20px]"
    >
      <div className="w-full">
        <InputText
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          invalid={!!formik.errors.email}
          aria-errormessage={formik.errors.email}
          className="w-full"
          placeholder="Email"
        />
        <span id="email-error" className="p-error pl-[5px]">
          {formik.errors.email}
        </span>
      </div>
      <div className="w-full">
        <Password
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          invalid={!!formik.errors.password}
          aria-errormessage={formik.errors.password}
          className="w-full"
          inputClassName="w-full"
          placeholder="Password"
          feedback={false}
        />
        <span id="password-error" className="p-error pl-[5px]">
          {formik.errors.password}
        </span>
      </div>
      <Bouton variant="secondary" className="w-[150px]">
        Ajouter
      </Bouton>
    </form>
  );
}
