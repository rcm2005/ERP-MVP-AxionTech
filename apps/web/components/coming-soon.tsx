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
    <SurfacePanel className="p-8" tone="base">
      <div className="max-w-xl">
        <div className="flex items-center gap-2">
          <Icon name="sparkles" className="h-4 w-4 text-secondary" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            Em breve
          </p>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-text">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        <div className="mt-6 flex gap-3">
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
