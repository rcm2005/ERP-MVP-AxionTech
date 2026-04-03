export interface Job<T = any> {
  id?: string;
  name: string;
  data: T;
}

export interface WorkerOptions {
  connection?: Record<string, unknown>;
}

export class Worker<T = unknown> {
  constructor(
    public readonly queueName: string,
    public readonly handler: (job: Job<T>) => Promise<unknown>,
    public readonly options?: WorkerOptions,
  ) {}

  async close() {
    return undefined;
  }

  async simulate(job: Job<T>) {
    return this.handler(job);
  }
}
