import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
  telephone: Yup.string().required("Téléphone requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  facebook: Yup.string().url("URL Facebook invalide").nullable().notRequired(),
  instagram: Yup.string()
    .url("URL Instagram invalide")
    .nullable()
    .notRequired(),
  twitter: Yup.string().url("URL Twitter invalide").nullable().notRequired(),
  linkedin: Yup.string().url("URL LinkedIn invalide").nullable().notRequired(),
  tiktok: Yup.string().url("URL TikTok invalide").nullable().notRequired(),
});
