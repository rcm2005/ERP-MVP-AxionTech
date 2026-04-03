import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import type { Prisma } from '@prisma/client';
import { db } from './client.js';

export interface TenantContextInput {
  company_id: string;
  user_id: string;
  request_id?: string;
}

export interface TenantContext {
  company_id: string;
  user_id: string;
  request_id: string;
}

export type TenantTransaction = Prisma.TransactionClient;

const tenant_storage = new AsyncLocalStorage<TenantContext>();

export function get_tenant_context(): TenantContext | undefined {
  return tenant_storage.getStore();
}

export async function runWithTenantContext<T>(
  context_input: TenantContextInput,
  callback: (tx: TenantTransaction, context: TenantContext) => Promise<T>,
  client = db,
): Promise<T> {
  const context: TenantContext = {
    company_id: context_input.company_id,
    user_id: context_input.user_id,
    request_id: context_input.request_id ?? randomUUID(),
  };

  return tenant_storage.run(context, async () => {
    return client.$transaction(async (tx) => {
      await tx.$executeRaw`
        select set_config('app.current_company_id', ${context.company_id}, true);
      `;
      await tx.$executeRaw`
        select set_config('app.current_user_id', ${context.user_id}, true);
      `;
      await tx.$executeRaw`
        select set_config('app.request_id', ${context.request_id}, true);
      `;

      return callback(tx, context);
    });
  });
}
