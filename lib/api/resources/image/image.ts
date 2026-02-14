import { DELETE, POST } from "@/lib/api/client";
import { BaseResult } from "@/lib/api/type";
import { ImageResponse, ImagesResponse } from "./type";

type NouvelleImageProps = {
  image: File;
  token?: string;
};

export async function nouvelleImage({ image, token }: NouvelleImageProps) {
  const formData = new FormData();

  formData.append("image", image);

  const response = await POST<ImageResponse, FormData>(
    "/images/telecharger",
    formData,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    imageId: response.image.id,
  };
}

type NouvellesImagesProps = {
  images: File[];
  token?: string;
};

export async function nouvellesImages({ images, token }: NouvellesImagesProps) {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await POST<ImagesResponse, FormData>(
    "/images/telecharger-plusieurs",
    formData,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    imageIds: response.imageIds,
  };
}

type SuppressionImageProps = {
  imageId: string;
  token?: string;
};

export async function deleteImage({ imageId, token }: SuppressionImageProps) {
  const response = await DELETE<BaseResult<null>>(
    `/images/suppression/${imageId}`,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      ok: response.ok,
      status: response.status ?? 500,
      errorMessage: response.errorMessage ?? "Une erreur est survenue",
    };
  }

  return {
    ok: response.ok,
    message: response.message,
  };
}
