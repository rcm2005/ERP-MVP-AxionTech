import { Badge, KpiCard, SectionHeader, SurfacePanel } from "@erp/ui";
import { QuickActionBar } from "@/components/shells";
import { Icon } from "@/components/icons";
import { alerts, dashboardKpis } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

const recentMoves = [
  { label: "NF-e 4592 lançada", value: "Hoje, 09:12", tone: "success" as const },
  { label: "Conciliação pendente", value: "2 itens", tone: "warning" as const },
  { label: "Cobrança automática", value: "3 reminders enviados", tone: "info" as const },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Visão geral"
        title="Bom dia, Horizonte"
        description="Panorama atual da operação financeira da empresa."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {dashboardKpis.map((item) => (
          <KpiCard
            delta={item.delta}
            deltaTone={item.deltaTone}
            footer={item.footer}
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        {/* Insight do dia */}
        <SurfacePanel className="p-5" tone="base">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                Insight do dia
              </p>
              <h2 className="mt-1 text-lg font-bold tracking-tight text-text">
                Aria alerta: revise três boletos vencendo hoje
              </h2>
            </div>
            <Badge variant="danger">Crítico</Badge>
          </div>

          <div className="mt-4 rounded-lg bg-surfaceLow p-4">
            <p className="text-sm leading-6 text-text">
              O caixa atual cobre o CP dos próximos 7 dias, mas a concentração de
              vencimentos hoje pode apertar a margem amanhã.
            </p>
            <div className="mt-3 flex gap-2">
              <Badge variant="neutral">Ver boletos</Badge>
              <Badge variant="info">Abrir conciliação</Badge>
              <Badge variant="aria">Ouvir Aria</Badge>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-surfaceLow p-4">
            <svg className="h-36 w-full" viewBox="0 0 720 180">
              <path
                d="M20 120 C 120 100, 160 75, 250 88 S 390 150, 480 92 S 620 56, 700 70"
                fill="none"
                stroke="#006c49"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M20 108 C 120 86, 160 64, 250 82 S 390 140, 480 80 S 620 46, 700 58"
                fill="none"
                stroke="#7c3aed"
                strokeDasharray="6 5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </SurfacePanel>

        {/* Right column */}
        <div className="space-y-4">
          <SurfacePanel className="p-4" tone="base">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Alertas ativos
            </p>
            <div className="mt-3 space-y-2">
              {alerts.map((alert) => (
                <div
                  className="flex items-start justify-between gap-3 rounded-lg bg-surfaceLow p-3"
                  key={alert.text}
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
                          : "success"
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
              Movimentos recentes
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

      {/* Quick actions */}
      <QuickActionBar />

      {/* Caixa projetado */}
      <SurfacePanel className="p-5" tone="base">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Caixa projetado
            </p>
            <h2 className="mt-1 text-lg font-bold text-text">30 dias em foco</h2>
          </div>
          <Badge variant="success">+12,4% vs. realizado</Badge>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-surfaceLow p-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Caixa inicial
            </p>
            <p className="mt-1.5 text-xl font-bold text-text">
              {formatCurrency(142580)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              CP 7 dias
            </p>
            <p className="mt-1.5 text-xl font-bold text-danger">
              {formatCurrency(12450)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              CR 7 dias
            </p>
            <p className="mt-1.5 text-xl font-bold text-success">
              {formatCurrency(48900)}
            </p>
          </div>
        </div>
      </SurfacePanel>
    </div>
  );
}
