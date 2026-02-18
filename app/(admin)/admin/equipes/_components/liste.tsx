"use client";

import { SuppressionEquipe } from "./suppressionTheme";
import { Equipe } from "@/lib/api/resources/equipe/type";
import { ImageNext } from "@/components/image";
import * as Table from "@/components/table";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { ConfirmDialog } from "primereact/confirmdialog";

type ListeEquipesProps = {
  equipes: Equipe[];
};

export function ListeEquipes({ equipes }: ListeEquipesProps) {
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
              <Link href="/admin/equipes/nouveau">
                <Bouton type="button" variant="primary">
                  + Ajouter un membre
                </Bouton>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {equipes
            .filter((equipe) =>
              equipe.nom
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
            .map((equipe, index) => (
              <Table.Row
                key={equipe.id}
                className={index % 2 === 1 ? "bg-secondary" : ""}
              >
                <Table.Cell className="p-[10px]">{equipe.nom}</Table.Cell>
                <Table.Cell className="flex justify-center">
                  {equipe.image && (
                    <div className="relative m-[10px] h-[40px] w-[40px]">
                      <ImageNext
                        src={equipe.image.nom}
                        alt={equipe.nom}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <Link href={`/admin/equipes/${equipe.id}`}>
                    <Bouton
                      type="button"
                      variant="secondary"
                      className="mr-[10px] p-[8px]"
                    >
                      <FaPen />
                    </Bouton>
                  </Link>
                  <SuppressionEquipe equipeId={equipe.id ?? ""} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Table>
    </>
  );
}
