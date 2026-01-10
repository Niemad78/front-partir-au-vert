import * as Yup from "yup";

export const NouvellePublicationSchema = Yup.object().shape({
  titre: Yup.string().required("Titre requis"),
  contenu: Yup.string().required("Contenu requis"),
  type: Yup.string()
    .oneOf(["histoire", "seminaire", "autre"])
    .required("Type requis"),
});
