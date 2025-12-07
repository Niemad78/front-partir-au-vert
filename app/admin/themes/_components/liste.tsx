"use client";

import { ConfirmDialog } from "primereact/confirmdialog";
import { SuppressionTheme } from "./suppressionTheme";
import { Image } from "@/lib/api/type";
import { ImageNext } from "@/components/image";
import * as Table from "@/components/table";

type ListeThemesProps = {
  themes: {
    id: string;
    nom: string;
    image?: Image;
  }[];
};

export function ListeThemes({ themes }: ListeThemesProps) {
  return (
    <>
      <ConfirmDialog />

      <Table.Table>
        <Table.Header>
          <Table.Cell className="w-[500px] border-none text-left">
            Nom
          </Table.Cell>
          <Table.Cell className="border-none">Image</Table.Cell>
          <Table.Cell className="border-none">Actions</Table.Cell>
        </Table.Header>
        <Table.Rows>
          {themes.map((theme) => (
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
                <SuppressionTheme themeId={theme.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Rows>
      </Table.Table>
    </>
  );
}
