import * as Yup from "yup";

export const NouveauThemeSchema = Yup.object().shape({
  nom: Yup.string().required("Nom requis"),
  imageId: Yup.string().required("Image requise"),
});
