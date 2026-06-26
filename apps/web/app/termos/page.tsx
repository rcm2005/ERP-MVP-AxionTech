import { Button, SurfacePanel } from "@erp/ui";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <SurfacePanel className="p-8" tone="base">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
          Termos
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
          Uso permitido nesta fase do produto
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
          <p>
            O workspace atual tem objetivo de validação operacional. Ele ainda não
            deve ser tratado como ERP comercial completo nem como ambiente pronto
            para operação crítica sem supervisão humana.
          </p>
          <p>
            O uso recomendado nesta fase é para avaliação do fluxo de documentos,
            lançamentos, conciliação e suporte contextual por IA. Decisões
            financeiras definitivas continuam dependendo de revisão do usuário.
          </p>
          <p>
            O roadmap imediato inclui autenticação endurecida, trilha de auditoria
            mais forte, onboarding mensurável, documentação e preparação para venda
            assistida com parceiros contábeis.
          </p>
        </div>
        <div className="mt-6">
          <Button href="/login">Voltar ao login</Button>
        </div>
      </SurfacePanel>
    </main>
  );
}
