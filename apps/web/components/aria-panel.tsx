"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Badge, Button, Input } from "@erp/ui";
import { Icon } from "./icons";
import { ariaQuickChips } from "@/lib/mock-data";
import { cn } from "@erp/ui";

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
      return ["Ver vencimentos", "Sinalizar risco", "Atualizar previsão"];
    }

    if (pathname.includes("/documentos")) {
      return ["Validar NF-e", "Extrair boleto", "Revisar pendências"];
    }

    return ariaQuickChips;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: `Contexto capturado: ${screen}. Posso agir com base nos dados dessa tela.`,
          meta: "Contexto da tela",
        },
      ]);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [open, screen]);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
      {
        role: "assistant",
        text: "🔍 Buscando dados financeiros e preparando a próxima ação.",
        meta: "Tool call: buscar_dados_financeiros",
      },
    ]);

    setStreaming(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current.filter((entry) => entry.meta !== "streaming"),
        {
          role: "assistant",
          text: "Achei 3 itens prioritários. Quer que eu abra a visão detalhada ou monte um resumo executivo?",
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
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-aria-gradient text-white shadow-[0_24px_50px_rgba(79,70,229,0.26)] transition-transform hover:scale-105 md:bottom-6 md:right-6",
          open ? "scale-95 ring-2 ring-white/60" : "",
        )}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Icon name={open ? "x" : "smart"} className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed bottom-20 right-5 z-50 w-[min(92vw,400px)] overflow-hidden rounded-[1.5rem] border border-white/40 bg-surface/90 shadow-[0_30px_70px_rgba(11,28,48,0.16)] backdrop-blur-xl transition-all duration-300 md:bottom-24 md:right-6",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <div className="aria-gradient px-4 py-4 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/75">
                Aria
              </p>
              <h3 className="text-lg font-black">Copilot ativo</h3>
            </div>
            <Badge className="bg-white/20 text-white" variant="neutral">
              {screen}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-white/80">
            Contexto da tela injetado automaticamente. Ações financeiras exigem
            confirmação explícita.
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
