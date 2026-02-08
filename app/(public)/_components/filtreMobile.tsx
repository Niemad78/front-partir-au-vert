"use client";

import { getThemes } from "@/lib/api/resources/theme";
import { Dropdown } from "primereact/dropdown";
import { Sidebar } from "primereact/sidebar";
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

export default function FiltreMobile() {
  const [visible, setVisible] = useState(false);
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

  const dropdownClass = "w-full border border-neutral-200 rounded-lg shadow-sm";

  return (
    <>
      <Bouton onClick={() => setVisible(true)} className="mt-2">
        Rechercher une activité
      </Bouton>

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        fullScreen
        blockScroll
        pt={{
          header: { className: "bg-white" },
          content: { className: "bg-white" },
          closeButton: { className: "text-neutral-700 hover:bg-neutral-100" },
          closeIcon: { className: "text-neutral-700" },
        }}
        header={<h2 className="text-primary text-lg font-bold">Filtres</h2>}
      >
        <div className="flex flex-col gap-y-[20px] px-[10px]">
          <div className="flex flex-col gap-y-[5px]">
            <label className="text-sm font-semibold text-neutral-700">
              Thème
            </label>
            <Dropdown
              value={themeChoisi}
              onChange={(e) => dispatch(setTheme(e.value ?? null))}
              options={themeOptions}
              placeholder="Choisir un thème"
              className={dropdownClass}
            />
          </div>

          <div className="flex flex-col gap-y-[5px]">
            <label className="text-sm font-semibold text-neutral-700">
              Durée
            </label>
            <Dropdown
              value={dureeChoisie}
              onChange={(e) => dispatch(setDuree(e.value ?? null))}
              options={dureeOptions}
              placeholder="Choisir une durée"
              className={dropdownClass}
            />
          </div>

          <div className="flex flex-col gap-y-[5px]">
            <label className="text-sm font-semibold text-neutral-700">
              Prix
            </label>
            <Dropdown
              value={prix}
              onChange={(e) => dispatch(setPrix(e.value ?? null))}
              options={prixOptions}
              placeholder="Choisir un budget"
              className={dropdownClass}
            />
          </div>

          <div className="flex flex-col gap-y-[5px]">
            <label className="text-sm font-semibold text-neutral-700">
              Participants
            </label>
            <Dropdown
              value={nbPersonnes}
              onChange={(e) => dispatch(setNbPersonnes(e.value ?? null))}
              options={personnesOptions}
              placeholder="Nombre de personnes"
              className={dropdownClass}
            />
          </div>

          <Bouton
            onClick={() => setVisible(false)}
            className="mt-[10px] w-full"
          >
            Rechercher
          </Bouton>
        </div>
      </Sidebar>
    </>
  );
}
