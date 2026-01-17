"use client";

import { SuppressionPartenaire } from "./suppression";
import { Partenaire } from "@/lib/api/type";
import * as Table from "@/components/table";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import Link from "next/link";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ImageNext } from "@/components/image";

type ListePartenaireProps = {
  partenaires: Partenaire[];
};

export function ListePartenaire({ partenaires }: ListePartenaireProps) {
  console.log("🚀 ~ ListePartenaire ~ partenaires:", partenaires);
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
            <Table.Cell className="w-[200px]" />
            <Table.Cell className="w-[250px] p-[10px] text-right">
              <Link href="/admin/partenaires/nouveau">
                <Bouton type="button" variant="primary">
                  + Ajouter un partenaire
                </Bouton>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {partenaires
            .filter((partenaire) =>
              partenaire.nom
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
            .map((partenaire, index) => (
              <Table.Row
                key={partenaire.id}
                className={index % 2 === 1 ? "bg-secondary" : ""}
              >
                <Table.Cell className="p-[10px]">{partenaire.nom}</Table.Cell>
                <Table.Cell className="flex justify-center">
                  {partenaire.image && (
                    <div className="relative m-[10px] h-[40px] w-[40px]">
                      <ImageNext
                        src={partenaire.image.nom}
                        alt={partenaire.nom}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <SuppressionPartenaire partenaireId={partenaire.id ?? ""} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Table>
    </>
  );
}
