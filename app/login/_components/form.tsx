import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Bouton } from "@/components/bouton";
import { LoginSchema } from "@/lib/schema/schema";
import { useToast } from "@/components/toast";
import { message } from "@/components/message";

export default function LoginForm() {
  const { show } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        show({
          severity: "success",
          summary: "Succès",
          detail: "Connexion réussie",
        });

        router.push("/admin");
      } else {
        show({
          severity: "error",
          summary: "Erreur",
          detail: `${res.status} - ${message(res.statusText)}`,
        });
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-[80%] flex-col items-center gap-[20px]"
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
      <Bouton type="submit" variant="secondary" className="w-[150px]">
        Se connecter
      </Bouton>
    </form>
  );
}
