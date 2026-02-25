"use client";

import { Bouton } from "@/components/bouton";
import { Activite } from "@/lib/api/resources/activite/type";
import { useEffect, useState } from "react";
import { useToast } from "@/components/toast";
import { useRouter } from "next/navigation";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { SuppressionPointGps } from "./suppressionPointGps";

export default function PointGps({ activite }: { activite: Activite }) {
  const [pointGps, setPointGps] = useState([...(activite.coordonnees || [])]);

  const { show } = useToast();
  const router = useRouter();

  useEffect(() => {
    setPointGps([...(activite.coordonnees || [])]);
  }, [activite.coordonnees]);

  const addPointGps = () => {
    setPointGps((prevPointGps) => [
      ...prevPointGps,
      { id: `temp-${Date.now()}`, latitude: 0, longitude: 0 },
    ]);
  };

  const savePointGps = async (pointGpsId: string) => {
    const method = pointGpsId.startsWith("temp-") ? "POST" : "PUT";
    const url =
      method === "POST"
        ? "/api/point-gps/nouveau-point-gps"
        : "/api/point-gps/modification";
    const data = {
      activiteId: activite.id,
      latitude: pointGps.find((pf) => pf.id === pointGpsId)?.latitude || 0,
      longitude: pointGps.find((pf) => pf.id === pointGpsId)?.longitude || 0,
      id: pointGpsId.startsWith("temp-") ? undefined : pointGpsId,
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
    <div className="mt-[20px] flex w-full flex-col items-center gap-y-[20px]">
      {pointGps?.map((pointGps) => (
        <div key={pointGps.id} className="mb-4 flex gap-[10px]">
          <div className="col-span-1">
            <FloatLabel>
              <InputNumber
                id={`latitude-${pointGps.id}`}
                name={`latitude-${pointGps.id}`}
                value={pointGps.latitude}
                onValueChange={(e) =>
                  setPointGps((prevPointGps) =>
                    prevPointGps.map((pg) =>
                      pg.id === pointGps.id
                        ? { ...pg, latitude: e.value ?? 0 }
                        : pg,
                    ),
                  )
                }
                className="w-full"
                showButtons={false}
                maxFractionDigits={10}
                min={-90}
                max={90}
              />
              <label htmlFor={`latitude-${pointGps.id}`}>Latitude</label>
            </FloatLabel>
          </div>
          <div className="col-span-1">
            <FloatLabel>
              <InputNumber
                id={`longitude-${pointGps.id}`}
                name={`longitude-${pointGps.id}`}
                value={pointGps.longitude}
                onValueChange={(e) =>
                  setPointGps((prevPointGps) =>
                    prevPointGps.map((pg) =>
                      pg.id === pointGps.id
                        ? { ...pg, longitude: e.value ?? 0 }
                        : pg,
                    ),
                  )
                }
                className="w-full"
                showButtons={false}
                maxFractionDigits={10}
                min={-180}
                max={180}
              />
              <label htmlFor={`longitude-${pointGps.id}`}>Longitude</label>
            </FloatLabel>
          </div>
          <Bouton type="button" onClick={() => savePointGps(pointGps.id ?? "")}>
            Enregistrer
          </Bouton>
          {pointGps.id && !pointGps.id.startsWith("temp-") ? (
            <SuppressionPointGps pointGpsId={pointGps.id ?? ""} />
          ) : null}
        </div>
      ))}
      <Bouton type="button" onClick={addPointGps}>
        +
      </Bouton>
    </div>
  );
}
