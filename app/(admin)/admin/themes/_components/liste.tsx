"use client";

import { SuppressionTheme } from "./suppressionTheme";
import { Theme } from "@/lib/api/type";
import { ImageNext } from "@/components/image";
import * as Table from "@/components/table";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { ConfirmDialog } from "primereact/confirmdialog";

type ListeThemesProps = {
  themes: Theme[];
};

export function ListeThemes({ themes }: ListeThemesProps) {
  const [filtre, setFiltre] = useState("");

  return (
    <>
      <ConfirmDialog />

      <Table.Table className="text-primary mt-[50px] w-full">
        <Table.Header className="bg-secondary">
          <Table.Row>
            <Table.Cell className="p-[10px]">
              <InputText
                id="filtre"
                name="filtre"
                value={filtre}
                onChange={(e) => setFiltre(e.target.value)}
                className="h-full w-[300px]"
                placeholder="Rechercher"
              />
            </Table.Cell>
            <Table.Cell className="w-[250px]" />
            <Table.Cell className="w-[250px] p-[10px] text-right">
              <Link href="/admin/themes/nouveau">
                <Bouton type="button" variant="primary">
                  + Ajouter un thème
                </Bouton>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
            .map((theme, index) => (
              <Table.Row
                key={theme.id}
                className={index % 2 === 1 ? "bg-secondary" : ""}
              >
                <Table.Cell className="p-[10px]">{theme.nom}</Table.Cell>
                <Table.Cell className="flex justify-center">
                  {theme.image && (
                    <div className="relative m-[10px] h-[40px] w-[40px]">
                      <ImageNext
                        src={theme.image.nom}
                        alt={theme.nom}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <Link href={`/admin/themes/${theme.id}`}>
                    <Bouton
                      type="button"
                      variant="secondary"
                      className="mr-[10px] p-[8px]"
                    >
                      <FaPen />
                    </Bouton>
                  </Link>
                  <SuppressionTheme themeId={theme.id ?? ""} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Table>
    </>
  );
}
