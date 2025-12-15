import Image from "next/image";

type FigcaptionProps = {
  text: string;
};

function Figcaption({ text }: FigcaptionProps) {
  return (
    <figcaption className="bg-muted/50 text-muted-foreground absolute bottom-0 left-0 w-full px-3 py-1 text-xs">
      {text}
    </figcaption>
  );
}

type FigureProps = {
  imageSrc: string;
  title: string;
  blurDataURL: string;
  caption?: string;
};

export function Figure({ imageSrc, title, blurDataURL, caption }: FigureProps) {
  return (
    <figure className="bg-muted relative mt-6 aspect-1200/630 overflow-hidden rounded-xl">
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="100vw"
        priority
        className="object-cover"
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
      {caption ? <Figcaption text={caption} /> : null}
    </figure>
  );
}
