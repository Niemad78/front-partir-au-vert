import { Duree } from "./api/resources/activite/type";
import { DureeKey } from "./utils/formatDuree";

export const dureeOptions = Object.entries(Duree).map(([key, label]) => ({
  label,
  value: key as DureeKey,
}));

export const personnesOptions = [
  { label: "1 personne", value: 1 },
  { label: "2 personnes", value: 2 },
  { label: "3 personnes", value: 3 },
  { label: "4 personnes", value: 4 },
  { label: "5 personnes", value: 5 },
  { label: "6 personnes", value: 6 },
  { label: "7 personnes", value: 7 },
  { label: "8 personnes", value: 8 },
  { label: "9 personnes", value: 9 },
  { label: "10 personnes", value: 10 },
  { label: "11 personnes", value: 11 },
  { label: "12 personnes", value: 12 },
  { label: "13 personnes", value: 13 },
  { label: "14 personnes", value: 14 },
  { label: "15 personnes", value: 15 },
  { label: "16 personnes", value: 16 },
  { label: "17 personnes", value: 17 },
  { label: "18 personnes", value: 18 },
  { label: "19 personnes", value: 19 },
  { label: "20 personnes", value: 20 },
  { label: "Plus de 20 personnes", value: 21 },
];

export const prixOptions = [
  { label: "Moins de 50€", value: 50 },
  { label: "50€ - 100€", value: 100 },
  { label: "100€ - 150€", value: 150 },
  { label: "150€ - 200€", value: 200 },
  { label: "Plus de 200€", value: 201 },
];
