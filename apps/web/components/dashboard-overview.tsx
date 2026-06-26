"use client";

import { Badge, KpiCard, SectionHeader, SurfacePanel } from "@erp/ui";
import { useShallow } from "zustand/react/shallow";
import { QuickActionBar } from "@/components/shells";
import { Icon } from "@/components/icons";
import {
  formatCurrencyFromCents,
  selectWorkspaceSnapshot,
  useDemoWorkspace,
} from "@/lib/demo-workspace";

export function DashboardOverview() {
  const company = useDemoWorkspace((state) => state.company);
  const alerts = useDemoWorkspace((state) => state.alerts);
  const snapshot = useDemoWorkspace(useShallow(selectWorkspaceSnapshot));

  const recentMoves = [
    {
      label: `${snapshot.readyDocuments} documento(s) pronto(s) para lançamento`,
      value: "Inbox operacional",
      tone: "success" as const,
    },
    {
      label: `${snapshot.pendingMatches} conciliação(ões) pendente(s)`,
      value: "Feche o caixa com confirmação humana",
      tone: "warning" as const,
    },
    {
      label: `${snapshot.confirmedMatches} match(es) confirmado(s)`,
      value: "Trilha auditável ativa",
      tone: "info" as const,
    },
  ];

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Financeiro-fiscal assistido"
        title="Visão operacional"
        description={`Bom dia, ${company.tradeName}. Entrada de documentos, lançamentos e conciliação no mesmo fluxo operacional.`}
      />

      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Saldo em caixa"
          value={formatCurrencyFromCents(snapshot.saldoCents)}
          delta="visão consolidada"
          deltaTone="success"
          footer="Leitura operacional atual"
        />
        <KpiCard
          label="A pagar 7d"
          value={formatCurrencyFromCents(snapshot.contasPagar7dCents)}
          delta={`${snapshot.pendingMatches} match(es) aguardando`}
          deltaTone="warning"
          footer="Priorize pagamentos críticos"
        />
        <KpiCard
          label="A receber 7d"
          value={formatCurrencyFromCents(snapshot.contasReceber7dCents)}
          delta={`${snapshot.readyDocuments} documento(s) pronto(s)`}
          deltaTone="info"
          footer="Documentos podem virar cobrança"
        />
        <KpiCard
          label="Inadimplência"
          value={`${snapshot.inadimplenciaPercent.toFixed(1)}%`}
          delta="carteira monitorada"
          deltaTone={snapshot.inadimplenciaPercent > 15 ? "danger" : "success"}
          footer="Baseada nos títulos abertos"
        />
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-4">
        <SurfacePanel className="p-5" tone="base">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                Loop operacional
              </p>
              <h2 className="mt-1 text-lg font-bold tracking-tight text-text">
                Da captura do documento ao caixa conciliado
              </h2>
            </div>
            <Badge variant="aria">Horizonte Ops</Badge>
          </div>

          <div className="mt-4 rounded-lg bg-surfaceLow p-4">
            <p className="text-sm leading-6 text-text">
              O foco agora não é parecer um ERP completo. O foco é encurtar o
              caminho entre documento, lançamento e decisão financeira.
            </p>
            <div className="mt-3 flex gap-2">
              <Badge variant="neutral">Inbox de documentos</Badge>
              <Badge variant="info">Lançamentos auditáveis</Badge>
              <Badge variant="success">Conciliação assistida</Badge>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              {
                title: "1. Capturar",
                text: "Importe boleto, NF-e ou contrato e valide o contexto antes de agir.",
              },
              {
                title: "2. Lançar",
                text: "Transforme o documento em conta a pagar ou receber sem retrabalho.",
              },
              {
                title: "3. Conciliar",
                text: "Confirme o match bancário e registre a decisão com trilha operacional.",
              },
            ].map((step) => (
              <div className="rounded-lg bg-surfaceLow p-4" key={step.title}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-text">{step.text}</p>
              </div>
            ))}
          </div>
        </SurfacePanel>

        <div className="space-y-4">
          <SurfacePanel className="p-4" tone="base">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Alertas ativos
            </p>
            <div className="mt-3 space-y-2">
              {alerts.map((alert) => (
                <div
                  className="flex items-start justify-between gap-3 rounded-lg bg-surfaceLow p-3"
                  key={alert.id}
                >
                  <div>
                    <p className="text-xs font-semibold text-text">{alert.label}</p>
                    <p className="mt-0.5 text-xs leading-5 text-muted">{alert.text}</p>
                  </div>
                  <Badge
                    variant={
                      alert.tone === "danger"
                        ? "danger"
                        : alert.tone === "warning"
                          ? "warning"
                          : alert.tone === "success"
                            ? "success"
                            : "info"
                    }
                  >
                    {alert.label}
                  </Badge>
                </div>
              ))}
            </div>
          </SurfacePanel>

          <SurfacePanel className="p-4" tone="base">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              O que mudou
            </p>
            <div className="mt-3 space-y-1">
              {recentMoves.map((move) => (
                <div
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-surfaceLow"
                  key={move.label}
                >
                  <div>
                    <p className="text-xs font-semibold text-text">{move.label}</p>
                    <p className="text-[11px] text-muted">{move.value}</p>
                  </div>
                  <Icon
                    className={
                      move.tone === "success"
                        ? "h-3.5 w-3.5 text-success"
                        : move.tone === "warning"
                          ? "h-3.5 w-3.5 text-warning"
                          : "h-3.5 w-3.5 text-info"
                    }
                    name="arrow-up-right"
                  />
                </div>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </div>

      <QuickActionBar />

      <SurfacePanel className="p-5" tone="base">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Leitura do produto
            </p>
            <h2 className="mt-1 text-lg font-bold text-text">
              Núcleo vendável: financeiro, documentos e conciliação
            </h2>
          </div>
          <Badge variant="success">Wedge validado no app</Badge>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-surfaceLow p-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              ICP inicial
            </p>
            <p className="mt-1.5 text-sm font-semibold text-text">
              Financeiro/admin de PME com contador externo
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Dor principal
            </p>
            <p className="mt-1.5 text-sm font-semibold text-text">
              Fechar caixa e documentos sem planilha paralela
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Próxima prova
            </p>
            <p className="mt-1.5 text-sm font-semibold text-text">
              Operação semanal com documentos e conciliação reais
            </p>
          </div>
        </div>
      </SurfacePanel>
    </div>
  );
}
