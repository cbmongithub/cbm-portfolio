import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "success" | "warning" | "danger";

type CalloutProps = {
  title?: string;
  children?: React.ReactNode;
  variant?: CalloutVariant;
  className?: string;
};

const ICONS: Record<CalloutVariant, React.ComponentType<{ className?: string }>> = {
  info: InfoCircledIcon,
  success: CheckCircledIcon,
  warning: ExclamationTriangleIcon,
  danger: CrossCircledIcon,
};

const VARIANT_STYLES: Record<CalloutVariant, string> = {
  info: "bg-info-soft text-info-foreground border-info!",
  success: "bg-success-soft text-success-foreground border-success!",
  warning: "bg-warning-soft text-warning-foreground border-warning!",
  danger: "bg-danger-soft text-danger-foreground border-danger!",
};

const ICON_STYLES: Record<CalloutVariant, string> = {
  info: "text-info!",
  success: "text-success!",
  warning: "text-warning!",
  danger: "text-danger!",
};

export function Callout({ title, children, variant = "info", className }: CalloutProps) {
  const Icon = ICONS[variant];

  return (
    <div
      role="alert"
      className={cn(
        "my-6 flex items-start gap-3 rounded-md border p-4",
        VARIANT_STYLES[variant],
        className
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", ICON_STYLES[variant])} />
      <div className="space-y-1">
        {title ? <p className="leading-tight font-semibold">{title}</p> : null}
        {children ? <div className="text-sm leading-relaxed">{children}</div> : null}
      </div>
    </div>
  );
}
