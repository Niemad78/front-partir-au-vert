import Image from "next/image";
import { IMAGE_URL } from "@/lib/constants";

type ImageStrapiProps = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  overrideSrc?: string;
  className?: string;
  blurDataUrl?: string;
};

export const ImageNext = ({
  src,
  alt,
  width,
  height,
  sizes,
  overrideSrc,
  className,
  blurDataUrl,
}: ImageStrapiProps) => {
  return (
    <Image
      src={src ? getMedia(src) : "/images/logo-1.jpg"}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      overrideSrc={overrideSrc}
      className={className}
      placeholder="blur"
      blurDataURL={getMedia(blurDataUrl || "")}
    />
  );
};

export const getMedia = (url: string) => {
  return decodeURIComponent(`${IMAGE_URL}/${url}`);
};
