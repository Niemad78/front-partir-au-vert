"use client";

import { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Tag } from "primereact/tag";
import { useToast } from "@/components/toast";
import Image from "next/image";

type UploadStatus = "idle" | "uploading" | "done" | "error";

interface ImageUploaderProps {
  onUploaded: (imageIds: string[]) => void;
  chooseLabel?: string;
  cancelLabel?: string;
  multiple?: boolean;
}

export function ImageUploader({
  onUploaded,
  chooseLabel = "Choisir",
  cancelLabel = "Annuler",
  multiple = false,
}: ImageUploaderProps) {
  const { show } = useToast();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSelect = (e: any) => {
    const file = e.files?.[0];
    if (!file) return;

    setUploadStatus("idle");
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
  };

  const handleUpload = async (e: any) => {
    setUploadStatus("uploading");

    const form = new FormData();

    if (multiple) {
      for (const file of e.files) {
        form.append("images", file);
      }

      const resultat = await fetch("/api/images/uploads", {
        method: "POST",
        body: form,
      });

      const res = await resultat.json();

      if (!res.ok) {
        setUploadStatus("error");
        show({
          severity: "error",
          summary: "Erreur",
          detail: `${res.status} - ${res.errorMessage}`,
        });
        return;
      }

      setUploadStatus("done");
      const onUploadedIds: string[] = [];
      (res.imageIds as string[]).forEach((id) => onUploadedIds.push(id));
      onUploaded(onUploadedIds);
    } else {
      form.append("image", e.files[0]);

      const resultat = await fetch("/api/images/upload", {
        method: "POST",
        body: form,
      });

      const res = await resultat.json();

      if (!res.ok) {
        setUploadStatus("error");
        show({
          severity: "error",
          summary: "Erreur",
          detail: `${res.status} - ${res.errorMessage}`,
        });
        return;
      }

      setUploadStatus("done");
      onUploaded(res.imageId);
    }
  };

  const itemTemplate = (file: any) => {
    let severity: "warning" | "success" | "danger" | "info" = "info";
    let label = "En attente";

    if (uploadStatus === "uploading") {
      severity = "warning";
      label = "Envoi…";
    } else if (uploadStatus === "done") {
      severity = "success";
      label = "Upload OK";
    } else if (uploadStatus === "error") {
      severity = "danger";
      label = "Erreur";
    }

    return (
      <div className="flex w-full items-center justify-between px-2 py-1">
        <div className="flex items-center gap-3">
          {previewUrl && !multiple && (
            <div className="relative h-[100px] w-[100px] overflow-hidden rounded">
              <Image
                src={previewUrl}
                alt={file?.name ?? "preview"}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-sm font-medium">{file?.name}</span>
            <span className="text-surface-500 text-xs">
              {Math.round((file?.size ?? 0) / 1024)} Ko
            </span>
          </div>
        </div>

        <Tag value={label} severity={severity} />
      </div>
    );
  };

  return (
    <FileUpload
      name="image"
      customUpload
      uploadHandler={handleUpload}
      onSelect={handleSelect}
      accept="image/*"
      maxFileSize={10000000}
      chooseLabel={chooseLabel}
      cancelLabel={cancelLabel}
      emptyTemplate={<p className="m-0">Glissez une image ici</p>}
      itemTemplate={itemTemplate}
      multiple={multiple}
    />
  );
}
