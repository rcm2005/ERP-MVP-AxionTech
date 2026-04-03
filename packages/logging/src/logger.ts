export interface StructuredLogger {
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
  debug(message: string, meta?: unknown): void;
}

function write(level: string, message: string, meta?: unknown) {
  const payload = {
    level,
    message,
    meta: meta ?? {},
    timestamp: new Date().toISOString(),
  };

  const output = JSON.stringify(payload);
  if (level === "error") {
    console.error(output);
    return;
  }

  if (level === "warn") {
    console.warn(output);
    return;
  }

  console.log(output);
}

export function createLogger(scope: string): StructuredLogger {
  return {
    info(message, meta) {
      write("info", `[${scope}] ${message}`, meta);
    },
    warn(message, meta) {
      write("warn", `[${scope}] ${message}`, meta);
    },
    error(message, meta) {
      write("error", `[${scope}] ${message}`, meta);
    },
    debug(message, meta) {
      write("debug", `[${scope}] ${message}`, meta);
    },
  };
}
