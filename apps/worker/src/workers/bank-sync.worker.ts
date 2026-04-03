import { Injectable, OnModuleDestroy, OnModuleInit } from "../nest-shim";
import { Job, Worker } from "../queue-shim";
import { QUEUE_NAMES } from "../queue-names";
import { buildWorkerTenantContext } from "../worker.context";
import { createLogger } from "@erp/logging";

@Injectable()
export class BankSyncWorker implements OnModuleInit, OnModuleDestroy {
  private worker?: Worker;
  private readonly logger = createLogger("worker.bank-sync");

  onModuleInit() {
    this.worker = new Worker(
      QUEUE_NAMES.bankSync,
      async (job: Job) => this.handle(job),
      {
        connection: {
          host: process.env.REDIS_HOST ?? "127.0.0.1",
          port: Number(process.env.REDIS_PORT ?? 6379),
        },
      },
    );
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }

  private async handle(job: Job) {
    const context = buildWorkerTenantContext({
      companyId: String(job.data?.companyId ?? "company_demo"),
      userId: String(job.data?.userId ?? "system"),
      requestId: String(job.data?.requestId ?? `job_${job.id ?? Date.now()}`),
    });

    this.logger.info("bank sync job received", {
      queue: job.name,
      companyId: context.companyId,
    });

    return {
      ok: true,
      syncedTransactions: 0,
      matchedTransactions: 0,
    };
  }
}
