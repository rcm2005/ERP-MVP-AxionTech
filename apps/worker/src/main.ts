import { createLogger } from "@erp/logging";
import { NestFactory } from "./nest-shim";
import { WorkerModule } from "./worker.module";

async function bootstrap() {
  const logger = createLogger("worker.bootstrap");
  const app = await NestFactory.createApplicationContext(WorkerModule, {
    logger: ["error", "warn", "log", "debug"],
  });

  logger.info("worker ready", {
    pid: process.pid,
  });

  const shutdown = async () => {
    await app.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

void bootstrap();
