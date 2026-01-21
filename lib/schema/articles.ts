import * as Yup from "yup";

export const NouvelArticleSchema = Yup.object().shape({
  titre: Yup.string().required("Titre requis"),
  contenu: Yup.string().required("Contenu requis"),
  userId: Yup.string().required("Auteur requis"),
});
