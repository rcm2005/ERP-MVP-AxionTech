"use client";

import type { FormEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Divider,
  FieldGroup,
  HelperText,
  Input,
  Label,
  SurfacePanel,
} from "@erp/ui";
import { GoogleMark, Icon } from "@/components/icons";
import { brand } from "@/lib/mock-data";
import {
  DEMO_TEST_EMAILS,
  DEMO_TEST_PASSWORD,
  set_demo_session_cookie,
  validate_demo_credentials,
} from "@/lib/auth/mock-auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [error_message, set_error_message] = useState<string | null>(null);
  const [is_submitting, set_is_submitting] = useState(false);
  const [is_ready, set_is_ready] = useState(false);

  useEffect(() => {
    set_is_ready(true);
  }, []);

  const handle_submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    set_error_message(null);

    if (!is_ready) {
      return;
    }

    if (!validate_demo_credentials(email, password)) {
      set_error_message(
        "E-mail ou senha inválidos. Use as credenciais de teste listadas abaixo.",
      );
      return;
    }

    set_is_submitting(true);
    set_demo_session_cookie();
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="space-y-5" data-login-ready={is_ready ? "true" : "false"}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-text">
          Bem-vindo de volta
        </h2>
        <p className="mt-1 text-sm text-muted">
          Entre no workspace beta focado em financeiro, documentos e conciliação.
        </p>
      </div>

      {/* Google SSO */}
      <Button
        className="w-full justify-center border border-outline/20 bg-white text-text shadow-sm hover:bg-surfaceLow"
        disabled
        title="Em breve"
      >
        <GoogleMark />
        Entrar com Google
        <span className="rounded-full bg-surfaceHigh px-2 py-0.5 text-[10px] font-semibold text-muted">
          Em breve
        </span>
      </Button>

      <Divider />

      {/* Email/password form */}
      <form className="space-y-4" onSubmit={handle_submit}>
        <FieldGroup>
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input
            autoComplete="email"
            id="email"
            onChange={(event) => set_email(event.target.value)}
            placeholder="nome@empresa.com.br"
            required
            type="email"
            value={email}
          />
        </FieldGroup>

        <FieldGroup>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link className="text-xs font-semibold text-secondary hover:underline" href="/suporte">
              Preciso de ajuda
            </Link>
          </div>
          <div className="relative">
            <Input
              autoComplete="current-password"
              className="pr-10"
              id="password"
              minLength={8}
              onChange={(event) => set_password(event.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={password}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              type="button"
            >
              <Icon name="eye" className="h-4 w-4" />
            </button>
          </div>
        </FieldGroup>

        {/* 2FA notice */}
        <div className="flex items-start gap-3 rounded-lg bg-surfaceLow px-3 py-3">
          <Icon name="lock" className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
          <HelperText>
            Em evolução: sessão persistente, 2FA real e trilha de acesso para endurecimento do produto.
          </HelperText>
        </div>

        {error_message ? (
          <div className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2">
            <p className="text-sm text-danger">{error_message}</p>
          </div>
        ) : null}

        <Button className="w-full" disabled={!is_ready || is_submitting} size="lg" type="submit">
          {is_submitting ? "Entrando..." : "Acessar sistema"}
        </Button>
      </form>

      {/* Footer */}
      <div className="space-y-3">
        <p className="text-sm text-muted">
          Novo por aqui?{" "}
          <Link className="font-semibold text-secondary hover:underline" href="/cadastro">
            Solicite uma demonstração
          </Link>
        </p>

        <SurfacePanel tone="low" className="px-3 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
            Acesso do workspace beta
          </p>
          <div className="mt-2 space-y-1.5 text-xs text-text">
            {DEMO_TEST_EMAILS.map((test_email) => (
              <p key={test_email}>{test_email}</p>
            ))}
            <p className="pt-1 text-muted">
              Senha de acesso temporária:{" "}
              <span className="font-semibold text-text">{DEMO_TEST_PASSWORD}</span>
            </p>
          </div>
        </SurfacePanel>

        <SurfacePanel tone="low" className="px-3 py-3">
          <div className="flex items-start gap-2.5">
            <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-secondary" />
            <p className="text-xs leading-5 text-muted">
              Prioridade atual: provar um loop operacional real. O próximo hardening inclui lockout, magic link e 2FA para proteger os dados de{" "}
              <span className="font-medium text-text">{brand.legalName}</span>.
            </p>
          </div>
        </SurfacePanel>

        <div className="flex items-center gap-4 text-[11px] text-muted">
          <Link href="/privacidade" className="hover:text-text">Privacidade</Link>
          <Link href="/termos" className="hover:text-text">Termos</Link>
          <Link href="/suporte" className="hover:text-text">Suporte</Link>
        </div>
      </div>
    </div>
  );
}
