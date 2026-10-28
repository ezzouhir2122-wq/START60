-- START60 — Table de persistance des dossiers d'incubation
-- À exécuter une fois dans Supabase : Dashboard → SQL Editor → New query → Run.
--
-- Accès partagé via la clé anon (pas d'authentification) : tout visiteur peut
-- lire, créer et supprimer des dossiers. Convient à une démo / usage interne.
-- ⚠️ Pour un usage public réel, restreindre ces policies (voir note en bas).

create extension if not exists "pgcrypto";

create table if not exists public.ventures (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  idea_prompt text        not null,
  title       text,
  data        jsonb       not null
);

-- Tri de l'historique par date (du plus récent au plus ancien).
create index if not exists ventures_created_at_idx
  on public.ventures (created_at desc);

-- Row Level Security activée, puis policies ouvertes pour le rôle anon.
alter table public.ventures enable row level security;

drop policy if exists "ventures_select_public" on public.ventures;
create policy "ventures_select_public"
  on public.ventures for select
  using (true);

drop policy if exists "ventures_insert_public" on public.ventures;
create policy "ventures_insert_public"
  on public.ventures for insert
  with check (true);

drop policy if exists "ventures_delete_public" on public.ventures;
create policy "ventures_delete_public"
  on public.ventures for delete
  using (true);

-- NOTE SÉCURITÉ
-- Ces policies autorisent n'importe quel porteur de la clé anon à lire/écrire/
-- supprimer toutes les lignes. Quand l'authentification sera ajoutée, remplacer
-- par des policies basées sur auth.uid() et une colonne user_id, p.ex. :
--   alter table public.ventures add column user_id uuid references auth.users (id);
--   create policy "owner_select" on public.ventures
--     for select using (auth.uid() = user_id);
