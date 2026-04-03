import type { SVGProps } from "react";
import { cn } from "@erp/ui";

export type IconName =
  | "menu"
  | "bell"
  | "home"
  | "wallet"
  | "file"
  | "chart"
  | "settings"
  | "sparkles"
  | "plus"
  | "search"
  | "calendar"
  | "filter"
  | "download"
  | "upload"
  | "chevron-right"
  | "chevron-left"
  | "arrow-right"
  | "arrow-left"
  | "check"
  | "x"
  | "info"
  | "warning"
  | "bank"
  | "receipt"
  | "money"
  | "users"
  | "building"
  | "chat"
  | "play"
  | "pause"
  | "link"
  | "eye"
  | "eye-off"
  | "lock"
  | "smart"
  | "send"
  | "grid"
  | "truck"
  | "target"
  | "arrow-up-right"
  | "repeat"
  | "check-circle"
  | "help"
  | "trash"
  | "upload-cloud"
  | "shield"
  | "receipt-text"
  | "layout"
  | "file-search"
  | "edit"
  | "arrow-down";

export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  const common = {
    className: cn("shrink-0", className),
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };

  switch (name) {
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M15 17H9" />
          <path d="M18 16v-4a6 6 0 10-12 0v4l-2 2h16z" />
          <path d="M10 21a2 2 0 004 0" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10.5V20h14v-9.5" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 7h14a3 3 0 013 3v7a3 3 0 01-3 3H7a3 3 0 01-3-3V7z" />
          <path d="M17 11h3" />
          <path d="M17 15h3" />
          <path d="M4 7l2-3h12v3" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M7 16v-5" />
          <path d="M12 16V8" />
          <path d="M17 16v-9" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a7.8 7.8 0 000-6l2-1.1-2-3.5-2.3 1a7.4 7.4 0 00-5.2-2.9l-.4-2.5h-4l-.4 2.5a7.4 7.4 0 00-5.2 2.9l-2.3-1-2 3.5 2 1.1a7.8 7.8 0 000 6l-2 1.1 2 3.5 2.3-1a7.4 7.4 0 005.2 2.9l.4 2.5h4l.4-2.5a7.4 7.4 0 005.2-2.9l2.3 1 2-3.5z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <path d="M7 3v4M17 3v4" />
          <path d="M4 8h16" />
          <path d="M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M4 5h16l-6.5 7v5l-3 2v-7z" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v11" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 20h16" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 21V10" />
          <path d="m7 15 5-5 5 5" />
          <path d="M4 4h16" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common}>
          <path d="m9 5 7 7-7 7" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...common}>
          <path d="m15 5-7 7 7 7" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...common}>
          <path d="M19 12H5" />
          <path d="m12 5-7 7 7 7" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6" />
          <path d="M12 7h.01" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path d="M12 3 2.5 20h19L12 3z" />
          <path d="M12 9v4" />
          <path d="M12 16h.01" />
        </svg>
      );
    case "bank":
      return (
        <svg {...common}>
          <path d="M3 10h18" />
          <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
          <path d="M4 18h16" />
          <path d="M4 7l8-4 8 4" />
        </svg>
      );
    case "receipt":
      return (
        <svg {...common}>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "money":
      return (
        <svg {...common}>
          <path d="M12 2v20" />
          <path d="M17 6.5a4 4 0 0 0-4-3.5H10a4 4 0 0 0 0 8h4a4 4 0 0 1 0 8h-3a4 4 0 0 1-4-3.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 20v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="8" r="3" />
          <path d="M22 20v-1a3 3 0 0 0-3-3h-1" />
          <path d="M16.5 4.5a3 3 0 0 1 0 6" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21h16" />
          <path d="M6 21V5h12v16" />
          <path d="M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v10H8l-4 4z" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="m8 5 10 7-10 7z" />
        </svg>
      );
    case "pause":
      return (
        <svg {...common}>
          <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7.1 0l1.9-1.9a5 5 0 1 0-7.1-7.1L11 5" />
          <path d="M14 11a5 5 0 0 0-7.1 0L5 12.9a5 5 0 1 0 7.1 7.1L13 19" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "eye-off":
      return (
        <svg {...common}>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2.5 2.5 0 103.53 3.53" />
          <path d="M9.9 5.4A10 10 0 0 1 22 12s-3.5 6-10 6a10 10 0 0 1-4.3-1" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <path d="M6 11V8a6 6 0 0 1 12 0v3" />
          <rect x="4" y="11" width="16" height="10" rx="2" />
        </svg>
      );
    case "smart":
      return (
        <svg {...common}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8 14a6 6 0 1 1 8 0c-.8.8-1.3 1.8-1.3 3H9.3c0-1.2-.5-2.2-1.3-3z" />
        </svg>
      );
    case "send":
      return (
        <svg {...common}>
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22l-4-9-9-4z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 7h11v10H3z" />
          <path d="M14 10h4l3 3v4h-7z" />
          <circle cx="7" cy="19" r="2" />
          <circle cx="18" cy="19" r="2" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M7 17 17 7" />
          <path d="M9 7h8v8" />
        </svg>
      );
    case "repeat":
      return (
        <svg {...common}>
          <path d="M17 1l4 4-4 4" />
          <path d="M7 7h10a4 4 0 0 1 4 4v2" />
          <path d="M7 23l-4-4 4-4" />
          <path d="M17 17H7a4 4 0 0 1-4-4v-2" />
        </svg>
      );
    case "check-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-1.5 2-2.1 2.8-.3.4-.4.8-.4 1.2" />
          <path d="M12 16h.01" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M6 7l1 13h10l1-13" />
          <path d="M9 7V4h6v3" />
        </svg>
      );
    case "upload-cloud":
      return (
        <svg {...common}>
          <path d="M16 16a4 4 0 0 0-1-7.8A6 6 0 1 0 6 14" />
          <path d="M12 12v8" />
          <path d="m8 16 4-4 4 4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
        </svg>
      );
    case "receipt-text":
      return (
        <svg {...common}>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
          <path d="M8 8h8M8 12h8M8 16h4" />
        </svg>
      );
    case "layout":
      return (
        <svg {...common}>
          <path d="M4 4h16v16H4z" />
          <path d="M4 9h16" />
          <path d="M9 9v11" />
        </svg>
      );
    case "file-search":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <circle cx="11" cy="14" r="2" />
          <path d="m15 18-2-2" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20h4l10-10-4-4L4 16z" />
          <path d="m13 7 4 4" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...common}>
          <path d="M12 5v14" />
          <path d="m5 12 7 7 7-7" />
        </svg>
      );
    default:
      return <svg {...common} />;
  }
}

export function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-5 w-5 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M21.35 11.1h-9.18v2.95h5.27c-.23 1.39-1.58 4.07-5.27 4.07-3.17 0-5.76-2.62-5.76-5.84s2.59-5.84 5.76-5.84c1.8 0 3.01.76 3.7 1.42l2.53-2.44C17.08 4.01 15.31 3 12.17 3 6.9 3 2.6 7.24 2.6 12.34s4.3 9.34 9.57 9.34c5.49 0 9.12-3.83 9.12-9.22 0-.62-.07-1.09-.18-1.36z" fill="#4285F4" />
      <path d="M3.62 7.75l2.99 2.2c.81-2.1 2.86-3.62 5.56-3.62 1.8 0 3.01.76 3.7 1.42l2.53-2.44C17.08 4.01 15.31 3 12.17 3 8.35 3 5.05 5.1 3.62 7.75z" fill="#EA4335" />
      <path d="M2.6 12.34c0 1.15.25 2.24.71 3.22l3.07-2.38a5.72 5.72 0 0 1-.02-.84c0-.28.02-.56.06-.84L2.6 9.12a9.3 9.3 0 0 0 0 3.22z" fill="#FBBC05" />
      <path d="M12.17 21.68c3.22 0 5.92-1.05 7.89-2.89l-3.64-2.89c-.98.67-2.19 1.07-3.98 1.07-3.05 0-5.59-2.03-6.5-4.74l-3.07 2.38c1.7 3.44 5.25 7.07 9.3 7.07z" fill="#34A853" />
    </svg>
  );
}
