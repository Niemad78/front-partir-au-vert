"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { PasswordSchema } from "@/lib/schema/utilisateurs";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { Utilisateur } from "@/lib/api/type";

type MesInformationsFormProps = {
  utilisateur: Utilisateur;
};

export default function FormPassword({
  utilisateur,
}: MesInformationsFormProps) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordVerification: "",
    },
    validationSchema: PasswordSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = {
        password: values.password,
      };
      const res = await fetch("/api/utilisateurs/password", {
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
          <label htmlFor="password">Mot de passe</label>
        </FloatLabel>
      </div>
      <div className="w-full">
        <FloatLabel>
          <Password
            id="passwordVerification"
            name="passwordVerification"
            value={formik.values.passwordVerification}
            onChange={formik.handleChange}
            invalid={!!formik.errors.passwordVerification}
            aria-errormessage={formik.errors.passwordVerification}
            className="w-full"
            inputClassName="w-full"
            feedback={false}
          />
          <span id="passwordVerification-error" className="p-error pl-[5px]">
            {formik.errors.passwordVerification}
          </span>
          <label htmlFor="passwordVerification">
            Vérification mot de passe
          </label>
        </FloatLabel>
      </div>
      <Bouton type="submit" className="w-[150px]">
        Modifier
      </Bouton>
    </form>
  );
}
