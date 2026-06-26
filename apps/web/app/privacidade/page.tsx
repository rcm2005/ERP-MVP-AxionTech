import { Button, SurfacePanel } from "@erp/ui";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <SurfacePanel className="p-8" tone="base">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
          Privacidade
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
          Como tratamos dados no workspace beta
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
          <p>
            O foco atual do Horizonte é validar um fluxo financeiro-fiscal assistido
            para PMEs brasileiras. Durante esta fase beta, os dados utilizados no
            app podem incluir informações de demonstração e informações inseridas
            manualmente pelo usuário no próprio workspace.
          </p>
          <p>
            O produto foi reposicionado para priorizar documentos, lançamentos e
            conciliação. Isso significa que não coletamos intencionalmente dados
            além do que é necessário para operar esse núcleo e aprender com o uso.
          </p>
          <p>
            Antes da comercialização, a etapa obrigatória é endurecer autenticação,
            retenção de logs, política de acesso, exclusão de dados e governança de
            integrações externas.
          </p>
        </div>
        <div className="mt-6">
          <Button href="/login">Voltar ao login</Button>
        </div>
      </SurfacePanel>
    </main>
  );
}
