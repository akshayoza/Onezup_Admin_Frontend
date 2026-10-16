# Onezup Admin — Riders feature

This is a self-contained Riders feature scaffold using React, TypeScript, Tailwind CSS v4 semantic tokens, and lucide-react.

## Where to copy it

Copy the contents of this folder into:

`src/features/riders/`

Expected structure:
- `RidersPage.tsx`
- `riders.types.ts`
- `riders.constants.ts`
- `riders.mock.ts`
- `hooks/useRiders.ts`
- `components/*`

## Existing project requirements

- React + TypeScript
- `lucide-react`
- Existing Tailwind theme tokens: `brand-primary`, `surface`, `surface-muted`, `border`, `text-primary`, `text-secondary`, `text-muted`, `success`, `warning`, and `error`.

## Add a route

Import `RidersPage` in your existing route configuration and render it at the Riders route. Example for React Router:

```tsx
import RidersPage from "./features/riders/RidersPage";

// Inside your existing <Routes>:
<Route path="/riders" element={<RidersPage />} />
```

Keep your existing admin layout/sidebar around the route. This page intentionally does not create another sidebar or duplicate the app shell.

## Reuse plan

- Reuse your current admin shell and global theme.
- Keep rider-specific filters, row data, status options, and modal in this feature.
- This feature includes its own pagination for predictable integration. Once both Drivers and Riders pages are stable, you can extract a shared `Pagination` component and migrate both pages together.
- Avoid importing driver types or driver-specific components into the riders feature.

## Mock-data notes / before backend integration

- All rider records are fictional.
- Location is generated deterministically in `useRiders.ts` because the supplied driver-page screenshot does not define a rider location field in the data contract. Replace it with the actual backend location field when the API contract is known.
- Block/unblock/suspend and status changes currently update local React state only. Add API mutations and loading/error feedback before production.
- Suspended view currently shows the suspended riders among the currently filtered riders. If you want it to always show every suspended rider regardless of filters, change its data source to the full rider collection.
- Wallet filters are included because the reference Riders design includes wallet balance filtering.
- This scaffold was generated but not run against your project; run `npm run build` and fix any project-specific route/theme differences.
