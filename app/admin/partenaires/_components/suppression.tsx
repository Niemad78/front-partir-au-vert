"use client";

import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { confirmDialog } from "primereact/confirmdialog";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";

type SuppressionPartenaireProps = {
  partenaireId: string;
};

export function SuppressionPartenaire({
  partenaireId,
}: SuppressionPartenaireProps) {
  const { show } = useToast();
  const router = useRouter();

  const accept = async () => {
    const response = await fetch("/api/partenaires/suppression", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partenaireId }),
    }).then((res) => res.json());

    if (!response.ok) {
      show({
        severity: "error",
        summary: "Erreur",
        detail: `Échec de la suppression du partenaire : ${response.errorMessage}`,
      });
      return;
    }

    show({
      severity: "warn",
      summary: "Confirmé",
      detail: "Partenaire supprimé avec succès",
    });

    router.refresh();
  };

  const reject = () => {
    show({
      severity: "info",
      detail: "Partenaire non supprimé",
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Êtes-vous sûr de vouloir supprimer ce partenaire ?",
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
