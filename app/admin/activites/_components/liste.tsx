"use client";

import { SuppressionActivite } from "./suppression";
import { Image } from "@/lib/api/type";
import * as Table from "@/components/table";
import { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { ConfirmDialog } from "primereact/confirmdialog";

type ListeActivitesProps = {
  activites: {
    id: string;
    nom: string;
    description: string;
    prix: number;
    ville: string;
    departement: string;
    nbPersonnesMax: number;
    themeId: string;
    image?: Image[];
  }[];
};

export function ListeActivites({ activites }: ListeActivitesProps) {
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
          {activites
            .filter((activite) =>
              activite.nom
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
            .map((activite) => (
              <Table.Row key={activite.id}>
                <Table.Cell className="text-left">{activite.nom}</Table.Cell>
                <Table.Cell className="text-left">{activite.ville}</Table.Cell>
                <Table.Cell>
                  <Link href={`/admin/activites/${activite.id}`}>
                    <Bouton
                      type="button"
                      variant="secondary"
                      className="mr-[10px] p-[8px]"
                    >
                      <FaPen />
                    </Bouton>
                  </Link>
                  <SuppressionActivite activiteId={activite.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Rows>
      </Table.Table>
    </>
  );
}
