import { POST } from "../client";
import { BaseResult } from "../type";

type NouvelleImage = {
  image: File;
  token?: string;
};

type ImageResult = BaseResult & {
  imageId?: string;
};

export async function nouvelleImage({
  image,
  token,
}: NouvelleImage): Promise<ImageResult> {
  const formData = new FormData();

  formData.append("image", image);

  const response = await POST<ImageResult, FormData>(
    "/images/telecharger",
    formData,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `session=${token}`,
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
    imageId: response.imageId,
  };
}
