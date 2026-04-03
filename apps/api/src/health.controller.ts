import { Controller, Get } from "./nest-shim";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      service: "api",
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
