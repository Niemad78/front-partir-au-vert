"use client";

import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Bouton } from "@/components/bouton";
import { MdOutlineMenu, MdSubdirectoryArrowRight } from "react-icons/md";
import { havePublication } from "@/lib/utils/havePublication";
import { TypePublication } from "@/lib/api/resources/publication/type";
import Link from "next/link";

type Publication = {
  id: string;
  titre: string;
  contenu: string;
  type: "histoire" | "seminaire" | "autre" | "mentions_legales" | "cgv";
};

type SideMenuProps = {
  publications: Publication[];
};

export default function SideMenu({ publications }: SideMenuProps) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="card justify-content-center flex">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        blockScroll
        className="w-full"
        pt={{
          header: { className: "bg-primary text-white" },
          content: { className: "bg-primary text-white" },
          closeButton: { className: "text-white hover:bg-white/10" },
          closeIcon: { className: "text-white" },
        }}
        header={<h2>Partir au Vert</h2>}
      >
        <nav className="flex flex-col gap-y-[15px] pl-[20px]">
          <div>Notre expertise</div>
          <div className="flex flex-col gap-y-[10px] pl-[20px]">
            <Link
              href="/notre-equipe"
              className="flex items-center gap-x-[5px]"
            >
              <MdSubdirectoryArrowRight />
              Notre équipe
            </Link>
            <Link
              href="/nos-partenaires"
              className="flex items-center gap-x-[5px]"
            >
              <MdSubdirectoryArrowRight />
              Nos partenaires
            </Link>
            {[
              ...publications.filter((pub) => pub.type === "histoire"),
              ...publications
                .filter(
                  (pub) =>
                    pub.type !== "histoire" &&
                    pub.type !== "seminaire" &&
                    pub.type !== "mentions_legales",
                )
                .sort((a, b) => a.titre.localeCompare(b.titre)),
            ].map((publication: Publication) => (
              <Link
                key={publication.id}
                href={`/publication/${publication.titre}`}
                className="flex items-center gap-x-[5px]"
              >
                <MdSubdirectoryArrowRight />
                {publication.titre}
              </Link>
            ))}
          </div>
          {havePublication({
            publications,
            type: TypePublication.seminaire,
          }) && <Link href="/seminaire">Séminaires</Link>}
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </Sidebar>
      <Bouton onClick={() => setVisible(true)}>
        <MdOutlineMenu size={24} />
      </Bouton>
    </div>
  );
}
