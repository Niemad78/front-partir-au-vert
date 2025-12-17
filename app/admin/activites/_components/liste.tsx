"use client";

import { SuppressionActivite } from "./suppression";
import { Image, Theme } from "@/lib/api/type";
import * as Table from "@/components/table";
import { useState } from "react";
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
    theme: Theme;
    images?: Image[];
  }[];
};

export function ListeActivites({ activites }: ListeActivitesProps) {
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
            <Table.Cell className="w-[60px]" />
            <Table.Cell className="w-[250px]" />
            <Table.Cell className="w-[250px]" />
            <Table.Cell className="w-[250px] p-[10px] text-right">
              <Link href="/admin/activites/nouveau">
                <Bouton type="button" variant="primary">
                  + Ajouter une activité
                </Bouton>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
            .map((activite, index) => (
              <Table.Row
                key={activite.id}
                className={index % 2 === 1 ? "bg-secondary" : ""}
              >
                <Table.Cell className="p-[10px]">{activite.nom}</Table.Cell>
                <Table.Cell className="text-center">
                  {activite.departement}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {activite.ville}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {activite.theme.nom}
                </Table.Cell>
                <Table.Cell className="text-center">
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
        </Table.Body>
      </Table.Table>
    </>
  );
}
