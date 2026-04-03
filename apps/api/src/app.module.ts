import { AriaController } from "./aria.controller";
import { AuthController } from "./auth.controller";
import { DashboardController } from "./dashboard.controller";
import { FinanceiroController } from "./financeiro.controller";
import { HealthController } from "./health.controller";
import { OnboardingController } from "./onboarding.controller";
import { Module } from "./nest-shim";

@Module({
  controllers: [
    HealthController,
    AuthController,
    OnboardingController,
    DashboardController,
    FinanceiroController,
    AriaController,
  ],
})
export class AppModule {}
