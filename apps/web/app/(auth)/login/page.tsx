import Link from "next/link";
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

export default function LoginPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-text">
          Bem-vindo de volta
        </h2>
        <p className="mt-1 text-sm text-muted">
          Entre com Google ou e-mail para continuar.
        </p>
      </div>

      {/* Google SSO */}
      <Button className="w-full justify-center border border-outline/20 bg-white text-text shadow-sm hover:bg-surfaceLow">
        <GoogleMark />
        Entrar com Google
      </Button>

      <Divider />

      {/* Email/password form */}
      <form className="space-y-4">
        <FieldGroup>
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input id="email" placeholder="nome@empresa.com.br" type="email" />
        </FieldGroup>

        <FieldGroup>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link className="text-xs font-semibold text-secondary hover:underline" href="#">
              Esqueci minha senha
            </Link>
          </div>
          <div className="relative">
            <Input id="password" placeholder="••••••••" type="password" className="pr-10" />
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
            Acesso financeiro completo exige validação em dois fatores (TOTP / SMS).
          </HelperText>
        </div>

        <Button className="w-full" size="lg" type="submit">
          Acessar sistema
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
          <div className="flex items-start gap-2.5">
            <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-secondary" />
            <p className="text-xs leading-5 text-muted">
              Lockout após 5 tentativas, magic link e 2FA ativos para proteger os dados de{" "}
              <span className="font-medium text-text">{brand.legalName}</span>.
            </p>
          </div>
        </SurfacePanel>

        <div className="flex items-center gap-4 text-[11px] text-muted">
          <Link href="#" className="hover:text-text">Privacidade</Link>
          <Link href="#" className="hover:text-text">Termos</Link>
          <Link href="#" className="hover:text-text">Suporte</Link>
        </div>
      </div>
    </div>
  );
}
