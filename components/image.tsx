import Image from "next/image";
import { IMAGE_URL } from "@/lib/constants";

const FALLBACK_SRC = "/images/logo-1.jpg";

type ImageFillProps = {
  src?: string;
  alt: string;
  fill: true;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

type ImageSizedProps = {
  src?: string;
  alt: string;
  fill?: false;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

type ImageNextProps = ImageFillProps | ImageSizedProps;

export const ImageNext = (props: ImageNextProps) => {
  const { src, alt, className, sizes, priority } = props;
  const resolvedSrc = src ? getMedia(src) : FALLBACK_SRC;

  if (props.fill) {
    return (
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={props.width}
      height={props.height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
};

export const getMedia = (url: string) => {
  return decodeURIComponent(`${IMAGE_URL}/${url}`);
};
