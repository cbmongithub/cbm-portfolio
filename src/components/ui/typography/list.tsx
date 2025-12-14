// Polymorphic List (supports as="ol")
type ListProps = React.HTMLAttributes<HTMLUListElement> & { as?: "ul" | "ol" };

export function List({ as = "ul", className, ...props }: ListProps) {
  const Tag = as;
  const marker = as === "ol" ? "list-decimal" : "list-disc";
  return (
    <Tag
      {...props}
      className={`text-foreground ml-5 ${marker} space-y-1 py-1 ${className ?? ""}`}
    />
  );
}
