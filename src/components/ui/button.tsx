import { cn } from "@/lib/utils";

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  variant?: keyof typeof BUTTON_VARIANTS;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BUTTON_VARIANTS = {
  primary: "border border-border rounded px-3 py-2",
  icon: "border border-border rounded p-3 size-7",
  ghost:
    "inline-flex size-7 items-center justify-center text-muted-foreground hover:bg-transparent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 data-[checked=true]:text-foreground",
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "bg-background group text-muted-foreground hover:bg-secondary relative inline-flex cursor-pointer items-center justify-center overflow-hidden",
        BUTTON_VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
