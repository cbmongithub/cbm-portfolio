export function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className={`bg-muted text-muted-foreground px-1 py-0.5 font-mono ${
        props.className ?? ""
      }`}
    />
  );
}
