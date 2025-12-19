type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
};

export function Badge({ children, ...props }: BadgeProps) {
  return (
    <span
      className="group bg-secondary text-secondary-foreground inline-flex items-center border px-3 py-1 text-xs font-medium"
      {...props}
    >
      {children}
    </span>
  );
}
