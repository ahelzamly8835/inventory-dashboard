# ReStock — Inventory Dashboard

![CI](https://github.com/ahelzamly8835/inventory-dashboard/actions/workflows/ci.yml/badge.svg)

An inventory dashboard built with React 19, TypeScript and Tailwind, connected to a real authenticated backend (Supabase).


## Live demo

https://inventory-dashboard-brown.vercel.app

Demo account: `test@example.com` / `123456`

## Features

- Email/password authentication, with protected routes
- Products: list, add, edit, delete
- Server-side search by name or SKU (debounced)
- Status (healthy / low / critical) derived from stock levels
- Loading, error and empty states
- Automated tests, run on every push by GitHub Actions

## Stack

React 19, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, Supabase (Postgres + Auth), Vitest, React Testing Library

## Design decisions

**Security lives in the database.** Row Level Security is enabled on `products`, with a policy that lets a user read and write only the rows where `user_id = auth.uid()`. The publishable key in the frontend is public by design; RLS is what protects the data. `user_id` is filled by the database from the session, never sent by the client.

**Server state is managed by TanStack Query.** Queries use the key `["products", search]`, so each search term has its own cache entry. After every mutation I call `invalidateQueries({ queryKey: ["products"] })`, which refreshes all of them.

**Optimistic delete with rollback.** Deleting a product removes it from the cache immediately. If the request fails, the previous cache snapshot is restored and an error toast is shown. The list is refetched on settle so it always matches the database.

**Search runs on the server.** The query uses `ilike` on name and SKU with a 400 ms debounce, so typing doesn't fire a request per keystroke. The status filter stays on the client because status is computed from stock levels, not stored in the table.

**Status is derived, not stored.** Storing it would let it drift from the stock numbers after an edit.

## Testing

```bash
npm test
```

- `getStatus`: boundary cases of the status rule
- `ConfirmModal`: rendering, confirm/cancel, disabled while loading
- `Products` page: loading, error, empty and populated states
- `LogIn`: sends credentials to Supabase, shows an error on failure, navigates on success

Supabase is mocked in the tests, so they run without a network or a database.

## Getting started

```bash
npm install
```

Create `.env.local`:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Create the table in the Supabase SQL editor:

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  sku text not null,
  name text not null,
  category text,
  current_stock int not null default 0,
  min_stock int not null default 0,
  max_stock int not null default 100,
  price numeric(10,2) not null default 0,
  created_at timestamptz default now()
);

alter table products enable row level security;

create policy "users manage own products" on products
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

Then `npm run dev`.

## Known limitations

- Only delete is optimistic; add and edit refresh after the server responds.
- Only the Products page is connected to the database. The other pages still use static data.
- The category filter options are hardcoded.
