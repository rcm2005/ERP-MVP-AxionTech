import {
  OnboardingStepPayload,
  OnboardingStepPayloadSchema,
  OnboardingWizardStateSchema,
} from "@erp/contracts";
import { ZodValidationPipe } from "./common/zod-validation.pipe";
import { Body, Controller, Get, Post } from "./nest-shim";

@Controller("onboarding")
export class OnboardingController {
  @Get("state")
  getState() {
    return OnboardingWizardStateSchema.parse({
      companyId: "company_demo",
      currentStep: "perfil_empresa",
      completedSteps: [],
    });
  }

  @Post("step")
  saveStep(
    @Body(new ZodValidationPipe(OnboardingStepPayloadSchema))
    payload: OnboardingStepPayload,
  ) {
    return {
      ok: true,
      step: payload.step,
      nextStep:
        payload.step === "modulos_ativos" ? "complete" : "next_pending",
    };
  }

  @Post("finish")
  finishWizard() {
    return {
      ok: true,
      onboardingCompleted: true,
      redirectTo: "/dashboard",
    };
  }
}
