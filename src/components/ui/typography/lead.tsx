export function Lead(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`text-foreground/90 py-1 text-lg leading-7 ${props.className ?? ""}`}
    />
  );
}
