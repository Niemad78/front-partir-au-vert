"use client";

import { Bouton } from "@/components/bouton";
import { Activite } from "@/lib/api/resources/activite/type";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { SuppressionPointFort } from "./suppressionPointFort";
import { useToast } from "@/components/toast";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "primereact/confirmdialog";

export default function PointFort({ activite }: { activite: Activite }) {
  const [pointForts, setPointForts] = useState([...(activite.pointFort || [])]);

  const { show } = useToast();
  const router = useRouter();

  useEffect(() => {
    setPointForts([...(activite.pointFort || [])]);
  }, [activite.pointFort]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPointForts((prevPointForts) =>
      prevPointForts.map((pointFort) =>
        pointFort.id === id ? { ...pointFort, nom: value } : pointFort,
      ),
    );
  };

  const addPointFort = () => {
    setPointForts((prevPointForts) => [
      ...prevPointForts,
      { id: `temp-${Date.now()}`, nom: "" },
    ]);
  };

  const savePointFort = async (pointFortId: string) => {
    const method = pointFortId.startsWith("temp-") ? "POST" : "PUT";
    const url =
      method === "POST"
        ? "/api/point-fort/nouveau-point-fort"
        : "/api/point-fort/modification";
    const data = {
      activiteId: activite.id,
      nom: pointForts.find((pf) => pf.id === pointFortId)?.nom || "",
      id: pointFortId.startsWith("temp-") ? undefined : pointFortId,
    };

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.ok) {
      show({
        severity: "success",
        summary: "Succès",
        detail: result.message,
      });

      router.refresh();
    } else {
      show({
        severity: "error",
        summary: "Erreur",
        detail: `${result.status} - ${result.errorMessage}`,
      });
    }
  };

  return (
    <>
      <ConfirmDialog />

      <div className="flex w-full flex-col items-center">
        {pointForts?.map((pointFort) => (
          <div key={pointFort.id} className="mb-4 flex gap-[10px]">
            <InputText
              id={pointFort.id}
              name={pointFort.id}
              value={pointFort.nom}
              onChange={handleChange}
              className="w-[500px]"
              placeholder="Point fort"
            />
            <Bouton
              type="button"
              onClick={() => savePointFort(pointFort.id ?? "")}
            >
              Enregistrer
            </Bouton>
            {pointFort.id && !pointFort.id.startsWith("temp-") ? (
              <SuppressionPointFort pointFortId={pointFort.id ?? ""} />
            ) : null}
          </div>
        ))}
        <Bouton type="button" onClick={addPointFort}>
          +
        </Bouton>
      </div>
    </>
  );
}
