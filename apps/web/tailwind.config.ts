import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        surfaceLow: "var(--surface-low)",
        surfaceHigh: "var(--surface-high)",
        surfaceHighest: "var(--surface-highest)",
        primary: "var(--primary)",
        primaryForeground: "var(--primary-foreground)",
        secondary: "var(--secondary)",
        secondaryForeground: "var(--secondary-foreground)",
        secondarySoft: "var(--secondary-soft)",
        aria: "var(--aria)",
        ariaStart: "var(--aria-start)",
        ariaEnd: "var(--aria-end)",
        text: "var(--text)",
        muted: "var(--muted)",
        outline: "var(--outline)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(11, 28, 48, 0.08)",
        glow: "0 0 0 1px rgba(124, 58, 237, 0.14), 0 24px 50px rgba(79, 70, 229, 0.12)",
      },
      backgroundImage: {
        "aria-gradient": "linear-gradient(135deg, var(--aria-start) 0%, var(--aria-end) 100%)",
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(0,108,73,0.14), transparent 42%), radial-gradient(circle at 85% 15%, rgba(79,70,229,0.12), transparent 28%), linear-gradient(180deg, var(--background), #eef4ff 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
