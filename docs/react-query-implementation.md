# React Query Implementation Todo

## Overview

Implement TanStack Query (React Query) to improve data fetching, caching, and state management for company data.

## Current Pain Points

- [x] No caching - Every company page visit refetches the entire companies list ✅
- [x] Manual loading states management ✅
- [x] No background updates - Data could become stale ✅
- [x] Potential race conditions during fast navigation ✅
- [ ] Duplicate API requests when multiple components need same data (Partially resolved)

## Benefits Expected

- ✅ Automatic caching with configurable stale time
- ✅ Background refetching to keep data fresh
- ✅ Request deduplication
- ✅ Better loading and error states
- ✅ Optimistic updates for mutations
- ✅ Improved UX with instant cached data display

## Implementation Plan

### Phase 1: Setup and Basic Queries ✅ COMPLETED

- [x] Install dependencies ✅
  ```bash
  npm install @tanstack/react-query
  ```
- [x] Setup QueryClient and Provider in root layout ✅
- [x] Create custom hooks for company data fetching ✅
- [x] Replace current `useEffect` patterns in company pages ✅

### Phase 2: Replace Current Data Fetching

#### Priority Files to Update:

- [x] `src/app/(full-width)/companies/[uuid-companyname]/page.tsx` ✅
  - Replace manual fetch with `useQuery` ✅
  - Remove manual loading state management ✅
- [ ] `src/app/(with-sidebar)/companies/page.tsx`
  - Implement companies list query
  - Add filtering and search capabilities
- [ ] `src/components/pageHeader/CompaniesPageHeader.tsx`
  - Use cached company data if needed

#### Custom Hooks to Create:

- [x] `useCompanies()` - Get all companies with filtering ✅
- [x] `useCompany(uuid)` - Get single company by UUID ✅
- [ ] `useCompanyTracking()` - Mutation for tracking status

### Phase 3: Mutations and Updates

- [ ] Implement tracking toggle mutation
- [ ] Add optimistic updates for better UX
- [ ] Setup cache invalidation strategies
- [ ] Add company data updates/edits mutations

### Phase 4: Advanced Features

- [ ] Background refetching on window focus
- [ ] Retry logic for failed requests
- [ ] Prefetching for related companies
- [ ] Real-time updates if needed

## Configuration Strategy

### Cache Times

- **Companies List**: 5 minutes stale time
- **Individual Company**: 10 minutes stale time
- **Company Reports**: 1 hour stale time

### Query Keys Structure

```typescript
["companies"][("companies", filters)][("company", uuid)][ // All companies // Filtered companies // Single company
  ("company", uuid, "report")
]; // Company reports
```

## Example Implementation

### 1. Setup Provider

```typescript
// app/layout.tsx or providers file
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

### 2. Custom Hook Example

```typescript
// hooks/useCompany.ts
export function useCompany(uuid: string) {
  return useQuery({
    queryKey: ["company", uuid],
    queryFn: () => fetch(`/api/companies/${uuid}`).then((res) => res.json()),
    enabled: !!uuid,
    staleTime: 10 * 60 * 1000,
  });
}
```

### 3. Mutation Example

```typescript
// hooks/useCompanyTracking.ts
export function useCompanyTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, tracked }: { id: string; tracked: boolean }) =>
      fetch(`/api/companies/${id}/tracking`, {
        method: "POST",
        body: JSON.stringify({ tracked }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}
```

## Dependencies

- `@tanstack/react-query` - Core library
- `@tanstack/react-query-devtools` - Development tools (optional)

## Estimated Timeline

- **Phase 1**: 1 day
- **Phase 2**: 2-3 days
- **Phase 3**: 1-2 days
- **Phase 4**: 1 day
- **Total**: ~1 week

## Success Metrics

- [ ] Reduced API calls for repeat company visits
- [ ] Faster perceived load times
- [ ] No loading spinners for cached data
- [ ] Seamless optimistic updates
- [ ] Better error handling and retry logic

## Notes

- Start with company detail page as it has the most obvious caching benefits
- Keep existing API routes unchanged initially
- Can be implemented incrementally without breaking changes
- Consider adding React Query Devtools for development

---

## 🎯 Current Status

**Phase 1: COMPLETED** ✅

- React Query successfully integrated
- Company detail page converted to use `useCompany` hook
- Automatic caching and background refetching working
- Better loading states and error handling implemented

**Next Steps**: Phase 2 - Convert companies list page

---

**Priority**: High  
**Complexity**: Medium  
**Impact**: High UX improvement
