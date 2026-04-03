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
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Visão geral"
        title="Bom dia, Horizonte"
        description="Aqui está o panorama atual da operação financeira da empresa."
      />

      <div className="grid gap-4 md:grid-cols-4">
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_380px]">
        <SurfacePanel className="p-5 md:p-6" tone="base">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Insight do dia
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-text">
                Aria alerta: revise três boletos vencendo hoje
              </h2>
            </div>
            <Badge variant="danger">Crítico</Badge>
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-surfaceLow p-5">
            <p className="max-w-3xl text-lg leading-8 text-text">
              O caixa atual cobre o CP dos próximos 7 dias, mas a concentração de
              vencimentos hoje pode apertar a margem amanhã.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="neutral">Ver boletos</Badge>
              <Badge variant="info">Abrir conciliação</Badge>
              <Badge variant="aria">Ouvir Aria</Badge>
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-surfaceLow p-4">
            <svg className="h-44 w-full" viewBox="0 0 720 180">
              <path
                d="M20 120 C 120 100, 160 75, 250 88 S 390 150, 480 92 S 620 56, 700 70"
                fill="none"
                stroke="#006c49"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M20 108 C 120 86, 160 64, 250 82 S 390 140, 480 80 S 620 46, 700 58"
                fill="none"
                stroke="#7c3aed"
                strokeDasharray="8 6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </SurfacePanel>

        <div className="space-y-4">
          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Alerta ativos
            </p>
            <div className="mt-4 space-y-3">
              {alerts.map((alert) => (
                <div
                  className="flex items-start justify-between gap-3 rounded-2xl bg-surfaceLow p-4"
                  key={alert.text}
                >
                  <div>
                    <p className="text-sm font-bold text-text">{alert.label}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{alert.text}</p>
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

          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Movimentos recentes
            </p>
            <div className="mt-4 space-y-3">
              {recentMoves.map((move) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-2xl bg-surfaceLow px-4 py-3"
                  key={move.label}
                >
                  <div>
                    <p className="text-sm font-bold text-text">{move.label}</p>
                    <p className="text-xs text-muted">{move.value}</p>
                  </div>
                  <Icon
                    className={
                      move.tone === "success"
                        ? "h-4 w-4 text-success"
                        : move.tone === "warning"
                          ? "h-4 w-4 text-warning"
                          : "h-4 w-4 text-info"
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
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Caixa projetado
            </p>
            <h2 className="mt-1 text-2xl font-black text-text">30 dias em foco</h2>
          </div>
          <Badge variant="success">+12,4% vs. realizado</Badge>
        </div>
        <div className="mt-4 rounded-[1.5rem] bg-surfaceLow p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                Caixa inicial
              </p>
              <p className="mt-1 text-2xl font-black text-text">
                {formatCurrency(142580)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                CP 7 dias
              </p>
              <p className="mt-1 text-2xl font-black text-text">
                {formatCurrency(12450)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                CR 7 dias
              </p>
              <p className="mt-1 text-2xl font-black text-text">
                {formatCurrency(48900)}
              </p>
            </div>
          </div>
        </div>
      </SurfacePanel>
    </div>
  );
}
