"use client";

import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { confirmDialog } from "primereact/confirmdialog";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";

export function SuppressionEquipe({ equipeId }: { equipeId: string }) {
  const { show } = useToast();
  const router = useRouter();

  const accept = async () => {
    const response = await fetch("/api/equipes/suppression", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ equipeId }),
    }).then((res) => res.json());

    if (!response.ok) {
      show({
        severity: "error",
        summary: "Erreur",
        detail: `Échec de la suppression du membre : ${response.errorMessage}`,
      });
      return;
    }

    show({
      severity: "warn",
      summary: "Confirmé",
      detail: "Membre supprimé",
    });

    router.refresh();
  };

  const reject = () => {
    show({
      severity: "info",
      detail: "Membre non supprimé",
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Êtes-vous sûr de vouloir supprimer ce membre ?",
      header: "Confirmation de suppression",
      defaultFocus: "accept",
      acceptClassName: "p-button-danger",
      acceptLabel: "Oui, supprimer",
      rejectLabel: "Non, annuler",
      accept,
      reject,
    });
  };

  return (
    <>
      <Bouton
        type="button"
        onClick={confirm}
        variant="danger"
        className="p-[8px]"
      >
        <FaTrashAlt />
      </Bouton>
    </>
  );
}
