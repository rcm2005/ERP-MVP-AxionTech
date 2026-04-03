export type ClassDecoratorFactory = ClassDecorator;
export type MethodDecoratorFactory = MethodDecorator;
export type ParameterDecoratorFactory = ParameterDecorator;

export interface MessageEvent {
  data: unknown;
  event?: string;
  id?: string;
}

export interface PipeTransform {
  transform(value: unknown): unknown;
}

export class BadRequestException extends Error {
  constructor(public readonly response?: unknown) {
    super("Bad Request");
  }
}

export function Controller(_path?: string): ClassDecorator {
  return () => undefined;
}

export function Get(_path?: string): MethodDecorator {
  return () => undefined;
}

export function Post(_path?: string): MethodDecorator {
  return () => undefined;
}

export function Sse(_path?: string): MethodDecorator {
  return () => undefined;
}

export function Body(_pipe?: unknown): ParameterDecorator {
  return () => undefined;
}

export function Query(_pipe?: unknown): ParameterDecorator {
  return () => undefined;
}

export function Headers(_name?: string): ParameterDecorator {
  return () => undefined;
}

export function Param(_name?: string): ParameterDecorator {
  return () => undefined;
}

export function Module(_metadata: { controllers?: unknown[]; providers?: unknown[] }): ClassDecorator {
  return () => undefined;
}

export function Injectable(): ClassDecorator {
  return () => undefined;
}

export class ValidationPipe implements PipeTransform {
  constructor(private readonly _options?: Record<string, unknown>) {}

  transform(value: unknown) {
    return value;
  }
}

export class ApplicationRef {
  enableCors(_options?: Record<string, unknown>) {
    return undefined;
  }

  useGlobalPipes(_pipe: PipeTransform) {
    return undefined;
  }

  async listen(_port: number) {
    return undefined;
  }
}

export class ApplicationContext {
  async close() {
    return undefined;
  }
}

export const NestFactory = {
  async create(_module: unknown, _options?: Record<string, unknown>) {
    return new ApplicationRef();
  },
  async createApplicationContext(_module: unknown, _options?: Record<string, unknown>) {
    return new ApplicationContext();
  },
};
