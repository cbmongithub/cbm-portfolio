import {
  MorphEffect,
  MorphEffectClose,
  MorphEffectContainer,
  MorphEffectContent,
  MorphEffectImage,
  MorphEffectTrigger,
} from "@/components/ui/effects";

type MorphImageProps = {
  src: string;
  alt: string;
  sizes?: string;
};

export function MorphImage({
  src,
  alt,
  sizes = "(min-width: 640px) 50vw, 100vw",
}: MorphImageProps) {
  return (
    <MorphEffect>
      <MorphEffectTrigger>
        <MorphEffectImage src={src} alt={alt} sizes={sizes} />
      </MorphEffectTrigger>
      <MorphEffectContainer>
        <MorphEffectContent>
          <MorphEffectImage src={src} alt={alt} sizes={sizes} />
        </MorphEffectContent>
        <MorphEffectClose />
      </MorphEffectContainer>
    </MorphEffect>
  );
}
