"use client";

import { SuppressionArticle } from "./suppression";
import { Article } from "@/lib/api/type";
import * as Table from "@/components/table";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Bouton } from "@/components/bouton";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { ConfirmDialog } from "primereact/confirmdialog";

type ListeArticlesProps = {
  articles: Article[];
};

export function ListeArticles({ articles }: ListeArticlesProps) {
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
            <Table.Cell className="w-[160px]" />
            <Table.Cell className="w-[400px]" />
            <Table.Cell className="w-[250px] p-[10px] text-right">
              <Link href="/admin/blog/nouveau">
                <Bouton type="button" variant="primary">
                  + Ajouter un article
                </Bouton>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {articles
            .filter((article) =>
              article.titre
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
            .map((article, index) => (
              <Table.Row
                key={article.id}
                className={index % 2 === 1 ? "bg-secondary" : ""}
              >
                <Table.Cell className="p-[10px]">{article.titre}</Table.Cell>
                <Table.Cell className="text-center">
                  {article.createdAt.split("T")[0]}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {article.user.prenom} {article.user.nom}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <Link href={`/admin/blog/${article.id}`}>
                    <Bouton
                      type="button"
                      variant="secondary"
                      className="mr-[10px] p-[8px]"
                    >
                      <FaPen />
                    </Bouton>
                  </Link>
                  <SuppressionArticle articleId={article.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Table>
    </>
  );
}
