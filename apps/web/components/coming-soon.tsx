import { Button, SurfacePanel } from "@erp/ui";
import { Icon } from "./icons";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <SurfacePanel className="p-6 md:p-8" tone="base">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2">
          <Icon name="sparkles" className="h-4 w-4 text-secondary" />
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
            Expansão futura
          </p>
        </div>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-text">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/dashboard">
            <Icon name="arrow-left" className="h-4 w-4" />
            Voltar ao dashboard
          </Button>
          <Button href="/financeiro/pagar" variant="secondary">
            Ver financeiro
          </Button>
        </div>
      </div>
    </SurfacePanel>
  );
}
