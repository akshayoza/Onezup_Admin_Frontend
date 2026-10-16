# Onezup Admin Frontend

React, TypeScript, Tailwind CSS, React Router, Axios, and TanStack Query.

## Project map

```
src/
  app/               router and app-wide providers/configuration
  components/ui/     reusable, feature-neutral UI
  components/common/ shared application shell UI
  features/          domain modules; each owns its API, types, hooks, and UI
  layouts/           reusable page shells
  pages/             route-level composition only
  services/api/      Axios client and shared HTTP contracts
  hooks/             reusable hooks not owned by a single feature
```

Keep business code within its feature. For example, a future Drivers endpoint belongs in `src/features/drivers/drivers.api.ts`; its React Query hook belongs in `src/features/drivers/hooks/`. Pages should compose the feature and layout, rather than contain filtering or API logic.

## Design system

All shared colors are defined in [src/index.css](src/index.css) as Tailwind theme tokens. Use semantic classes such as `bg-surface`, `border-border`, `text-text-secondary`, and `bg-brand-primary` instead of hard-coded color values. Changing a token updates every component that uses it.

Feature-specific values may remain local until they are used by at least two features; then promote them to `src/index.css` with a meaningful semantic name.

## API integration

Set `VITE_API_BASE_URL` in `.env` (for example `VITE_API_BASE_URL=https://api.example.com`). The Axios instance is centralized in `src/services/api/axios.ts` and shared paginated response contracts are in `src/services/api/types.ts`.

When replacing mock data, retain the feature’s public hook shape (`items`, `page`, `pageSize`, `totalItems`, `totalPages`) and use `PaginatedResponse<T>` for backend results. This lets a feature move from local filtering to server pagination without requiring its page component or the reusable `Pagination` UI to change.

## List and filter conventions

- Filters belong to the feature hook that owns its data. Drivers filters never share state with Riders, Payments, or Notifications.
- Feature filters are in-memory only. Leaving a route and returning opens the default filters, rather than restoring an old filter from browser storage.
- Changing a filter, changing a tab, or creating/deleting an item resets that feature’s list to page 1. Changing only the pagination page keeps the filters active; otherwise users could not move through a filtered result set.
- Use [`usePagination`](src/hooks/usePagination.ts) for every new list. It safely clamps an invalid page after a response changes the total count.
- For API lists, use a query key containing the feature name and its own filters, for example `['drivers', filters, page]`. Never reuse a broad key such as `['list']` across features.

## Reusable UI boundaries

- Use [`DataTable`](src/components/ui/DataTable.tsx) for table scrolling and base table semantics, and [`EmptyTableState`](src/components/ui/EmptyTableState.tsx) when a list has no rows.
- Keep table column definitions, row actions, and data-to-cell mapping inside the feature. A driver row and payment row have different API contracts, so merging them into one generic column component would make the code harder to maintain.
- Keep modal content in its feature for the same reason. Extract only the shared accessibility/overlay behavior when all modal interactions have been standardized and tested together.

## Commands

```bash
npm run dev
npm run build
npm run lint
```
