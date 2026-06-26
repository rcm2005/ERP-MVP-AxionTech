import Link from "next/link";
import {
  Badge,
  Button,
  FieldGroup,
  HelperText,
  Input,
  Label,
  Select,
} from "@erp/ui";
import { Icon } from "@/components/icons";
import { brand } from "@/lib/mock-data";

const plans = [
  {
    name: "Workspace beta",
    tone: "info" as const,
    desc: "Fluxo guiado para provar valor operacional rápido.",
  },
  {
    name: "Financeiro core",
    tone: "neutral" as const,
    desc: "Contas, documentos e conciliação no mesmo loop.",
  },
  {
    name: "Assistido por IA",
    tone: "aria" as const,
    desc: "Copilot contextual para reduzir retrabalho, não inflar escopo.",
  },
];

export default function CadastroPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-text">
          Crie sua conta
        </h2>
        <p className="mt-1 text-sm text-muted">
          Configure o mínimo necessário para validar o núcleo financeiro-fiscal do produto.
        </p>
      </div>

      {/* Plan selector */}
      <div className="grid grid-cols-3 gap-2">
        {plans.map((plan) => (
          <div
            className="cursor-pointer rounded-lg border border-outline/20 bg-surfaceLow p-3 transition-colors hover:border-secondary/30 hover:bg-secondary/4"
            key={plan.name}
          >
            <Badge variant={plan.tone}>{plan.name}</Badge>
            <p className="mt-2 text-xs leading-4 text-muted">{plan.desc}</p>
          </div>
        ))}
      </div>

      <form className="space-y-4">
        {/* CNPJ */}
        <FieldGroup>
          <Label htmlFor="cnpj">CNPJ</Label>
          <div className="flex gap-2">
            <Input id="cnpj" placeholder="00.000.000/0001-00" />
            <Button variant="secondary" type="button" className="flex-shrink-0">
              <Icon name="search" className="h-4 w-4" />
              Buscar
            </Button>
          </div>
        </FieldGroup>

        {/* Razão social + Segmento */}
        <div className="grid grid-cols-2 gap-3">
          <FieldGroup>
            <Label htmlFor="razao-social">Razão social</Label>
            <Input id="razao-social" placeholder={brand.legalName} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="segmento">Segmento</Label>
            <Select id="segmento" defaultValue="">
              <option value="">Selecione</option>
              <option value="servicos">Serviços</option>
              <option value="comercio">Comércio</option>
              <option value="industria">Indústria</option>
              <option value="saas">Tecnologia / SaaS</option>
            </Select>
          </FieldGroup>
        </div>

        {/* Email + Senha */}
        <div className="grid grid-cols-2 gap-3">
          <FieldGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" placeholder="contato@empresa.com.br" type="email" />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" placeholder="Crie uma senha forte" type="password" />
          </FieldGroup>
        </div>

        {/* Verification notice */}
        <div className="flex items-start gap-2.5 rounded-lg bg-surfaceLow px-3 py-3">
          <Icon name="calendar" className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
          <HelperText>
            Após o cadastro, o onboarding prepara empresa, fiscal, banco e primeiro documento para o loop operacional inicial.
          </HelperText>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between gap-4">
          <HelperText>
            Ao continuar, você concorda com os termos de uso do workspace beta.
          </HelperText>
          <Button size="lg" type="submit" className="flex-shrink-0">
            Continuar
          </Button>
        </div>
      </form>

      <p className="text-sm text-muted">
        Já tem conta?{" "}
        <Link className="font-semibold text-secondary hover:underline" href="/login">
          Voltar para o login
        </Link>
      </p>
    </div>
  );
}
