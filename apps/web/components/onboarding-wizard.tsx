"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  FieldGroup,
  HelperText,
  Input,
  Label,
  Select,
  SurfacePanel,
  Textarea,
} from "@erp/ui";
import { Icon } from "./icons";
import { onboardingSteps } from "@/lib/mock-data";
import { cn } from "@erp/ui";

const stepFields = [
  {
    title: "Perfil da empresa",
    fields: [
      { id: "razaoSocial", label: "Razão social", placeholder: "Empresa Exemplo Ltda" },
      { id: "segmento", label: "Segmento", placeholder: "Serviços / Tecnologia" },
      { id: "funcionarios", label: "Número de funcionários", placeholder: "12" },
    ],
  },
  {
    title: "Regime fiscal",
    fields: [
      { id: "regime", label: "Regime", placeholder: "Simples Nacional" },
      { id: "cnae", label: "CNAE principal", placeholder: "6201-5/01" },
      { id: "certificado", label: "Certificado digital", placeholder: "A1 / A3" },
    ],
  },
  {
    title: "Conta bancária",
    fields: [
      { id: "banco", label: "Banco", placeholder: "Banco do Brasil" },
      { id: "agencia", label: "Agência", placeholder: "1234" },
      { id: "conta", label: "Conta", placeholder: "000123-4" },
    ],
  },
  {
    title: "Dados iniciais",
    fields: [
      { id: "arquivo", label: "Arquivo CP/CR", placeholder: "importar-planilha.xlsx" },
    ],
  },
  {
    title: "Módulos ativos",
    fields: [
      { id: "modulos", label: "Módulos prioritários", placeholder: "Financeiro, Documentos, BI" },
      { id: "notas", label: "Observações", placeholder: "O que a Aria precisa considerar?" },
    ],
  },
] as const;

export function OnboardingWizard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("onboarding-step");
    if (!stored) return;

    const parsed = Number(stored);
    if (Number.isFinite(parsed) && parsed >= 0 && parsed < stepFields.length) {
      setStep(parsed);
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("onboarding-step", String(step));
  }, [step]);

  const active = onboardingSteps[step];
  const activeFields = stepFields[step];

  return (
    <SurfacePanel className="overflow-hidden p-0" tone="base">
      <div className="border-b border-outline/15 bg-surfaceLow px-5 py-4 md:px-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Passo {step + 1} de 5
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-text">
              {active.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">{active.description}</p>
          </div>
          <Badge variant="aria">Aria guiando</Badge>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {onboardingSteps.map((item, index) => (
            <button
              className={cn(
                "rounded-full py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all",
                index === step
                  ? "bg-secondary text-white"
                  : index < step
                    ? "bg-secondarySoft text-secondary"
                    : "bg-surfaceHigh text-muted",
              )}
              key={item.label}
              onClick={() => setStep(index)}
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 px-5 py-6 md:px-7 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {activeFields.fields.map((field) => (
              <FieldGroup
                className={field.id === "notas" || field.id === "arquivo" ? "md:col-span-2" : ""}
                key={field.id}
              >
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.id === "notas" ? (
                  <Textarea id={field.id} placeholder={field.placeholder} />
                ) : (
                  <Input id={field.id} placeholder={field.placeholder} />
                )}
              </FieldGroup>
            ))}
          </div>

          <div className="rounded-2xl bg-surfaceLow p-4">
            <div className="flex items-center gap-2">
              <Icon name="sparkles" className="h-4 w-4 text-secondary" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Dica da Aria
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-text">
              {step === 0 && "Use o CNPJ para preencher a empresa e reduzir retrabalho."}
              {step === 1 && "Se houver certificado digital, já deixe o caminho fiscal pronto."}
              {step === 2 && "A conciliação fica mais estável quando a conta bancária entra cedo."}
              {step === 3 && "Importe o primeiro CSV/XLSX para acelerar o time to value."}
              {step === 4 && "Aria sugere módulos com base em operação e urgência financeira."}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              disabled={step === 0}
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              variant="ghost"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <HelperText className="hidden md:block">
                Meta: concluir em menos de 30 minutos.
              </HelperText>
              <Button
                onClick={() => setStep((current) => Math.min(stepFields.length - 1, current + 1))}
                type="button"
              >
                {step === stepFields.length - 1 ? "Finalizar" : "Próximo passo"}
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <SurfacePanel className="p-5" tone="glass">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Resumo atual
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-surfaceLow p-4">
                <p className="text-sm font-bold text-text">Empresa</p>
                <p className="mt-1 text-sm text-muted">Empresa Exemplo Ltda</p>
              </div>
              <div className="rounded-2xl bg-surfaceLow p-4">
                <p className="text-sm font-bold text-text">Regime</p>
                <p className="mt-1 text-sm text-muted">Simples Nacional</p>
              </div>
              <div className="rounded-2xl bg-surfaceLow p-4">
                <p className="text-sm font-bold text-text">Primeiro objetivo</p>
                <p className="mt-1 text-sm text-muted">
                  Lançar a primeira operação e chegar ao dashboard em menos de
                  30 minutos.
                </p>
              </div>
            </div>
          </SurfacePanel>

          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Configuração guiada
            </p>
            <div className="mt-4 space-y-3">
              {onboardingSteps.map((item, index) => (
                <div
                  className={cn(
                    "flex items-start gap-3 rounded-2xl p-3",
                    index === step ? "bg-surfaceHigh" : "bg-surfaceLow",
                  )}
                  key={item.label}
                >
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </div>
    </SurfacePanel>
  );
}
