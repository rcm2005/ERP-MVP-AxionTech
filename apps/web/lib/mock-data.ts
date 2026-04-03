import { brandTokens } from "@erp/ui";

export const brand = {
  ...brandTokens.brand,
  legalName: "Empresa Exemplo Ltda",
  cnpj: "12.345.678/0001-90",
  cnpjMasked: "**.***.***/0001-90",
  plan: "Trial 14 dias",
  segment: "Serviços / Tecnologia",
};

export const authHighlights = [
  {
    title: "OAuth Google como fluxo principal",
    text: "Login mais rápido para equipes enxutas e onboarding sem fricção.",
  },
  {
    title: "2FA e lockout progressivo",
    text: "TOTP e bloqueio por tentativas protegem o acesso financeiro.",
  },
  {
    title: "Magic link",
    text: "Recuperação segura com link de uso único por e-mail.",
  },
];

export const onboardingSteps = [
  {
    label: "Perfil da empresa",
    title: "Complete os dados do CNPJ e da operação",
    description: "Razão social, segmento e número de pessoas no time.",
  },
  {
    label: "Regime fiscal",
    title: "Ajuste o regime e a base fiscal",
    description: "Simples, Presumido ou Real, com CNAE e certificado digital.",
  },
  {
    label: "Conta bancária",
    title: "Conecte Open Finance ou insira os dados manualmente",
    description: "Use Pluggy/Belvo ou cadastre a conta para iniciar a conciliação.",
  },
  {
    label: "Dados iniciais",
    title: "Importe CP/CR em planilha ou comece do zero",
    description: "A primeira operação deve caber em menos de 30 minutos.",
  },
  {
    label: "Módulos ativos",
    title: "Ative os módulos que fazem sentido agora",
    description: "Aria sugere a melhor configuração a partir do perfil da empresa.",
  },
] as const;

export const dashboardKpis = [
  {
    label: "Saldo em caixa",
    value: "R$ 142.580,00",
    delta: "+4,2%",
    footer: "Atualizado agora",
    deltaTone: "success" as const,
  },
  {
    label: "A pagar 7d",
    value: "R$ 12.450,00",
    delta: "3 vencimentos",
    footer: "Prazo crítico",
    deltaTone: "warning" as const,
  },
  {
    label: "A receber 7d",
    value: "R$ 48.900,00",
    delta: "85% confirmado",
    footer: "Cobranças em curso",
    deltaTone: "success" as const,
  },
  {
    label: "Inadimplência",
    value: "3,8%",
    delta: "abaixo da média",
    footer: "Base histórica",
    deltaTone: "info" as const,
  },
];

export const alerts = [
  {
    tone: "danger" as const,
    label: "Crítico",
    text: "3 boletos vencem hoje e pressionam o caixa de amanhã.",
  },
  {
    tone: "warning" as const,
    label: "Atenção",
    text: "2 conciliações aguardam confirmação manual.",
  },
  {
    tone: "success" as const,
    label: "OK",
    text: "Cobranças recorrentes estão em dia e com baixa perda.",
  },
];

export const quickActions = [
  { label: "Nova NF-e", icon: "receipt" as const, href: "/documentos/nfe" },
  { label: "Nova Cobrança", icon: "money" as const, href: "/financeiro/receber" },
  { label: "Novo Pedido", icon: "truck" as const, href: "/crm/cotacoes" },
];

export const apRows = [
  {
    supplier: "Amazon Web Services",
    doc: "NF #982210",
    due: "Hoje, 14 Jun",
    category: "Infraestrutura",
    costCenter: "TI",
    status: "Pendente",
    value: "R$ 12.440,00",
  },
  {
    supplier: "Posto Shell",
    doc: "NF #4502",
    due: "Amanhã",
    category: "Operacional",
    costCenter: "Logistica",
    status: "A vencer",
    value: "R$ 250,00",
  },
  {
    supplier: "Softplan",
    doc: "Contrato 2049",
    due: "18 Jun",
    category: "Software",
    costCenter: "Financeiro",
    status: "Programado",
    value: "R$ 8.720,00",
  },
];

export const arRows = [
  {
    client: "Grupo Horizonte",
    doc: "Fatura #4592",
    due: "Hoje, 14 Jun",
    score: "92%",
    scoreTone: "success" as const,
    status: "Em cobrança",
    value: "R$ 19.700,00",
  },
  {
    client: "Comex Sul",
    doc: "Fatura #4610",
    due: "17 Jun",
    score: "71%",
    scoreTone: "warning" as const,
    status: "Vencendo",
    value: "R$ 8.430,00",
  },
  {
    client: "Alpha Serviços",
    doc: "Fatura #4614",
    due: "20 Jun",
    score: "98%",
    scoreTone: "success" as const,
    status: "Confirmado",
    value: "R$ 20.770,00",
  },
];

export const cashflowItems = [
  { label: "Folha de pagamento", value: -42000 },
  { label: "Recebimentos projetados", value: 78000 },
  { label: "Impostos", value: -12600 },
  { label: "Assinaturas", value: -9200 },
];

export const conciliationCards = [
  {
    bank: "Posto de Gasolina Shell",
    amount: -250,
    date: "12 Jun 2026",
    suggestion: "Combustível - Frota A",
    confidence: 98,
    status: "Match sugerido",
  },
  {
    bank: "Amazon Web Services",
    amount: -1420.5,
    date: "11 Jun 2026",
    suggestion: "Múltiplos matches",
    confidence: 62,
    status: "Revisar manualmente",
  },
  {
    bank: "Recebimento Cliente Beta",
    amount: 9700,
    date: "10 Jun 2026",
    suggestion: "Cobrança faturada",
    confidence: 91,
    status: "Match sugerido",
  },
];

export const docsInbox = [
  { name: "NF-e 4592.xml", type: "NF-e", status: "Processando" },
  { name: "boleto_0901.pdf", type: "Boleto", status: "Validado" },
  { name: "contrato_201.pdf", type: "Contrato", status: "Pendente" },
  { name: "pedido_88.png", type: "Pedido", status: "Lançado" },
];

export const ariaQuickChips = [
  "Ver caixa",
  "Ajustar conciliação",
  "Ler NF-e",
  "Resumo do dia",
];

