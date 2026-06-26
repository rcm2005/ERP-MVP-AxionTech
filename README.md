# Horizonte

Monorepo de um produto focado em **financeiro, documentos e conciliação para PMEs brasileiras**.

> Status atual: **protótipo operacional do núcleo financeiro-fiscal**, com fluxo persistido no app web e base técnica pronta para endurecimento incremental.

---

## 1) O que este projeto entrega hoje

### Front-end (apps/web)
- Fluxos principais implementados em Next.js (App Router):
  - `/login`
  - `/cadastro`
  - `/onboarding`
  - `/dashboard`
  - `/financeiro/pagar`
  - `/financeiro/receber`
  - `/financeiro/fluxo-caixa`
  - `/financeiro/conciliacao`
  - `/documentos/inbox`
  - `/documentos/nfe`
  - `/documentos/boletos`
- `/privacidade`
- `/termos`
- `/suporte`

### Loop operacional já demonstrável
- Importar documento no inbox
- Transformar documento em lançamento
- Revisar contas a pagar/receber a partir do mesmo estado persistido
- Confirmar conciliações e ver impacto no dashboard/fluxo de caixa

### API (apps/api)
- Endpoints REST/SSE com contratos validados via Zod para a próxima fase de hardening:
  - `GET /health`
  - `POST /auth/login`
  - `POST /auth/magic-link`
  - `POST /auth/2fa/verify`
  - `GET /auth/me`
  - `GET /onboarding/state`
  - `POST /onboarding/step`
  - `POST /onboarding/finish`
  - `GET /dashboard/summary`
  - `GET /financeiro/kpis`
  - `GET /financeiro/pagar`
  - `GET /financeiro/receber`
  - `GET /financeiro/fluxo-caixa`
  - `GET /financeiro/conciliacao`
  - `POST /financeiro/lancamentos`
  - `POST /financeiro/conciliacao/:id/confirmar`
  - `POST /aria/chat`
  - `GET /aria/chat/stream` (SSE)

### Worker (apps/worker)
- Workers de fila estruturados para evolução futura:
  - `document-intake`
  - `bank-sync`
  - `alerts`
  - `audit-dispatch`

### Banco e domínio (packages/db)
- Schema Prisma com modelagem multi-tenant, financeiro, documentos, auditoria e Aria.
- Seeds:
  - base
  - demo

---

## 2) Estrutura do monorepo

- `apps/web` → Front-end Next.js 14
- `apps/api` → API Nest-style (stubs de framework para MVP)
- `apps/worker` → Worker Nest-style + filas
- `packages/ui` → Design system e componentes compartilhados
- `packages/contracts` → Schemas Zod e tipos de domínio
- `packages/db` → Prisma, seeds e SQL de RLS
- `packages/auth` → RBAC, 2FA e lockout
- `packages/config` → Validação de variáveis de ambiente
- `packages/logging` → Logger estruturado + audit log
- `packages/testkit` → Fixtures/factories para testes

---

## 3) Pré-requisitos

Instale antes:
- **Node.js 20+**
- **pnpm 10.8.1** (via Corepack)
- **Docker + Docker Compose**

Ativação recomendada do pnpm:

```bash
corepack enable
corepack prepare pnpm@10.8.1 --activate
```

---

## 4) Setup local (passo a passo completo)

No diretório raiz do repo:

```bash
cd /home/runner/work/ERP-MVP-AxionTech/ERP-MVP-AxionTech
```

### Passo 1) Variáveis de ambiente

```bash
cp .env.example .env
```

**Importante sobre portas**
- O `.env.example` define `NEXT_PUBLIC_API_URL=http://localhost:3333`
- A API sobe por padrão na porta `3001` se `PORT` não for definida

Para manter tudo consistente, adicione no `.env`:

```env
PORT=3333
```

### Passo 2) Infra local (Postgres, Redis, MinIO, Mailpit)

```bash
docker compose up -d
```

Serviços expostos:
- Postgres: `localhost:5432`
- Redis: `localhost:6379`
- MinIO API: `localhost:9000`
- MinIO Console: `localhost:9001`
- Mailpit SMTP: `localhost:1025`
- Mailpit UI: `http://localhost:8025`

### Passo 3) Dependências

```bash
pnpm install
```

### Passo 4) Prisma Client

```bash
pnpm db:generate
```

### Passo 5) Seed de dados

Escolha uma opção:

```bash
pnpm db:seed:base
```

```bash
pnpm db:seed:demo
```

### Passo 6) Subir o ambiente de desenvolvimento

```bash
pnpm dev
```

Esse comando sobe, em paralelo:
- Web
- API
- Worker

---

## 5) Como acessar e usar

Com `pnpm dev` rodando:

- Web: `http://localhost:3000`
- API healthcheck: `http://localhost:3333/health` (ou `3001` se não configurar `PORT`)

Fluxo recomendado para validar rapidamente:
1. Abrir `http://localhost:3000/login`
2. Ir para cadastro em `/cadastro`
3. Passar onboarding em `/onboarding`
4. Navegar no app principal:
   - `/dashboard`
   - `/financeiro/pagar`
   - `/financeiro/receber`
   - `/financeiro/fluxo-caixa`
   - `/financeiro/conciliacao`
5. Testar Aria no painel lateral da interface

---

## 6) Comandos principais

### Workspace (raiz)

```bash
pnpm dev
pnpm dev:web
pnpm dev:api
pnpm dev:worker
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm format
```

### Banco/Prisma

```bash
pnpm db:generate
pnpm db:validate
pnpm db:seed:base
pnpm db:seed:demo
```

---

## 7) Testes e qualidade

### CI do repositório
A pipeline atual executa:
- `pnpm install --frozen-lockfile=false`
- `pnpm lint`
- `pnpm typecheck`

### E2E (Playwright)
- Arquivo: `tests/e2e/smoke.spec.ts`
- Valida carregamento da tela de login e CTA principal

Rodar localmente:

```bash
pnpm test:e2e
```

---

## 8) Como a solução funciona (arquitetura resumida)

1. **Web (Next.js)** renderiza as jornadas ERP e experiência Aria.
2. **Contracts (Zod)** padronizam payloads e respostas entre módulos.
3. **API** concentra endpoints de auth, onboarding, dashboard, financeiro e Aria.
4. **Worker** processa tarefas assíncronas (documentos, alertas, conciliação/auditoria).
5. **DB (Prisma/Postgres)** modela entidades de domínio e base multi-tenant.
6. **Logging/Audit** mantém trilha estruturada para observabilidade e compliance.

---

## 9) Integrações previstas no `.env`

Variáveis já preparadas para evolução de integrações:
- Anthropic (`ANTHROPIC_API_KEY`)
- Focus NFe (`FOCUS_NFE_TOKEN`)
- Pluggy (`PLUGGY_CLIENT_ID`, `PLUGGY_CLIENT_SECRET`)
- SMTP/Mail
- S3/MinIO

No MVP, várias integrações ainda estão em modo stub/simulação.

---

## 10) Troubleshooting rápido

### `pnpm: command not found`
Use:

```bash
corepack enable
corepack prepare pnpm@10.8.1 --activate
```

### API fora da porta esperada
- Se front aponta para `3333`, configure `PORT=3333` no `.env`
- Sem isso, a API usa `3001`

### Infra não sobe
Verifique Docker e rode:

```bash
docker compose ps
docker compose logs -f
```

### Problemas no Prisma Client
Regere:

```bash
pnpm db:generate
```

---

## 11) Próximos passos sugeridos (produto/engenharia)

- Levar o loop do app web para persistência end-to-end em API/DB
- Substituir `nest-shim`/`queue-shim` por runtime completo quando iniciar hardening
- Consolidar autenticação real, sessões persistentes e trilha de acesso
- Expandir cobertura de testes unitários/integrados/E2E
- Validar o wedge comercial com PMEs e parceiros contábeis antes de reabrir escopo

---

## 12) Licença

Defina aqui a licença oficial do projeto (MIT, proprietária, etc.).
