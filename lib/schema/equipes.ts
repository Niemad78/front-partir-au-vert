import * as Yup from "yup";

export const NouvelleEquipeSchema = Yup.object().shape({
  nom: Yup.string().required("Nom requis"),
  description: Yup.string().required("Description requise"),
  imageId: Yup.string().required("Image requise"),
});
