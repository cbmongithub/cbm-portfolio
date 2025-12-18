import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "icon" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 border border-border rounded-lg",
  ghost: "text-muted-foreground hover:bg-muted/60 rounded-lg",
  icon: "text-muted-foreground hover:bg-muted/60 border border-border rounded-lg",
  outline:
    "text-secondary-foreground bg-secondary hover:bg-muted hover:text-foreground rounded-lg border border-border",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 py-1 text-sm",
  md: "h-10 px-4 py-2 text-sm",
  lg: "h-11 px-5 py-3 text-base",
  icon: "size-7 p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        BUTTON_STYLES[variant],
        BUTTON_SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
