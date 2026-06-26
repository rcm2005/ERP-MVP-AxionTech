"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Badge, Button, Input } from "@erp/ui";
import { useShallow } from "zustand/react/shallow";
import { Icon } from "./icons";
import { cn } from "@erp/ui";
import {
  formatCurrencyFromCents,
  selectWorkspaceSnapshot,
  useDemoWorkspace,
} from "@/lib/demo-workspace";

type Message = {
  role: "user" | "assistant";
  text: string;
  meta?: string;
};

const screenMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/financeiro/pagar": "Contas a Pagar",
  "/financeiro/receber": "Contas a Receber",
  "/financeiro/fluxo-caixa": "Fluxo de Caixa",
  "/financeiro/conciliacao": "Conciliação Bancária",
  "/documentos/inbox": "Inbox de Documentos",
  "/documentos/nfe": "Processador de NF-e",
  "/documentos/boletos": "Leitor de Boletos",
};

export function AriaPanel() {
  const pathname = usePathname();
  const screen = screenMap[pathname] ?? "Tela atual";
  const snapshot = useDemoWorkspace(useShallow(selectWorkspaceSnapshot));
  const company = useDemoWorkspace((state) => state.company);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Posso te ajudar a revisar caixa, conciliação e documentos sem sair da tela.",
      meta: "Sessão ativa",
    },
  ]);

  const suggestedChips = useMemo(() => {
    if (pathname.includes("/financeiro")) {
      return ["Ver vencimentos", "Revisar caixa", "Abrir conciliação"];
    }

    if (pathname.includes("/documentos")) {
      return ["Lançar documento", "Revisar pendências", "Abrir contas"];
    }

    return ["Ver caixa", "Próximo passo", "Resumo do dia"];
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: `Contexto capturado: ${screen}. ${company.tradeName} tem ${snapshot.pendingMatches} conciliações pendentes e ${snapshot.readyDocuments} documento(s) pronto(s) para lançamento.`,
          meta: "Contexto da tela",
        },
      ]);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [company.tradeName, open, screen, snapshot.pendingMatches, snapshot.readyDocuments]);

  function buildReply(text: string) {
    const normalized = text.toLowerCase();

    if (normalized.includes("caixa")) {
      return `Saldo operacional de referência: ${formatCurrencyFromCents(snapshot.saldoCents)}, com ${snapshot.pendingMatches} match(es) ainda influenciando a leitura.`;
    }

    if (normalized.includes("concil")) {
      return `Hoje o gargalo mais claro é a conciliação: ${snapshot.pendingMatches} item(ns) aguardando confirmação antes do fechamento.`;
    }

    if (normalized.includes("document")) {
      return `O inbox já tem ${snapshot.readyDocuments} documento(s) validado(s). O próximo ganho real vem de transformá-los em lançamento.`;
    }

    return "Posso te ajudar a decidir o próximo passo entre inbox, lançamentos e conciliação.";
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
      {
        role: "assistant",
        text: "Buscando contexto operacional e organizando a próxima ação.",
        meta: "Leitura do workspace",
      },
    ]);

    setStreaming(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current.filter((entry) => entry.meta !== "streaming"),
        {
          role: "assistant",
          text: buildReply(text),
          meta: "Resposta pronta",
        },
      ]);
      setStreaming(false);
    }, 1400);
  }

  return (
    <>
      <button
        aria-label="Abrir Aria"
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-aria-gradient text-white shadow-[0_12px_32px_rgba(79,70,229,0.30)] transition-all hover:scale-105 hover:shadow-[0_16px_40px_rgba(79,70,229,0.38)]",
          open ? "scale-95 ring-2 ring-white/60" : "",
        )}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Icon name={open ? "x" : "smart"} className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed bottom-20 right-5 z-50 w-[380px] overflow-hidden rounded-xl border border-outline/15 bg-surface shadow-[0_20px_60px_rgba(11,28,48,0.18)] transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <div className="aria-gradient px-4 py-3 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                Aria Copilot
              </p>
              <h3 className="text-sm font-bold">Contexto ativo</h3>
            </div>
            <Badge className="bg-white/20 text-white" variant="neutral">
              {screen}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-white/80">
            Contexto operacional injetado automaticamente. Ações financeiras
            seguem assistidas e exigem confirmação explícita.
          </p>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex flex-wrap gap-2">
            {suggestedChips.map((chip) => (
              <button
                className="rounded-full bg-surfaceHigh px-3 py-1.5 text-[11px] font-semibold text-text transition-colors hover:bg-surfaceHighest"
                key={chip}
                type="button"
                onClick={() => sendMessage(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="max-h-[320px] space-y-3 overflow-auto pr-1 no-scrollbar">
            {messages.map((message, index) => (
              <div
                className={cn(
                  "rounded-2xl px-3 py-2 text-sm leading-6",
                  message.role === "assistant"
                    ? "bg-surfaceLow text-text"
                    : "ml-auto max-w-[84%] bg-primary text-white",
                )}
                key={`${message.role}-${index}-${message.text}`}
              >
                <p>{message.text}</p>
                {message.meta ? (
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted/80">
                    {message.meta}
                  </p>
                ) : null}
              </div>
            ))}
            {streaming ? (
              <div className="rounded-2xl bg-surfaceLow px-3 py-2 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-aria" />
              Tool call em andamento
            </span>
          </div>
            ) : null}
          </div>

          <div className="space-y-3">
            <Input
              placeholder="Pergunte sobre caixa, cobranças ou documentos..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendMessage(input);
                  setInput("");
                }
              }}
            />
            <div className="flex items-center gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  sendMessage(input);
                  setInput("");
                }}
                size="md"
              >
                <Icon name="send" className="h-4 w-4" />
                Enviar
              </Button>
              <Button
                className="shrink-0"
                onClick={() => setMessages(messages.slice(0, 1))}
                size="md"
                variant="ghost"
              >
                Limpar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
