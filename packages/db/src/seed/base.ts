import type { PrismaClient } from '@prisma/client';
import { seed_ids } from './constants.js';

type DbLike = PrismaClient;

const plan_seed_rows = [
  {
    id: seed_ids.plans.trial,
    code: 'trial',
    name: 'Trial 14 dias',
    description: 'Acesso completo por 14 dias para validar o fluxo inicial.',
    trial_days: 14,
    monthly_price_cents: 0,
    active: true,
  },
  {
    id: seed_ids.plans.starter,
    code: 'starter',
    name: 'Starter',
    description: 'Plano inicial para operacao enxuta.',
    trial_days: 0,
    monthly_price_cents: 39900,
    active: true,
  },
  {
    id: seed_ids.plans.pro,
    code: 'pro',
    name: 'Pro',
    description: 'Plano completo para operacao multi-equipe.',
    trial_days: 0,
    monthly_price_cents: 79900,
    active: true,
  },
] as const;

export async function seed_base(db: DbLike): Promise<void> {
  for (const row of plan_seed_rows) {
    await db.plan.upsert({
      where: { code: row.code },
      create: row,
      update: {
        name: row.name,
        description: row.description,
        trial_days: row.trial_days,
        monthly_price_cents: row.monthly_price_cents,
        active: row.active,
      },
    });
  }
}
