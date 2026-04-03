import * as React from "react";
import { cn } from "./lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-secondary-foreground shadow-[0_8px_24px_rgba(0,108,73,0.22)] hover:brightness-105 active:brightness-95",
  secondary:
    "bg-surfaceHigh text-text hover:bg-surfaceHighest shadow-[0_4px_12px_rgba(11,28,48,0.06)]",
  ghost: "bg-transparent text-text hover:bg-surfaceLow",
  outline:
    "bg-surface border border-outline/30 text-text hover:bg-surfaceLow",
  danger:
    "bg-danger text-white shadow-[0_8px_24px_rgba(186,26,26,0.22)] hover:brightness-105",
};

const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, type, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aria focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
      buttonVariantStyles[variant],
      buttonSizeStyles[size],
      className,
    );

    if (href) {
      return (
        <a className={classes} href={href}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} type={type ?? "button"} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info" | "aria";
const badgeVariantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-surfaceHigh text-text",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  aria: "bg-gradient-to-r from-[color:var(--aria-start)] to-[color:var(--aria-end)] text-white",
};

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        badgeVariantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export type SurfacePanelProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "base" | "low" | "high" | "highest" | "glass";
};

const panelToneStyles: Record<NonNullable<SurfacePanelProps["tone"]>, string> = {
  base: "bg-surface text-text",
  low: "bg-surfaceLow text-text",
  high: "bg-surfaceHigh text-text",
  highest: "bg-surfaceHighest text-text",
  glass: "bg-surface/80 text-text backdrop-blur-md",
};

export function SurfacePanel({
  className,
  tone = "base",
  ...props
}: SurfacePanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-outline/10 shadow-[0_2px_12px_rgba(11,28,48,0.06)]",
        panelToneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-9 w-full rounded-lg border border-outline/20 bg-surface px-3 text-sm text-text placeholder:text-muted/60 transition-all outline-none focus:border-aria/40 focus:ring-2 focus:ring-aria/20",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[96px] w-full rounded-lg border border-outline/20 bg-surface px-3 py-2 text-sm text-text placeholder:text-muted/60 transition-all outline-none focus:border-aria/40 focus:ring-2 focus:ring-aria/20",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-9 w-full appearance-none rounded-lg border border-outline/20 bg-surface px-3 text-sm text-text transition-all outline-none focus:border-aria/40 focus:ring-2 focus:ring-aria/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-xs font-semibold text-muted",
        className,
      )}
      {...props}
    />
  );
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight text-text">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  );
}

export interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "success" | "warning" | "danger" | "info";
  footer?: string;
}

const deltaToneStyles: Record<NonNullable<KpiCardProps["deltaTone"]>, string> = {
  success: "text-emerald-700 bg-emerald-100",
  warning: "text-amber-700 bg-amber-100",
  danger: "text-red-700 bg-red-100",
  info: "text-blue-700 bg-blue-100",
};

export function KpiCard({
  label,
  value,
  delta,
  deltaTone = "info",
  footer,
}: KpiCardProps) {
  return (
    <SurfacePanel tone="base" className="p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="text-2xl font-bold tracking-tight text-text">
          {value}
        </div>
        {delta ? (
          <Badge className={cn("shrink-0", deltaToneStyles[deltaTone])} variant="neutral">
            {delta}
          </Badge>
        ) : null}
      </div>
      {footer ? <p className="mt-1.5 text-xs text-muted">{footer}</p> : null}
    </SurfacePanel>
  );
}

export interface TableShellProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export function TableShell({
  className,
  compact,
  ...props
}: TableShellProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-outline/10 bg-surface",
        compact ? "ring-1 ring-outline/15" : "",
        className,
      )}
      {...props}
    />
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-outline/15", className)} />;
}

export function FieldGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

export function HelperText({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs leading-5 text-muted", className)} {...props} />
  );
}
