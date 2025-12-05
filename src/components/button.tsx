type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  variant: keyof typeof BUTTON_VARIANTS;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BUTTON_VARIANTS = {
  primary: "border border-border px-3 py-2",
  icon: "border border-border p-3 size-8",
};

export function Button({
  icon,
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const cls = BUTTON_VARIANTS[variant];

  return (
    <button
      type="button"
      className={`group text-foreground relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded ${cls} ${
        className ?? ""
      }`}
      {...props}
    >
      {icon && (
        <span className="ease text-foreground absolute flex size-full items-center justify-center">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
