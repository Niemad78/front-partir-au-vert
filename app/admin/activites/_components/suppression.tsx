"use client";

import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { confirmDialog } from "primereact/confirmdialog";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";

type SuppressionActiviteProps = {
  activiteId: string;
};

export function SuppressionActivite({ activiteId }: SuppressionActiviteProps) {
  const { show } = useToast();
  const router = useRouter();

  const accept = async () => {
    const response = await fetch("/api/activites/suppression", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activiteId }),
    }).then((res) => res.json());

    if (!response.ok) {
      show({
        severity: "error",
        summary: "Erreur",
        detail: `Échec de la suppression de l'activité : ${response.errorMessage}`,
      });
      return;
    }

    show({
      severity: "warn",
      summary: "Confirmé",
      detail: "Activité supprimée",
    });

    router.refresh();
  };

  const reject = () => {
    show({
      severity: "info",
      detail: "Activité non supprimée",
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Êtes-vous sûr de vouloir supprimer cette activité ?",
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
