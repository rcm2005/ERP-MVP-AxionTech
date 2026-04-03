import { Injectable, OnModuleDestroy, OnModuleInit } from "../nest-shim";
import { Job, Worker } from "../queue-shim";
import { QUEUE_NAMES } from "../queue-names";
import { buildWorkerTenantContext } from "../worker.context";
import { createAuditLogEntry, createLogger } from "@erp/logging";

@Injectable()
export class DocumentWorker implements OnModuleInit, OnModuleDestroy {
  private worker?: Worker;
  private readonly logger = createLogger("worker.document");

  onModuleInit() {
    this.worker = new Worker(
      QUEUE_NAMES.documentIntake,
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

    this.logger.info("document job received", {
      queue: job.name,
      companyId: context.companyId,
    });

    this.logger.info(
      "audit prepared",
      createAuditLogEntry({
        id: `audit_${Date.now()}`,
        companyId: context.companyId,
        userId: context.userId,
        requestId: context.requestId,
        origin: "worker",
        action: "process",
        entity: "document",
        params: job.data,
        resultStatus: "success",
      }),
    );

    return {
      ok: true,
      status: "queued_for_validation",
    };
  }
}
