"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { NouvelleFaqSchema } from "@/lib/schema/faq";

export default function Form() {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      question: "",
      reponse: "",
    },
    validationSchema: NouvelleFaqSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/faq/nouvelle-faq", {
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

        router.push("/admin/faqs");
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
      className="flex w-[35%] flex-col items-center gap-[25px]"
    >
      <div className="w-full">
        <FloatLabel>
          <InputText
            id="question"
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
            invalid={!!formik.errors.question}
            aria-errormessage={formik.errors.question}
            className="w-full"
          />
          <span id="question-error" className="p-error pl-[5px]">
            {formik.errors.question}
          </span>
          <label htmlFor="question">Question</label>
        </FloatLabel>
      </div>
      <div className="w-full">
        <FloatLabel>
          <InputTextarea
            id="reponse"
            name="reponse"
            rows={3}
            value={formik.values.reponse}
            onChange={formik.handleChange}
            invalid={!!formik.errors.reponse}
            aria-errormessage={formik.errors.reponse}
            className="w-full"
          />
          <span id="reponse-error" className="p-error pl-[5px]">
            {formik.errors.reponse}
          </span>
          <label htmlFor="reponse">Réponse</label>
        </FloatLabel>
      </div>
      <Bouton variant="secondary" className="w-[150px]">
        Ajouter
      </Bouton>
    </form>
  );
}
