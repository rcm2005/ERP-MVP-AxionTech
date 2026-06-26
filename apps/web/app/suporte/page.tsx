import { Badge, Button, SurfacePanel } from "@erp/ui";

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <SurfacePanel className="p-8" tone="base">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
          Suporte
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
          Canal de suporte para a fase beta
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
          <p>
            O suporte desta fase existe para acompanhar adoção do núcleo
            financeiro-fiscal e aprender com travas reais de onboarding,
            documentos e conciliação.
          </p>
          <div className="rounded-lg bg-surfaceLow p-4">
            <p className="text-sm font-semibold text-text">Fluxo recomendado</p>
            <p className="mt-2">
              1. Relate a etapa travada.
              <br />
              2. Envie qual documento ou lançamento gerou a dúvida.
              <br />
              3. Informe o impacto: ativação, caixa, conciliação ou compliance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info">Beta assistido</Badge>
            <Badge variant="success">Foco em feedback acionável</Badge>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button href="/login">Voltar ao login</Button>
          <Button href="/dashboard" variant="secondary">
            Abrir produto
          </Button>
        </div>
      </SurfacePanel>
    </main>
  );
}
