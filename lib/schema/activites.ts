import * as Yup from "yup";

export const NouvelleActiviteSchema = Yup.object().shape({
  nom: Yup.string().required("Nom requis"),
  description: Yup.string().required("Description requise"),
  prix: Yup.number().required("Prix requis"),
  ville: Yup.string().required("Ville requise"),
  departement: Yup.number().required("Département requis"),
  nbPersonnesMax: Yup.number().required("Nombre de personnes maximum requis"),
  themeId: Yup.array().min(1, "Thème requis").required("Thème requis"),
  duree: Yup.string()
    .oneOf(["journee", "matinee", "apres_midi"])
    .required("Durée requise"),
});
