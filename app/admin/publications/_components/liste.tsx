"use client";

import { SuppressionPublication } from "./suppression";
import { Image, Theme } from "@/lib/api/type";
import * as Table from "@/components/table";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { ConfirmDialog } from "primereact/confirmdialog";

type ListePublicationsProps = {
  publications: {
    id: string;
    titre: string;
    contenu: string;
    type: string;
  }[];
};

export function ListePublications({ publications }: ListePublicationsProps) {
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
              <Link href="/admin/publications/nouveau">
                <Bouton type="button" variant="primary">
                  + Ajouter une publication
                </Bouton>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {publications
            .filter((publication) =>
              publication.titre
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
            .map((publication, index) => (
              <Table.Row
                key={publication.id}
                className={index % 2 === 1 ? "bg-secondary" : ""}
              >
                <Table.Cell className="p-[10px]">
                  {publication.titre}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {publication.type}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <Link href={`/admin/publications/${publication.id}`}>
                    <Bouton
                      type="button"
                      variant="secondary"
                      className="mr-[10px] p-[8px]"
                    >
                      <FaPen />
                    </Bouton>
                  </Link>
                  <SuppressionPublication publicationId={publication.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Table>
    </>
  );
}
