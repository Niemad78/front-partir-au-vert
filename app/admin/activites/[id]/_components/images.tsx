"use client";

import { ImageNext } from "@/components/image";
import { ImageUploader } from "@/components/imageUploader";
import { useToast } from "@/components/toast";
import { Activite } from "@/lib/api/type";
import { useRouter } from "next/navigation";

export default function ActiviteImages({ activite }: { activite: Activite }) {
  const { show } = useToast();
  const router = useRouter();

  const uploadImage = async (imageIds: string[]) => {
    const data = { id: activite.id, imageIds };
    const res = await fetch("/api/activites/ajout-images", {
      method: "PUT",
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
    <div className="flex flex-col items-center">
      <div className="w-[750px]">
        <ImageUploader
          onUploaded={(imageIds) => uploadImage(imageIds)}
          multiple
        />
      </div>
      {activite.images && activite.images.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {activite.images.map((image) => (
            <div key={image.id} className="border p-2">
              <ImageNext
                src={image.nom}
                alt={image.nom}
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
