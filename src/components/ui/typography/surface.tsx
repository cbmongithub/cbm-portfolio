export function Surface(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`border-border bg-card text-foreground rounded-lg border px-4 py-3 ${
        props.className ?? ""
      }`}
    />
  );
}
