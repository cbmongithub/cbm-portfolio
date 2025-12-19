import Image from "next/image";

type FigcaptionProps = {
  text: string;
};

function Figcaption({ text }: FigcaptionProps) {
  return (
    <figcaption className="bg-muted/60 text-muted-foreground absolute bottom-0 left-0 w-full px-3 py-1 text-xs">
      {text}
    </figcaption>
  );
}

type FigureProps = {
  imageSrc: string;
  alt: string;
  blurDataURL?: string;
  caption: string;
  priority?: boolean;
};

export function Figure({ imageSrc, alt, caption, priority = false }: FigureProps) {
  return (
    <figure className="bg-card border-border relative mt-6 aspect-1200/630 overflow-hidden border">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
      />
      <Figcaption text={caption} />
    </figure>
  );
}
