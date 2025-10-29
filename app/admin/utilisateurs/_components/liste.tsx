"use client";

import { ConfirmDialog } from "primereact/confirmdialog";
import { SuppressionUtilisateur } from "./suppressionUtilisateur";

type ListeUtilisateursProps = {
  users: {
    id: string;
    email: string;
  }[];
};

export function ListeUtilisateurs({ users }: ListeUtilisateursProps) {
  return (
    <>
      <ConfirmDialog />

      <ul className="flex flex-col gap-y-[10px]">
        {users.map((user) => (
          <li
            key={user.id}
            className="text-primary flex items-center gap-x-[10px]"
          >
            <SuppressionUtilisateur userId={user.id} />
            {user.email}
          </li>
        ))}
      </ul>
    </>
  );
}
