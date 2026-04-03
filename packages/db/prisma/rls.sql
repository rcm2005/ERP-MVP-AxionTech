create schema if not exists app;

create or replace function app.current_company_id()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('app.current_company_id', true), '')::uuid;
$$;

create or replace function app.current_user_id()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('app.current_user_id', true), '')::uuid;
$$;

create or replace function app.request_id()
returns text
language sql
stable
as $$
  select nullif(current_setting('app.request_id', true), '');
$$;

do $$
declare
  tenant_table text;
begin
  foreach tenant_table in array array[
    'company_memberships',
    'company_profiles',
    'company_fiscal_settings',
    'module_flags',
    'contacts',
    'categories',
    'cost_centers',
    'bank_connections',
    'bank_accounts',
    'bank_transactions',
    'lancamentos',
    'attachments',
    'cashflow_snapshots',
    'reconciliation_matches',
    'documents',
    'document_extractions',
    'document_validations',
    'conversations',
    'conversation_messages',
    'alerts',
    'audit_entries',
    'idempotency_keys'
  ] loop
    execute format('alter table %I enable row level security;', tenant_table);
    execute format('alter table %I force row level security;', tenant_table);
    execute format('drop policy if exists tenant_isolation on %I;', tenant_table);
    execute format(
      'create policy tenant_isolation on %I using (company_id = app.current_company_id()) with check (company_id = app.current_company_id());',
      tenant_table
    );
  end loop;
end $$;
