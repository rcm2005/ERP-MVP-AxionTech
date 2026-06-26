"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  FieldGroup,
  HelperText,
  Input,
  Label,
  SurfacePanel,
  Textarea,
} from "@erp/ui";
import { Icon } from "./icons";
import { onboardingSteps } from "@/lib/mock-data";
import { cn } from "@erp/ui";
import { useDemoWorkspace } from "@/lib/demo-workspace";

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
  const router = useRouter();
  const [step, setStep] = useState(0);
  const onboarding = useDemoWorkspace((state) => state.onboarding);
  const updateOnboarding = useDemoWorkspace((state) => state.updateOnboarding);

  useEffect(() => {
    setStep(onboarding.currentStep);
  }, [onboarding.currentStep]);

  const active = onboardingSteps[step];
  const activeFields = stepFields[step];

  function updateField(fieldId: string, value: string) {
    if (fieldId === "razaoSocial") {
      updateOnboarding({ legalName: value });
      return;
    }

    if (fieldId === "segmento") {
      updateOnboarding({ segment: value });
      return;
    }

    if (fieldId === "funcionarios") {
      updateOnboarding({ employees: value });
      return;
    }

    if (fieldId === "regime") {
      updateOnboarding({ fiscalRegime: value });
      return;
    }

    if (fieldId === "cnae") {
      updateOnboarding({ cnae: value });
      return;
    }

    if (fieldId === "certificado") {
      updateOnboarding({ certificate: value });
      return;
    }

    if (fieldId === "modulos") {
      updateOnboarding({ moduleFocus: value });
      return;
    }

    if (fieldId === "banco") {
      updateOnboarding({ bankName: value });
      return;
    }

    if (fieldId === "agencia") {
      updateOnboarding({ bankAgency: value });
      return;
    }

    if (fieldId === "conta") {
      updateOnboarding({ bankAccount: value });
      return;
    }

    if (fieldId === "arquivo") {
      updateOnboarding({ firstImportFile: value });
      return;
    }

    if (fieldId === "notas") {
      updateOnboarding({ notes: value });
      return;
    }
  }

  function getFieldValue(fieldId: string) {
    if (fieldId === "razaoSocial") return onboarding.profile.legalName;
    if (fieldId === "segmento") return onboarding.profile.segment;
    if (fieldId === "funcionarios") return onboarding.profile.employees;
    if (fieldId === "regime") return onboarding.profile.fiscalRegime;
    if (fieldId === "cnae") return onboarding.profile.cnae;
    if (fieldId === "certificado") return onboarding.profile.certificate;
    if (fieldId === "banco") return onboarding.bankName;
    if (fieldId === "agencia") return onboarding.bankAgency;
    if (fieldId === "conta") return onboarding.bankAccount;
    if (fieldId === "arquivo") return onboarding.firstImportFile;
    if (fieldId === "modulos") return onboarding.moduleFocus;
    if (fieldId === "notas") return onboarding.notes;

    return "";
  }

  function advanceStep() {
    if (step === stepFields.length - 1) {
      updateOnboarding({
        currentStep: step,
        completedStep: step,
      });
      router.push("/dashboard");
      return;
    }

    const nextStep = Math.min(stepFields.length - 1, step + 1);
    setStep(nextStep);
    updateOnboarding({
      currentStep: nextStep,
      completedStep: step,
    });
  }

  return (
    <SurfacePanel className="overflow-hidden p-0" tone="base">
      <div className="border-b border-outline/10 bg-surfaceLow px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Passo {step + 1} de 5
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-text">
              {active.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{active.description}</p>
          </div>
          <Badge variant="aria">Aria guiando</Badge>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {onboardingSteps.map((item, index) => (
            <button
              className={cn(
                "rounded-md py-1.5 text-[11px] font-semibold transition-all",
                index === step
                  ? "bg-secondary text-white"
                  : index < step
                    ? "bg-secondary/10 text-secondary"
                    : "bg-surfaceHigh text-muted",
              )}
              key={item.label}
              onClick={() => {
                setStep(index);
                updateOnboarding({ currentStep: index });
              }}
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-6 px-6 py-5">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {activeFields.fields.map((field) => (
              <FieldGroup
                className={field.id === "notas" || field.id === "arquivo" ? "col-span-2" : ""}
                key={field.id}
              >
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.id === "notas" ? (
                  <Textarea
                    id={field.id}
                    onChange={(event) => updateField(field.id, event.target.value)}
                    placeholder={field.placeholder}
                    value={getFieldValue(field.id)}
                  />
                ) : (
                  <Input
                    id={field.id}
                    onChange={(event) => updateField(field.id, event.target.value)}
                    placeholder={field.placeholder}
                    value={getFieldValue(field.id)}
                  />
                )}
              </FieldGroup>
            ))}
          </div>

          <div className="rounded-lg bg-surfaceLow p-3">
            <div className="flex items-center gap-2">
              <Icon name="sparkles" className="h-4 w-4 text-secondary" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                Dica da Aria
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-text">
              {step === 0 && "Use o CNPJ para preencher a empresa e reduzir retrabalho."}
              {step === 1 && "Deixe claro o regime fiscal e o certificado para evitar ambiguidade operacional."}
              {step === 2 && "O banco certo cedo significa conciliação menos frágil depois."}
              {step === 3 && "O primeiro documento importado é o que transforma demo em operação."}
              {step === 4 && "Ative só o que reduz retrabalho agora: financeiro, documentos e conciliação."}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              disabled={step === 0}
              onClick={() => {
                const previous = Math.max(0, step - 1);
                setStep(previous);
                updateOnboarding({ currentStep: previous });
              }}
              variant="ghost"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <HelperText>
                Meta: sair do onboarding com um primeiro loop operacional definido.
              </HelperText>
              <Button
                onClick={advanceStep}
                type="button"
              >
                {step === stepFields.length - 1 ? "Finalizar" : "Próximo passo"}
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <SurfacePanel className="p-4" tone="glass">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Resumo atual
            </p>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-surfaceLow p-3">
                <p className="text-xs font-semibold text-text">Empresa</p>
                <p className="mt-0.5 text-xs text-muted">{onboarding.profile.legalName}</p>
              </div>
              <div className="rounded-lg bg-surfaceLow p-3">
                <p className="text-xs font-semibold text-text">Regime</p>
                <p className="mt-0.5 text-xs text-muted">{onboarding.profile.fiscalRegime}</p>
              </div>
              <div className="rounded-lg bg-surfaceLow p-3">
                <p className="text-xs font-semibold text-text">Primeiro objetivo</p>
                <p className="mt-0.5 text-xs text-muted">
                  {onboarding.profile.activationGoal}
                </p>
              </div>
            </div>
          </SurfacePanel>

          <SurfacePanel className="p-4" tone="base">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Configuração guiada
            </p>
            <div className="mt-3 space-y-1.5">
              {onboardingSteps.map((item, index) => (
                <div
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-2.5",
                    index === step ? "bg-surfaceHigh" : "bg-surfaceLow",
                  )}
                  key={item.label}
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-secondary text-[11px] font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text">{item.label}</p>
                    <p className="text-[11px] leading-4 text-muted">{item.description}</p>
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
