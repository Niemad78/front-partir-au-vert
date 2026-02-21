"use client";

import { ImageNext } from "@/components/image";
import { ImageUploader } from "@/components/imageUploader";
import { useToast } from "@/components/toast";
import { Activite } from "@/lib/api/resources/activite/type";
import { useRouter } from "next/navigation";
import { SuppressionImage } from "./suppressionImage";

export default function ActiviteImages({ activite }: { activite: Activite }) {
  const { show } = useToast();
  const router = useRouter();

  const uploadImage = async (imageIds: string[]) => {
    const data = { id: activite.id, imageIds };
    const res = await fetch("/api/activites/ajout-images", {
      method: "POST",
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
      <div className="flex flex-col items-center">
        <div className="w-[750px]">
          <ImageUploader
            onUploaded={(imageIds) => uploadImage(imageIds)}
            multiple
          />
        </div>
        {activite.images && activite.images.length > 0 && (
          <div className="mt-[30px] flex flex-wrap justify-center gap-[20px]">
            {activite.images.map((image) => (
              <div
                key={image.id}
                className="flex flex-col items-center gap-y-[10px]"
              >
                <div className="relative h-[150px] w-[150px]">
                  <ImageNext
                    src={image.nom}
                    alt={image.nom}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <SuppressionImage imageId={image.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
