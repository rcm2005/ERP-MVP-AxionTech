import { createLogger } from "@erp/logging";
import { AppModule } from "./app.module";
import { NestFactory, ValidationPipe } from "./nest-shim";

async function bootstrap() {
  const logger = createLogger("api.bootstrap");
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug"],
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);

  logger.info("api ready", { port });
}

void bootstrap();
