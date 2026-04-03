# Horizonte ERP MVP

ERP para PMEs brasileiras com copilot nativo Aria, implementado como monorepo `pnpm`.

## Workspace

- `apps/web`: Next.js 14 App Router
- `apps/api`: NestJS REST + SSE
- `apps/worker`: NestJS + BullMQ
- `packages/ui`: design system e componentes compartilhados
- `packages/contracts`: contratos Zod e tipos de dominio
- `packages/db`: Prisma, RLS, seeds e helpers tenant-aware
- `packages/auth`: RBAC, 2FA e utilitarios de autenticacao
- `packages/config`: schema de env e branding
- `packages/logging`: audit log e logger estruturado
- `packages/testkit`: fixtures, factories e helpers de teste

## Primeiro corte

O release inicial entrega as telas 01 a 08 do Stitch:

- Login
- Cadastro
- Onboarding
- Dashboard
- Contas a Pagar
- Contas a Receber
- Fluxo de Caixa
- Conciliacao Bancaria

## Rodando localmente

1. Copie `.env.example` para `.env`.
2. Suba a infraestrutura com `docker compose up -d`.
3. Instale dependencias com `pnpm install`.
4. Gere o client Prisma com `pnpm db:generate`.
5. Rode `pnpm dev`.
