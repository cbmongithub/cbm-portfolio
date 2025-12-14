export function Small(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`text-muted-foreground py-1 text-sm ${props.className ?? ""}`}
    />
  );
}
