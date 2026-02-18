"use client";

import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { confirmDialog } from "primereact/confirmdialog";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";

type SuppressionFaqProps = {
  faqId: string;
};

export function SuppressionFaq({ faqId }: SuppressionFaqProps) {
  const { show } = useToast();
  const router = useRouter();

  const accept = async () => {
    const response = await fetch("/api/faq/suppression", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ faqId }),
    }).then((res) => res.json());

    if (!response.ok) {
      show({
        severity: "error",
        summary: "Erreur",
        detail: `Échec de la suppression de la FAQ : ${response.errorMessage}`,
      });
      return;
    }

    show({
      severity: "warn",
      summary: "Confirmé",
      detail: "FAQ supprimée",
    });

    router.refresh();
  };

  const reject = () => {
    show({
      severity: "info",
      detail: "FAQ non supprimée",
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Êtes-vous sûr de vouloir supprimer cette FAQ ?",
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
