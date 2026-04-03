import Link from "next/link";
import {
  Badge,
  Button,
  Divider,
  FieldGroup,
  HelperText,
  Input,
  Label,
  SurfacePanel,
} from "@erp/ui";
import { GoogleMark, Icon } from "@/components/icons";
import { authHighlights, brand } from "@/lib/mock-data";

export default function LoginPage() {
  return (
    <SurfacePanel className="p-5 md:p-7" tone="base">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          Acesso seguro
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-text">
          Bem-vindo de volta
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Entre com Google ou e-mail para continuar a gestão da sua empresa.
        </p>
      </div>

      <div className="space-y-4">
        <Button className="w-full justify-center bg-white text-text shadow-soft hover:bg-surfaceLow">
          <GoogleMark />
          Entrar com Google
        </Button>
        <Divider />
        <div className="grid gap-3">
          {authHighlights.map((item) => (
            <div
              className="rounded-2xl bg-surfaceLow px-4 py-3"
              key={item.title}
            >
              <p className="text-sm font-bold text-text">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <form className="space-y-4 pt-2">
          <FieldGroup>
            <Label htmlFor="email">E-mail corporativo</Label>
            <Input id="email" placeholder="nome@empresa.com.br" type="email" />
          </FieldGroup>
          <FieldGroup>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link className="text-xs font-semibold text-secondary" href="#">
                Esqueci minha senha
              </Link>
            </div>
            <div className="relative">
              <Input id="password" placeholder="••••••••" type="password" />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                type="button"
              >
                <Icon name="eye" className="h-5 w-5" />
              </button>
            </div>
          </FieldGroup>

          <div className="grid gap-3 rounded-2xl bg-surfaceLow p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                2FA
              </span>
              <Badge variant="info">TOTP / SMS</Badge>
            </div>
            <HelperText>
              Após autenticar, o acesso financeiro completo exige validação em
              dois fatores.
            </HelperText>
          </div>

          <Button className="w-full" size="lg" type="submit">
            Acessar sistema
          </Button>
        </form>

        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
          <span>Privacidade</span>
          <span>Termos</span>
          <span>Suporte</span>
        </div>

        <p className="text-sm text-muted">
          Novo por aqui?{" "}
          <Link className="font-semibold text-secondary" href="/cadastro">
            Solicite uma demonstração
          </Link>
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-outline/35 bg-surfaceLow p-4">
        <div className="flex items-center gap-2">
          <Icon name="lock" className="h-4 w-4 text-secondary" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Segurança
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-text">
          Lockout após 5 tentativas, magic link e 2FA ativos para proteger os
          dados de {brand.legalName}.
        </p>
      </div>
    </SurfacePanel>
  );
}
