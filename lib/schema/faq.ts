import * as Yup from "yup";

export const NouvelleFaqSchema = Yup.object().shape({
  question: Yup.string().required("Question requise"),
  reponse: Yup.string().required("Réponse requise"),
});
