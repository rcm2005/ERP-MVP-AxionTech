import { Prisma } from '@prisma/client';
import type { PrismaClient } from '@prisma/client';
import { runWithTenantContext } from '../tenant.js';
import { seed_ids } from './constants.js';

type DbLike = PrismaClient;

export async function seed_demo(db: DbLike): Promise<void> {
  const admin_user = await db.user.upsert({
    where: { email: 'admin@empresaexemplo.com.br' },
    create: {
      id: seed_ids.users.admin,
      name: 'Marina Souza',
      email: 'admin@empresaexemplo.com.br',
      email_verified_at: new Date('2026-04-03T12:00:00.000Z'),
      password_hash: null,
      image_url: null,
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      two_factor_enabled: false,
      status: 'active',
    },
    update: {
      name: 'Marina Souza',
      email_verified_at: new Date('2026-04-03T12:00:00.000Z'),
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      status: 'active',
    },
  });

  const finance_user = await db.user.upsert({
    where: { email: 'financeiro@empresaexemplo.com.br' },
    create: {
      id: seed_ids.users.finance,
      name: 'Carlos Lima',
      email: 'financeiro@empresaexemplo.com.br',
      email_verified_at: new Date('2026-04-03T12:00:00.000Z'),
      password_hash: null,
      image_url: null,
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      two_factor_enabled: false,
      status: 'active',
    },
    update: {
      name: 'Carlos Lima',
      email_verified_at: new Date('2026-04-03T12:00:00.000Z'),
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      status: 'active',
    },
  });

  const sales_user = await db.user.upsert({
    where: { email: 'comercial@empresaexemplo.com.br' },
    create: {
      id: seed_ids.users.sales,
      name: 'Aline Ferreira',
      email: 'comercial@empresaexemplo.com.br',
      email_verified_at: new Date('2026-04-03T12:00:00.000Z'),
      password_hash: null,
      image_url: null,
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      two_factor_enabled: false,
      status: 'active',
    },
    update: {
      name: 'Aline Ferreira',
      email_verified_at: new Date('2026-04-03T12:00:00.000Z'),
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      status: 'active',
    },
  });

  const company = await db.company.upsert({
    where: { cnpj: '12345678000190' },
    create: {
      id: seed_ids.company,
      cnpj: '12345678000190',
      razao_social: 'Empresa Exemplo Ltda',
      nome_fantasia: 'Empresa Exemplo',
      plan_id: seed_ids.plans.pro,
      fiscal_regime: 'simples_nacional',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      status: 'active',
      cnae_codes: ['6201-5/01', '6311-9/00'],
    },
    update: {
      razao_social: 'Empresa Exemplo Ltda',
      nome_fantasia: 'Empresa Exemplo',
      plan_id: seed_ids.plans.pro,
      fiscal_regime: 'simples_nacional',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      status: 'active',
      cnae_codes: ['6201-5/01', '6311-9/00'],
    },
  });

  await runWithTenantContext(
    {
      company_id: company.id,
      user_id: admin_user.id,
      request_id: 'seed-demo',
    },
    async (tx) => {
      await tx.companyProfile.upsert({
        where: { company_id: company.id },
        create: {
          id: seed_ids.profile,
          company_id: company.id,
          segment: 'Tecnologia / SaaS',
          employee_count: 18,
          monthly_invoice_cents: 1200000,
          billing_email: 'financeiro@empresaexemplo.com.br',
          phone: '+55 11 99999-0000',
          address: {
            street: 'Av. Paulista',
            number: '1000',
            city: 'Sao Paulo',
            state: 'SP',
            zip_code: '01310-100',
          },
          notes: 'Tenant de demonstracao para o beta interno.',
        },
        update: {
          segment: 'Tecnologia / SaaS',
          employee_count: 18,
          monthly_invoice_cents: 1200000,
          billing_email: 'financeiro@empresaexemplo.com.br',
          phone: '+55 11 99999-0000',
          address: {
            street: 'Av. Paulista',
            number: '1000',
            city: 'Sao Paulo',
            state: 'SP',
            zip_code: '01310-100',
          },
          notes: 'Tenant de demonstracao para o beta interno.',
        },
      });

      await tx.companyFiscalSetting.upsert({
        where: { company_id: company.id },
        create: {
          id: seed_ids.fiscal_settings,
          company_id: company.id,
          fiscal_regime: 'simples_nacional',
          cnae_codes: ['6201-5/01', '6311-9/00'],
          certificate_type: 'a1',
          certificate_alias: 'Certificado Demo A1',
          certificate_valid_until: new Date('2027-04-03T00:00:00.000Z'),
          tax_environment: 'homologation',
          open_finance_enabled: true,
          sefaz_enabled: true,
          ibs_rate: new Prisma.Decimal('0.00'),
          cbs_rate: new Prisma.Decimal('0.00'),
        },
        update: {
          fiscal_regime: 'simples_nacional',
          cnae_codes: ['6201-5/01', '6311-9/00'],
          certificate_type: 'a1',
          certificate_alias: 'Certificado Demo A1',
          certificate_valid_until: new Date('2027-04-03T00:00:00.000Z'),
          tax_environment: 'homologation',
          open_finance_enabled: true,
          sefaz_enabled: true,
          ibs_rate: new Prisma.Decimal('0.00'),
          cbs_rate: new Prisma.Decimal('0.00'),
        },
      });

      await tx.companyMembership.upsert({
        where: {
          company_id_user_id: {
            company_id: company.id,
            user_id: admin_user.id,
          },
        },
        create: {
          company_id: company.id,
          user_id: admin_user.id,
          role: 'administrador',
          status: 'active',
          invited_at: new Date('2026-04-03T12:00:00.000Z'),
          accepted_at: new Date('2026-04-03T12:00:00.000Z'),
        },
        update: {
          role: 'administrador',
          status: 'active',
          accepted_at: new Date('2026-04-03T12:00:00.000Z'),
        },
      });

      await tx.companyMembership.upsert({
        where: {
          company_id_user_id: {
            company_id: company.id,
            user_id: finance_user.id,
          },
        },
        create: {
          company_id: company.id,
          user_id: finance_user.id,
          role: 'financeiro',
          status: 'active',
          invited_at: new Date('2026-04-03T12:00:00.000Z'),
          accepted_at: new Date('2026-04-03T12:00:00.000Z'),
        },
        update: {
          role: 'financeiro',
          status: 'active',
          accepted_at: new Date('2026-04-03T12:00:00.000Z'),
        },
      });

      await tx.companyMembership.upsert({
        where: {
          company_id_user_id: {
            company_id: company.id,
            user_id: sales_user.id,
          },
        },
        create: {
          company_id: company.id,
          user_id: sales_user.id,
          role: 'comercial',
          status: 'active',
          invited_at: new Date('2026-04-03T12:00:00.000Z'),
          accepted_at: new Date('2026-04-03T12:00:00.000Z'),
        },
        update: {
          role: 'comercial',
          status: 'active',
          accepted_at: new Date('2026-04-03T12:00:00.000Z'),
        },
      });

      for (const [key, id] of Object.entries(seed_ids.module_flags)) {
        const module_key = key as
          | 'financeiro'
          | 'documentos'
          | 'crm'
          | 'bi'
          | 'configuracoes'
          | 'aria';

        await tx.moduleFlag.upsert({
          where: {
            company_id_key: {
              company_id: company.id,
              key: module_key,
            },
          },
          create: {
            id,
            company_id: company.id,
            key: module_key,
            enabled: true,
            config: {},
          },
          update: {
            enabled: true,
            config: {},
          },
        });
      }

      await tx.contact.upsert({
        where: {
          company_id_document_number: {
            company_id: company.id,
            document_number: '98765432000109',
          },
        },
        create: {
          id: seed_ids.contacts.supplier,
          company_id: company.id,
          kind: 'supplier',
          document_number: '98765432000109',
          legal_name: 'Fornecedor Demo SA',
          trade_name: 'Fornecedor Demo',
          email: 'contato@fornecedordemo.com.br',
          phone: '+55 11 98888-0000',
          inadimplencia_score: new Prisma.Decimal('12.50'),
          notes: 'Fornecedor usado para CP.',
          metadata: {},
        },
        update: {
          legal_name: 'Fornecedor Demo SA',
          trade_name: 'Fornecedor Demo',
          email: 'contato@fornecedordemo.com.br',
          phone: '+55 11 98888-0000',
          inadimplencia_score: new Prisma.Decimal('12.50'),
          notes: 'Fornecedor usado para CP.',
          metadata: {},
        },
      });

      await tx.contact.upsert({
        where: {
          company_id_document_number: {
            company_id: company.id,
            document_number: '12345678000190',
          },
        },
        create: {
          id: seed_ids.contacts.customer,
          company_id: company.id,
          kind: 'customer',
          document_number: '12345678000190',
          legal_name: 'Cliente Demo LTDA',
          trade_name: 'Cliente Demo',
          email: 'financeiro@clientedemo.com.br',
          phone: '+55 11 97777-0000',
          inadimplencia_score: new Prisma.Decimal('4.20'),
          notes: 'Cliente usado para CR.',
          metadata: {},
        },
        update: {
          legal_name: 'Cliente Demo LTDA',
          trade_name: 'Cliente Demo',
          email: 'financeiro@clientedemo.com.br',
          phone: '+55 11 97777-0000',
          inadimplencia_score: new Prisma.Decimal('4.20'),
          notes: 'Cliente usado para CR.',
          metadata: {},
        },
      });

      await tx.category.upsert({
        where: {
          company_id_kind_name: {
            company_id: company.id,
            kind: 'expense',
            name: 'Infraestrutura',
          },
        },
        create: {
          id: seed_ids.categories.expense,
          company_id: company.id,
          kind: 'expense',
          name: 'Infraestrutura',
          active: true,
        },
        update: {
          active: true,
        },
      });

      await tx.category.upsert({
        where: {
          company_id_kind_name: {
            company_id: company.id,
            kind: 'revenue',
            name: 'Receita Recorrente',
          },
        },
        create: {
          id: seed_ids.categories.revenue,
          company_id: company.id,
          kind: 'revenue',
          name: 'Receita Recorrente',
          active: true,
        },
        update: {
          active: true,
        },
      });

      await tx.category.upsert({
        where: {
          company_id_kind_name: {
            company_id: company.id,
            kind: 'expense',
            name: 'Tributos',
          },
        },
        create: {
          id: seed_ids.categories.taxes,
          company_id: company.id,
          kind: 'expense',
          name: 'Tributos',
          active: true,
        },
        update: {
          active: true,
        },
      });

      await tx.costCenter.upsert({
        where: {
          company_id_code: {
            company_id: company.id,
            code: 'OPS',
          },
        },
        create: {
          id: seed_ids.cost_centers.operations,
          company_id: company.id,
          code: 'OPS',
          name: 'Operacoes',
          active: true,
        },
        update: {
          name: 'Operacoes',
          active: true,
        },
      });

      await tx.costCenter.upsert({
        where: {
          company_id_code: {
            company_id: company.id,
            code: 'COM',
          },
        },
        create: {
          id: seed_ids.cost_centers.commercial,
          company_id: company.id,
          code: 'COM',
          name: 'Comercial',
          active: true,
        },
        update: {
          name: 'Comercial',
          active: true,
        },
      });

      await tx.bankConnection.upsert({
        where: {
          company_id_provider_external_connection_id: {
            company_id: company.id,
            provider: 'manual',
            external_connection_id: 'demo-connection',
          },
        },
        create: {
          id: seed_ids.bank_connection,
          company_id: company.id,
          provider: 'manual',
          status: 'active',
          external_connection_id: 'demo-connection',
          consent_id: 'consent-demo',
          institution_name: 'Banco Demo',
          access_token_encrypted: null,
          refresh_token_encrypted: null,
          expires_at: new Date('2027-04-03T00:00:00.000Z'),
          last_synced_at: new Date('2026-04-03T12:00:00.000Z'),
          metadata: {},
        },
        update: {
          status: 'active',
          institution_name: 'Banco Demo',
          last_synced_at: new Date('2026-04-03T12:00:00.000Z'),
          metadata: {},
        },
      });

      await tx.bankAccount.upsert({
        where: {
          company_id_institution_name_account_number: {
            company_id: company.id,
            institution_name: 'Banco Demo',
            account_number: '123456-7',
          },
        },
        create: {
          id: seed_ids.bank_account,
          company_id: company.id,
          bank_connection_id: seed_ids.bank_connection,
          name: 'Conta Corrente Principal',
          institution_name: 'Banco Demo',
          branch_number: '0001',
          account_number: '123456-7',
          account_digit: '7',
          account_type: 'checking',
          currency: 'BRL',
          current_balance_cents: 14258000,
          is_primary: true,
          metadata: {},
        },
        update: {
          name: 'Conta Corrente Principal',
          current_balance_cents: 14258000,
          is_primary: true,
          metadata: {},
        },
      });

      await tx.lancamento.upsert({
        where: { id: seed_ids.lancamentos.pagar },
        create: {
          id: seed_ids.lancamentos.pagar,
          company_id: company.id,
          entry_type: 'pagar',
          description: 'Licenca de software e cloud',
          amount_cents: 1245000,
          due_date: new Date('2026-04-04T00:00:00.000Z'),
          status: 'pendente',
          contact_id: seed_ids.contacts.supplier,
          category_id: seed_ids.categories.expense,
          cost_center_id: seed_ids.cost_centers.operations,
          created_by_user_id: admin_user.id,
          source: 'seed',
          reference_number: 'NF-4029',
          notes: 'Conta de demostracao para CP.',
          metadata: {},
        },
        update: {
          amount_cents: 1245000,
          status: 'pendente',
          notes: 'Conta de demostracao para CP.',
          metadata: {},
        },
      });

      await tx.lancamento.upsert({
        where: { id: seed_ids.lancamentos.receber },
        create: {
          id: seed_ids.lancamentos.receber,
          company_id: company.id,
          entry_type: 'receber',
          description: 'Contrato recorrente demo',
          amount_cents: 4890000,
          due_date: new Date('2026-04-10T00:00:00.000Z'),
          status: 'pendente',
          contact_id: seed_ids.contacts.customer,
          category_id: seed_ids.categories.revenue,
          cost_center_id: seed_ids.cost_centers.commercial,
          created_by_user_id: sales_user.id,
          source: 'seed',
          reference_number: 'CR-2026-0410',
          notes: 'Conta de demostracao para CR.',
          metadata: {},
        },
        update: {
          amount_cents: 4890000,
          status: 'pendente',
          notes: 'Conta de demostracao para CR.',
          metadata: {},
        },
      });

      await tx.cashflowSnapshot.upsert({
        where: {
          company_id_snapshot_date_horizon_days: {
            company_id: company.id,
            snapshot_date: new Date('2026-04-03T00:00:00.000Z'),
            horizon_days: 30,
          },
        },
        create: {
          id: seed_ids.cashflow_snapshot,
          company_id: company.id,
          snapshot_date: new Date('2026-04-03T00:00:00.000Z'),
          horizon_days: 30,
          realized_balance_cents: 14258000,
          projected_balance_cents: 15124000,
          details: {
            biggest_risk: 'Licenca de software e cloud',
            projected_inflow_cents: 4890000,
          },
        },
        update: {
          realized_balance_cents: 14258000,
          projected_balance_cents: 15124000,
          details: {
            biggest_risk: 'Licenca de software e cloud',
            projected_inflow_cents: 4890000,
          },
        },
      });

      await tx.bankTransaction.upsert({
        where: {
          company_id_bank_account_id_external_id: {
            company_id: company.id,
            bank_account_id: seed_ids.bank_account,
            external_id: 'txn-demo-001',
          },
        },
        create: {
          id: seed_ids.bank_transaction,
          company_id: company.id,
          bank_account_id: seed_ids.bank_account,
          external_id: 'txn-demo-001',
          occurred_at: new Date('2026-04-03T12:00:00.000Z'),
          description: 'Posto de Gasolina Shell',
          amount_cents: -25000,
          direction: 'debit',
          status: 'imported',
          metadata: {},
        },
        update: {
          amount_cents: -25000,
          status: 'imported',
          metadata: {},
        },
      });

      await tx.reconciliationMatch.upsert({
        where: { bank_transaction_id: seed_ids.bank_transaction },
        create: {
          id: seed_ids.reconciliation_match,
          company_id: company.id,
          bank_transaction_id: seed_ids.bank_transaction,
          lancamento_id: seed_ids.lancamentos.pagar,
          status: 'suggested',
          confidence: new Prisma.Decimal('98.00'),
          matched_by_user_id: null,
          matched_at: null,
          notes: 'Sugestao automatica para conciliacao.',
          metadata: {},
        },
        update: {
          status: 'suggested',
          confidence: new Prisma.Decimal('98.00'),
          notes: 'Sugestao automatica para conciliacao.',
          metadata: {},
        },
      });

      await tx.document.upsert({
        where: {
          company_id_original_hash: {
            company_id: company.id,
            original_hash: 'demo-nfe-xml-hash',
          },
        },
        create: {
          id: seed_ids.document,
          company_id: company.id,
          document_type: 'nfe',
          status: 'validado',
          source: 'upload',
          file_url: 's3://demo/documents/nfe.xml',
          file_name: 'nfe-demo.xml',
          mime_type: 'application/xml',
          original_hash: 'demo-nfe-xml-hash',
          extracted_data: {
            chave_nfe: '35190412345678000190550010000000011000000010',
            valor_total_cents: 1245000,
          },
          validation_summary: {
            sefaz: true,
            cnpj: true,
            po_divergencia_percentual: 0,
          },
          posted_lancamento: {
            connect: {
              id: seed_ids.lancamentos.pagar,
            },
          },
          uploaded_by_user_id: admin_user.id,
          processed_at: new Date('2026-04-03T12:00:00.000Z'),
          error_messages: [],
        },
        update: {
          status: 'validado',
          extracted_data: {
            chave_nfe: '35190412345678000190550010000000011000000010',
            valor_total_cents: 1245000,
          },
          validation_summary: {
            sefaz: true,
            cnpj: true,
            po_divergencia_percentual: 0,
          },
          processed_at: new Date('2026-04-03T12:00:00.000Z'),
          error_messages: [],
        },
      });

      await tx.documentExtraction.upsert({
        where: { id: seed_ids.document_extraction },
        create: {
          id: seed_ids.document_extraction,
          company_id: company.id,
          document_id: seed_ids.document,
          extraction_model: 'demo-parser-v1',
          raw_text: 'NF-e demo extraida com sucesso.',
          structured_data: {
            valor_total_cents: 1245000,
            emitente: 'Fornecedor Demo SA',
          },
          confidence: new Prisma.Decimal('99.50'),
        },
        update: {
          raw_text: 'NF-e demo extraida com sucesso.',
          structured_data: {
            valor_total_cents: 1245000,
            emitente: 'Fornecedor Demo SA',
          },
          confidence: new Prisma.Decimal('99.50'),
        },
      });

      await tx.documentValidation.upsert({
        where: { id: seed_ids.document_validation },
        create: {
          id: seed_ids.document_validation,
          company_id: company.id,
          document_id: seed_ids.document,
          validation_type: 'sefaz',
          status: 'approved',
          message: 'Documento autorizado e consistente.',
          metadata: {},
        },
        update: {
          status: 'approved',
          message: 'Documento autorizado e consistente.',
          metadata: {},
        },
      });

      const conversation = await tx.conversation.upsert({
        where: { id: seed_ids.conversation },
        create: {
          id: seed_ids.conversation,
          company_id: company.id,
          user_id: admin_user.id,
          context_screen: 'dashboard',
          memory_enabled: false,
          title: 'Conversa inicial da Aria',
          last_message_at: new Date('2026-04-03T12:00:00.000Z'),
        },
        update: {
          context_screen: 'dashboard',
          last_message_at: new Date('2026-04-03T12:00:00.000Z'),
        },
      });

      await tx.conversationMessage.upsert({
        where: { id: seed_ids.conversation_message_user },
        create: {
          id: seed_ids.conversation_message_user,
          company_id: company.id,
          conversation_id: conversation.id,
          role: 'user',
          content: {
            text: 'Quais boletos vencem hoje?',
          },
          created_by_user_id: admin_user.id,
          metadata: {},
        },
        update: {
          content: {
            text: 'Quais boletos vencem hoje?',
          },
          metadata: {},
        },
      });

      await tx.conversationMessage.upsert({
        where: { id: seed_ids.conversation_message_assistant },
        create: {
          id: seed_ids.conversation_message_assistant,
          company_id: company.id,
          conversation_id: conversation.id,
          role: 'assistant',
          content: {
            text: 'Voce tem 3 boletos vencendo hoje e 1 entrada em conciliacao.',
          },
          created_by_user_id: null,
          metadata: {
            tool_calls: ['buscar_dados_financeiros'],
          },
        },
        update: {
          content: {
            text: 'Voce tem 3 boletos vencendo hoje e 1 entrada em conciliacao.',
          },
          metadata: {
            tool_calls: ['buscar_dados_financeiros'],
          },
        },
      });

      await tx.alert.upsert({
        where: { id: seed_ids.alert },
        create: {
          id: seed_ids.alert,
          company_id: company.id,
          user_id: admin_user.id,
          type: 'caixa_critico',
          severity: 'warning',
          channel: 'push',
          status: 'active',
          title: 'Caixa projetado pressionado',
          message: 'O caixa projetado fica abaixo de 2x o CP em 7 dias.',
          threshold: {
            cp_7d_multiplier: 2,
          },
          metadata: {},
          triggered_at: new Date('2026-04-03T12:00:00.000Z'),
        },
        update: {
          severity: 'warning',
          status: 'active',
          message: 'O caixa projetado fica abaixo de 2x o CP em 7 dias.',
          threshold: {
            cp_7d_multiplier: 2,
          },
          metadata: {},
        },
      });
    },
    db,
  );
}
