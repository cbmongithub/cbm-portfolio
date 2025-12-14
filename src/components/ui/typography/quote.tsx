export function Quote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className={`border-info! text-info-foreground my-2 border-l-2 py-1 pl-4 ${
        props.className ?? ""
      }`}
    />
  );
}
