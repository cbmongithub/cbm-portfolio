type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
};

export function Badge({ children, ...props }: BadgeProps) {
  return (
    <span
      className="group bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200"
      {...props}
    >
      {children}
    </span>
  );
}
