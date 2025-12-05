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
  return (
    <button
      type="button"
      className={`group text-foreground hover:bg-foreground/4 relative inline-flex cursor-pointer items-center justify-center overflow-hidden ${
        BUTTON_VARIANTS[variant]
      } ${className ?? ""}`}
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
