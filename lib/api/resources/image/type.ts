import { BaseResult } from "@/lib/api/type";

export type Image = {
  id: string;
  nom: string;
};

export type ImageResponse = BaseResult<Image> & {
  imageId: string;
};

export type ImagesResponse = BaseResult<string[]> & {
  imageIds: string[];
};
