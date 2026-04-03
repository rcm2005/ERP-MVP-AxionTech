export interface OnModuleInit {
  onModuleInit(): void | Promise<void>;
}

export interface OnModuleDestroy {
  onModuleDestroy(): void | Promise<void>;
}

export function Injectable(): ClassDecorator {
  return () => undefined;
}

export function Module(_metadata: { providers?: unknown[] }): ClassDecorator {
  return () => undefined;
}

export class ApplicationContext {
  async close() {
    return undefined;
  }
}

export const NestFactory = {
  async createApplicationContext(_module: unknown, _options?: Record<string, unknown>) {
    return new ApplicationContext();
  },
};
