"use client";

import { SuppressionTheme } from "./suppressionTheme";
import { Image } from "@/lib/api/type";
import { ImageNext } from "@/components/image";
import * as Table from "@/components/table";
import { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { ConfirmDialog } from "primereact/confirmdialog";

type ListeThemesProps = {
  themes: {
    id: string;
    nom: string;
    image?: Image;
  }[];
};

export function ListeThemes({ themes }: ListeThemesProps) {
  const [filtre, setFiltre] = useState("");

  return (
    <>
      <ConfirmDialog />

      <div className="my-[20px] w-[500px]">
        <FloatLabel>
          <InputText
            id="filtre"
            name="filtre"
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
            className="w-full"
          />
          <label htmlFor="filtre">Rechercher</label>
        </FloatLabel>
      </div>

      <Table.Table>
        <Table.Header>
          <Table.Cell className="w-[500px] border-none text-left">
            Nom
          </Table.Cell>
          <Table.Cell className="border-none">Image</Table.Cell>
          <Table.Cell className="border-none">Actions</Table.Cell>
        </Table.Header>
        <Table.Rows>
          {themes
            .filter((theme) =>
              theme.nom
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                  filtre
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                ),
            )
            .map((theme) => (
              <Table.Row key={theme.id}>
                <Table.Cell className="text-left">{theme.nom}</Table.Cell>
                <Table.Cell>
                  {theme.image && (
                    <ImageNext
                      src={theme.image.nom}
                      alt={theme.nom}
                      width={60}
                      height={60}
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/admin/themes/${theme.id}`}>
                    <Bouton
                      type="button"
                      variant="secondary"
                      className="mr-[10px] p-[8px]"
                    >
                      <FaPen />
                    </Bouton>
                  </Link>
                  <SuppressionTheme themeId={theme.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Rows>
      </Table.Table>
    </>
  );
}
