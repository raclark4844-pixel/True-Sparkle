create table if not exists catalog_items (
  id          text primary key,
  name        text not null,
  mood        text not null default 'fun',
  size_label  text not null default '',
  img         text not null,
  buy         text not null default '',
  blurb       text not null default '',
  kit         text not null default '',
  price       text,
  featured    boolean not null default false,
  disclaimer  text,
  sizes_json  text not null default '[]',
  drills_json text not null default '[]',
  lead_time   text not null default '1 month',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);
