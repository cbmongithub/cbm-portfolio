import {
  MorphEffect,
  MorphEffectClose,
  MorphEffectContainer,
  MorphEffectContent,
  MorphEffectImage,
  MorphEffectTrigger,
} from "./effects";

type MorphImageProps = {
  src: string;
  alt: string;
};

export function MorphImage({ src, alt }: MorphImageProps) {
  return (
    <MorphEffect>
      <MorphEffectTrigger>
        <MorphEffectImage src={src} alt={alt} />
      </MorphEffectTrigger>
      <MorphEffectContainer>
        <MorphEffectContent>
          <MorphEffectImage src={src} alt={alt} />
        </MorphEffectContent>
        <MorphEffectClose />
      </MorphEffectContainer>
    </MorphEffect>
  );
}
