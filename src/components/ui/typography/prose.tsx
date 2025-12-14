export function Prose(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`text-foreground space-y-4 py-1 leading-relaxed [&_ol]:ml-5 [&_ol]:list-decimal [&_ul]:ml-5 [&_ul]:list-disc ${
        props.className ?? ""
      }`}
    />
  );
}
