-- LickOrLie: tabellen voor Social, Deals per regio en ingestuurde kaarten
-- Veilig opnieuw uit te voeren (if not exists). Gebruikt public.is_admin() uit de beveiligingsupdate.
begin;

-- DEALS: land/regio en label bij bestaande sponsors
alter table public.sponsors add column if not exists country text;   -- bv. 'NL', leeg = overal
alter table public.sponsors add column if not exists region text;    -- bv. 'Noord-Holland', leeg = heel het land
alter table public.sponsors add column if not exists label text not null default 'affiliate'; -- 'affiliate' of 'partner'

-- AGENDA
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  venue text, city text, country text, region text,
  category text,            -- Party, Club, Sauna, Festival …
  url text, description text,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- CLUBS & PLEKKEN
create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text, country text, region text,
  category text,            -- Club, Sauna, Hotel …
  url text, description text,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- BLOG
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  body text not null default '',
  image_url text,
  country text, region text,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

-- PARTNERS (AWIN-affiliate en andere partners)
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  url text not null,
  image_url text,
  category text,
  country text, region text,
  label text not null default 'affiliate' check (label in ('affiliate','partner')),
  sort int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- VRAAG VAN DE WEEK
create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  options jsonb not null,   -- ["Kijken","Bekeken worden"]
  starts_at timestamptz not null default now(),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.poll_votes (
  id bigint generated always as identity primary key,
  poll_id uuid not null references public.polls(id) on delete cascade,
  option_index int not null check (option_index between 0 and 9),
  created_at timestamptz not null default now()
);
-- Uitslag opvragen zonder losse stemmen te tonen
create or replace function public.poll_results(p_poll uuid)
returns table(option_index int, votes bigint)
language sql stable security definer set search_path = public as $$
  select option_index, count(*) from public.poll_votes where poll_id = p_poll group by option_index
$$;
grant execute on function public.poll_results(uuid) to anon, authenticated;

-- INGESTUURDE KAARTEN (eerst goedkeuren door admin)
create table if not exists public.card_submissions (
  id uuid primary key default gen_random_uuid(),
  theme text not null default '🍍',
  level text not null check (level in ('Sweet','Sexy','Spicy','WetnWild')),
  type text not null check (type in ('truth','dare')),
  question text not null check (char_length(question) between 10 and 300),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

-- BEVEILIGING
alter table public.events enable row level security;
alter table public.places enable row level security;
alter table public.posts enable row level security;
alter table public.partners enable row level security;
alter table public.polls enable row level security;
alter table public.poll_votes enable row level security;
alter table public.card_submissions enable row level security;

do $$ declare t text; begin
  foreach t in array array['events','places','partners','polls'] loop
    execute format('drop policy if exists "%1$s lezen" on public.%1$s', t);
    execute format('create policy "%1$s lezen" on public.%1$s for select to anon, authenticated using (active or public.is_admin())', t);
    execute format('drop policy if exists "%1$s admin" on public.%1$s', t);
    execute format('create policy "%1$s admin" on public.%1$s for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "posts lezen" on public.posts;
create policy "posts lezen" on public.posts for select to anon, authenticated using (status = 'published' or public.is_admin());
drop policy if exists "posts admin" on public.posts;
create policy "posts admin" on public.posts for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "stemmen" on public.poll_votes;
create policy "stemmen" on public.poll_votes for insert to anon, authenticated with check (true);
drop policy if exists "stemmen admin" on public.poll_votes;
create policy "stemmen admin" on public.poll_votes for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "kaart insturen" on public.card_submissions;
create policy "kaart insturen" on public.card_submissions for insert to anon, authenticated with check (status = 'pending');
drop policy if exists "kaarten admin" on public.card_submissions;
create policy "kaarten admin" on public.card_submissions for all to authenticated using (public.is_admin()) with check (public.is_admin());

commit;
