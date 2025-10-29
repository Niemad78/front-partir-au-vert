import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string().required("Mot de passe requis"),
});

export const MesInformationsSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
      "Le mot de passe doit contenir au moins 8 caractères et des caractères spéciaux",
    )
    .required("Mot de passe requis"),
  passwordVerification: Yup.string().when("password", (password, schema) =>
    password && password.length > 0
      ? schema
          .oneOf(
            [Yup.ref("password")],
            "Les mots de passe ne correspondent pas",
          )
          .required("Veuillez confirmer votre mot de passe")
      : schema,
  ),
});

export const NouvelUtilisateurSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
      "Le mot de passe doit contenir au moins 8 caractères et des caractères spéciaux",
    )
    .required("Mot de passe requis"),
});
