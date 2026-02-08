"use client";

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
import {
  dureeOptions,
  personnesOptions,
  prixOptions,
} from "@/lib/filtreOptions";

export default function FiltreDesktop() {
  const dispatch = useAppDispatch();
  const { themeChoisi, dureeChoisie, prix, nbPersonnes } = useAppSelector(
    (state) => state.filtre,
  );
  const [themeOptions, setThemeOptions] = useState<
    { label: string; value: string }[]
  >([]);

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
