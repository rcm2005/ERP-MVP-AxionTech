import * as React from "react";
import { cn } from "./lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-secondary-foreground shadow-[0_14px_34px_rgba(0,108,73,0.18)] hover:brightness-105",
  secondary:
    "bg-surfaceHigh text-text hover:bg-surfaceHighest shadow-[0_12px_28px_rgba(11,28,48,0.06)]",
  ghost: "bg-transparent text-text hover:bg-surfaceLow",
  outline:
    "bg-surface border border-outline/30 text-text hover:bg-surfaceLow",
  danger:
    "bg-danger text-white shadow-[0_14px_34px_rgba(186,26,26,0.18)] hover:brightness-105",
};

const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, type, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aria focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
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
  aria:
    "bg-gradient-to-r from-[color:var(--aria-start)] to-[color:var(--aria-end)] text-white",
};

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
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
        "rounded-[1.5rem] shadow-[0_20px_60px_rgba(11,28,48,0.08)]",
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
        "h-11 w-full rounded-xl bg-surfaceHighest px-4 text-sm text-text placeholder:text-muted transition-all outline-none ring-0 focus:bg-surface focus:ring-2 focus:ring-aria/40",
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
        "min-h-[112px] w-full rounded-xl bg-surfaceHighest px-4 py-3 text-sm text-text placeholder:text-muted transition-all outline-none focus:bg-surface focus:ring-2 focus:ring-aria/40",
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
        "h-11 w-full appearance-none rounded-xl bg-surfaceHighest px-4 text-sm text-text transition-all outline-none focus:bg-surface focus:ring-2 focus:ring-aria/40",
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
        "mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted",
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
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-black tracking-tight text-text md:text-[2rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
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
    <SurfacePanel tone="base" className="p-5 md:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="text-[1.65rem] font-black tracking-tight text-text md:text-[2rem]">
          {value}
        </div>
        {delta ? (
          <Badge className={deltaToneStyles[deltaTone]} variant="neutral">
            {delta}
          </Badge>
        ) : null}
      </div>
      {footer ? <p className="mt-2 text-xs text-muted">{footer}</p> : null}
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
        "overflow-hidden rounded-[1.75rem] bg-surface shadow-[0_20px_60px_rgba(11,28,48,0.08)]",
        compact ? "ring-1 ring-outline/20" : "",
        className,
      )}
      {...props}
    />
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-outline/20", className)} />;
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
