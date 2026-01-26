"use client";

import { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import * as Table from "@/components/table";
import { SuppressionUtilisateur } from "./suppression";
import { Utilisateur } from "@/lib/api/type";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { Bouton } from "@/components/bouton";

type ListeUtilisateursProps = {
  utilisateurs: Utilisateur[];
};

export function ListeUtilisateurs({ utilisateurs }: ListeUtilisateursProps) {
  const [filtre, setFiltre] = useState("");

  return (
    <>
      <ConfirmDialog />

      <Table.Table className="text-primary mt-[50px] w-full">
        <Table.Header className="bg-secondary">
          <Table.Row>
            <Table.Cell className="w-[350px] p-[10px]">
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
            <Table.Cell className="w-[250px]" />
            <Table.Cell className="p-[10px] text-right">
              <Link href="/admin/utilisateurs/nouveau">
                <Bouton type="button" variant="primary">
                  + Ajouter un utilisateur
                </Bouton>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {utilisateurs
            .filter((utilisateur) =>
              utilisateur.nom
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
            .map((utilisateur, index) => (
              <Table.Row
                key={utilisateur.id}
                className={index % 2 === 1 ? "bg-secondary" : ""}
              >
                <Table.Cell className="p-[10px]">{utilisateur.nom}</Table.Cell>
                <Table.Cell>{utilisateur.prenom}</Table.Cell>
                <Table.Cell>{utilisateur.email}</Table.Cell>
                <Table.Cell className="pr-[60px] text-right">
                  <SuppressionUtilisateur utilisateurId={utilisateur.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Table>
    </>
  );
}
