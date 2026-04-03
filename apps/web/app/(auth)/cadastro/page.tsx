import Link from "next/link";
import {
  Badge,
  Button,
  FieldGroup,
  HelperText,
  Input,
  Label,
  Select,
  SurfacePanel,
} from "@erp/ui";
import { Icon } from "@/components/icons";
import { brand } from "@/lib/mock-data";

const plans = [
  { name: "Trial 14 dias", tone: "info" as const },
  { name: "Starter", tone: "neutral" as const },
  { name: "Pro", tone: "aria" as const },
];

export default function CadastroPage() {
  return (
    <SurfacePanel className="p-5 md:p-7" tone="base">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          Cadastro
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-text">
          Crie a empresa e comece com o plano certo
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          O cadastro já prepara a base para onboarding, Open Finance e o
          primeiro uso do ERP.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              className="rounded-2xl border border-outline/20 bg-surfaceLow p-4"
              key={plan.name}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-text">{plan.name}</p>
                <Badge variant={plan.tone}>{plan.name}</Badge>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">
                {plan.name === "Trial 14 dias"
                  ? "Sem cobrança inicial e com o onboarding guiado."
                  : "Inclui módulos financeiros, documentos e Aria."}
              </p>
            </div>
          ))}
        </div>

        <FieldGroup>
          <Label htmlFor="cnpj">CNPJ</Label>
          <div className="flex gap-3">
            <Input id="cnpj" placeholder="00.000.000/0001-00" />
            <Button variant="secondary" type="button">
              <Icon name="search" className="h-4 w-4" />
              Buscar
            </Button>
          </div>
        </FieldGroup>

        <div className="grid gap-4 md:grid-cols-2">
          <FieldGroup>
            <Label htmlFor="razao-social">Razão social</Label>
            <Input id="razao-social" placeholder={brand.legalName} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="segmento">Segmento</Label>
            <Select id="segmento" defaultValue="">
              <option value="">Selecione um segmento</option>
              <option value="servicos">Serviços</option>
              <option value="comercio">Comércio</option>
              <option value="industria">Indústria</option>
              <option value="saas">Tecnologia / SaaS</option>
            </Select>
          </FieldGroup>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FieldGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" placeholder="contato@empresa.com.br" type="email" />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" placeholder="Crie uma senha forte" type="password" />
          </FieldGroup>
        </div>

        <div className="rounded-2xl bg-surfaceLow p-4">
          <div className="flex items-center gap-2">
            <Icon name="calendar" className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
              Verificação
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-text">
            Depois do cadastro, vamos validar o e-mail e preparar o wizard com
            as configurações fiscais iniciais.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <HelperText>
            Ao continuar, você concorda com a configuração inicial da empresa e
            a geração da primeira base de dados.
          </HelperText>
          <Button size="lg" type="submit">
            Continuar cadastro
          </Button>
        </div>

        <p className="text-sm text-muted">
          Já tem conta?{" "}
          <Link className="font-semibold text-secondary" href="/login">
            Voltar para o login
          </Link>
        </p>
      </div>
    </SurfacePanel>
  );
}
