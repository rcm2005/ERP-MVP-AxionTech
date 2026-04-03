import { PrismaClient } from '@prisma/client';

type GlobalDbCache = typeof globalThis & {
  __erp_db__?: PrismaClient;
};

export interface CreateDbClientOptions {
  datasource_url?: string;
  log_level?: Array<'query' | 'info' | 'warn' | 'error'>;
}

export function create_db_client(options: CreateDbClientOptions = {}): PrismaClient {
  const default_log_level: Array<'query' | 'info' | 'warn' | 'error'> =
    process.env.NODE_ENV === 'development'
      ? ['query', 'warn', 'error']
      : ['error'];

  return new PrismaClient({
    datasources: options.datasource_url
      ? { db: { url: options.datasource_url } }
      : undefined,
    log: options.log_level ?? default_log_level,
  });
}

const global_for_db = globalThis as GlobalDbCache;

export const db = global_for_db.__erp_db__ ?? create_db_client();

if (process.env.NODE_ENV !== 'production') {
  global_for_db.__erp_db__ = db;
}

export async function close_db_client(): Promise<void> {
  await db.$disconnect();
}
