type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  muted?: boolean;
};

export function Text({ muted, className, ...props }: TextProps) {
  return (
    <p
      className={`${
        muted ? "text-muted-foreground" : "text-foreground"
      } py-1 leading-relaxed ${className ?? ""}`}
      {...props}
    />
  );
}
