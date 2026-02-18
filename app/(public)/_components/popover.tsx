"use client";

import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import Link from "next/link";

type Publication = {
  id: string;
  titre: string;
  contenu: string;
  type: "histoire" | "seminaire" | "autre" | "mentions_legales" | "cgv";
};

type PopoverProps = {
  className?: string;
  publications: Publication[];
};

export default function Popover({ className, publications }: PopoverProps) {
  const op = useRef<OverlayPanel>(null);

  return (
    <div className={className}>
      <div
        onMouseEnter={(e) => op.current && op.current.toggle(e)}
        className="cursor-pointer"
      >
        Notre expertise
      </div>
      <OverlayPanel ref={op}>
        <div className="flex flex-col items-center gap-y-[20px]">
          <Link href="/notre-equipe">Notre équipe</Link>
          <Link href="/nos-partenaires">Nos partenaires</Link>
          {[
            ...publications.filter((pub) => pub.type === "histoire"),
            ...publications
              .filter(
                (pub) =>
                  pub.type !== "histoire" &&
                  pub.type !== "seminaire" &&
                  pub.type !== "mentions_legales" &&
                  pub.type !== "cgv",
              )
              .sort((a, b) => a.titre.localeCompare(b.titre)),
          ].map((publication: Publication) => (
            <Link
              key={publication.id}
              href={`/publication/${publication.titre}`}
            >
              {publication.titre}
            </Link>
          ))}
        </div>
      </OverlayPanel>
    </div>
  );
}
