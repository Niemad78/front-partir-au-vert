"use client";

import { Bouton } from "@/components/bouton";
import { useRouter } from "next/navigation";

export const BoutonLogout = () => {
  const router = useRouter();

  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
    }).then(() => {
      router.push("/login");
    });
  };

  return (
    <Bouton type="button" onClick={logout} variant="secondary">
      Déconnexion
    </Bouton>
  );
};
