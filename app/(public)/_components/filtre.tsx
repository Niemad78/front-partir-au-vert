"use client";

import { Duree, DureeKey } from "@/lib/api/type";
import { getThemes } from "@/lib/api/resources/theme";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { Bouton } from "@/components/bouton";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setTheme,
  setDuree,
  setPrix,
  setNbPersonnes,
} from "@/lib/store/filtreSlice";

const dureeOptions = Object.entries(Duree).map(([key, label]) => ({
  label,
  value: key as DureeKey,
}));

export default function Filtre() {
  const dispatch = useAppDispatch();
  const { themeChoisi, dureeChoisie, prix, nbPersonnes } = useAppSelector(
    (state) => state.filtre,
  );
  const [themeOptions, setThemeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const personnesOptions = [
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

  const prixOptions = [
    { label: "Moins de 50€", value: 50 },
    { label: "50€ - 100€", value: 100 },
    { label: "100€ - 150€", value: 150 },
    { label: "150€ - 200€", value: 200 },
    { label: "Plus de 200€", value: 201 },
  ];

  useEffect(() => {
    getThemes().then((themesData) => {
      const themes = themesData.ok ? themesData.data : [];
      setThemeOptions(
        themes.map((theme) => ({
          label: theme.nom,
          value: theme.id ?? "",
        })),
      );
    });
  }, []);

  const segment =
    "flex items-center px-[10px] h-[50px] bg-white text-sm text-neutral-700";
  const divider = "border-r border-primary";
  const inputFlat =
    "!border-0 !shadow-none !ring-0 bg-transparent p-0 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none";
  const dropdownRootFlat = "!w-full !border-0 !shadow-none bg-transparent";

  return (
    <div className="border-primary mt-2 overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="flex items-stretch">
        <div className={`${segment} ${divider} w-[200px]`}>
          <Dropdown
            value={themeChoisi}
            onChange={(e) => dispatch(setTheme(e.value ?? null))}
            options={themeOptions}
            placeholder="Thème"
            className={dropdownRootFlat}
            pt={{
              root: { className: "w-full" },
              input: { className: inputFlat },
              trigger: { className: "ml-2 text-neutral-500" },
              panel: {
                className: "rounded-xl border border-neutral-200 shadow-lg",
              },
              item: { className: "text-sm" },
            }}
          />
        </div>

        <div className={`${segment} ${divider} w-[200px]`}>
          <Dropdown
            value={dureeChoisie}
            onChange={(e) => dispatch(setDuree(e.value ?? null))}
            options={dureeOptions}
            placeholder="Durée"
            className={dropdownRootFlat}
            pt={{
              root: { className: "w-full" },
              input: { className: inputFlat },
              trigger: { className: "ml-2 text-neutral-500" },
              panel: {
                className: "rounded-xl border border-neutral-200 shadow-lg",
              },
              item: { className: "text-sm" },
            }}
          />
        </div>

        <div className={`${segment} ${divider} w-[200px]`}>
          <Dropdown
            value={prix}
            onChange={(e) => dispatch(setPrix(e.value ?? null))}
            options={prixOptions}
            placeholder="Prix"
            className={dropdownRootFlat}
            pt={{
              root: { className: "w-full" },
              input: { className: inputFlat },
              trigger: { className: "ml-2 text-neutral-500" },
              panel: {
                className: "rounded-xl border border-neutral-200 shadow-lg",
              },
              item: { className: "text-sm" },
            }}
          />
        </div>

        <div className={`${segment} ${divider} w-[200px]`}>
          <Dropdown
            value={nbPersonnes}
            onChange={(e) => dispatch(setNbPersonnes(e.value ?? null))}
            options={personnesOptions}
            placeholder="Participants"
            className={dropdownRootFlat}
            pt={{
              root: { className: "w-full" },
              input: { className: inputFlat },
              trigger: { className: "ml-2 text-neutral-500" },
              panel: {
                className: "rounded-xl border border-neutral-200 shadow-lg",
              },
              item: { className: "text-sm" },
            }}
          />
        </div>

        <Bouton className="w-[200px] rounded-l-none">Rechercher</Bouton>
      </div>
    </div>
  );
}
