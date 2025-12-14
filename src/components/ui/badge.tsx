import { cn } from "@/lib/utils";

type BadgeVariant = "info" | "success" | "warning" | "danger";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  label: string;
  variant?: BadgeVariant;
};

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  info: "bg-info-soft text-info-foreground border-info!",
  success: "bg-success-soft text-success-foreground border-success!",
  warning: "bg-warning-soft text-warning-foreground border-warning!",
  danger: "bg-danger-soft text-danger-foreground border-danger!",
};

export function Badge({ label, variant = "info", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
}
