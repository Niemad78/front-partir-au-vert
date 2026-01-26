"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { EmailSchema } from "@/lib/schema/utilisateurs";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { Utilisateur } from "@/lib/api/type";

type MesInformationsFormProps = {
  utilisateur: Utilisateur;
};

export default function FormEmail({ utilisateur }: MesInformationsFormProps) {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: utilisateur.email,
    },
    validationSchema: EmailSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/utilisateurs/email", {
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
      <Bouton type="submit" className="w-[150px]">
        Modifier
      </Bouton>
    </form>
  );
}
