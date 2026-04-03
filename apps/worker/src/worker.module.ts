import { AlertsWorker } from "./workers/alerts.worker";
import { AuditDispatchWorker } from "./workers/audit-dispatch.worker";
import { BankSyncWorker } from "./workers/bank-sync.worker";
import { DocumentWorker } from "./workers/document.worker";
import { Module } from "./nest-shim";

@Module({
  providers: [
    DocumentWorker,
    BankSyncWorker,
    AlertsWorker,
    AuditDispatchWorker,
  ],
})
export class WorkerModule {}
