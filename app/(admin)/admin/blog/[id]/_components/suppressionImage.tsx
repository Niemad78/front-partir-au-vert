"use client";

import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { confirmDialog } from "primereact/confirmdialog";
import { Bouton } from "@/components/bouton";
import { useToast } from "@/components/toast";

type SuppressionImageProps = {
  imageId: string;
};

export function SuppressionImage({ imageId }: SuppressionImageProps) {
  const { show } = useToast();
  const router = useRouter();

  const accept = async () => {
    const response = await fetch("/api/images/suppression", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageId }),
    }).then((res) => res.json());

    if (!response.ok) {
      show({
        severity: "error",
        summary: "Erreur",
        detail: `Échec de la suppression de l'image : ${response.errorMessage}`,
      });
      return;
    }

    show({
      severity: "warn",
      summary: "Confirmé",
      detail: "Image supprimée",
    });

    router.refresh();
  };

  const reject = () => {
    show({
      severity: "info",
      detail: "Image non supprimée",
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Êtes-vous sûr de vouloir supprimer cette image ?",
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
        className="flex h-[50px] w-[50px] items-center justify-center p-[8px]"
      >
        <FaTrashAlt />
      </Bouton>
    </>
  );
}
