# Layout Architecture Restructure - TODO

## Overview

Restructure the app layout to support different navigation patterns across different page types using Next.js Route Groups.

## Current Issues

- **Inconsistent Navigation**: Left nav appears on `/companies` and `/notifications` but not on individual company pages (`/companies/uuid-companyname`)
- **Layout Complexity**: Current layout system uses conditional logic which is hard to maintain
- **Header Configuration**: Page headers need to be configurable based on whether left nav is present or not
- **Future Pages**: New pages like `/upload` and `/connect` also need full-width layout without left nav

## Proposed Architecture: Route Groups

### New Directory Structure

```
src/app/
├── layout.tsx                           (Root: Simplified HTML structure)
├── (with-sidebar)/                      (Route group - URL not affected)
│   ├── layout.tsx                       (TopNav + LeftNav + content)
│   ├── companies/
│   │   ├── layout.tsx                   (Companies list: header, filters, chat)
│   │   └── page.tsx                     (Company list page)
│   └── notifications/
│       └── page.tsx                     (Notifications page)
├── (full-width)/                        (Route group - URL not affected)
│   ├── layout.tsx                       (TopNav + full-width content)
│   ├── companies/
│   │   └── [uuid-companyname]/
│   │       └── page.tsx                 (Individual company page)
│   ├── upload/
│   │   └── page.tsx                     (Upload page)
│   └── connect/                         (Future implementation)
│       └── page.tsx                     (Connect page)
```

### URL Structure (Unchanged)

- `/companies` → Company list with left nav
- `/companies/c-550e8400-e29b-41d4-a716-446655440001-volt-motors` → Individual company, full width
- `/notifications` → Notifications with left nav
- `/upload` → Upload page, full width
- `/connect` → Connect page, full width

## Benefits

1. **Clean Separation**: No conditional logic needed in layouts
2. **Flexible Headers**: Each layout type can configure headers appropriately
3. **URL Structure Preserved**: Route groups don't affect actual URLs
4. **Maintainable**: Clear boundaries between different page types
5. **Scalable**: Easy to add new page types to appropriate groups
6. **Performance**: Next.js can optimize layouts independently

## Implementation Plan

### Phase 1: Setup Route Groups Structure ✅ COMPLETED

- [x] Create `(with-sidebar)` route group directory
- [x] Create `(full-width)` route group directory
- [x] Move `/companies` page to `(with-sidebar)/companies/`
- [x] Move `/notifications` page to `(with-sidebar)/notifications/`
- [x] Move `/companies/[uuid-companyname]` to `(full-width)/companies/[uuid-companyname]/`
- [x] Move `/upload` page to `(full-width)/upload/`
- [x] Create basic layouts for both route groups
- [x] Simplify root layout to remove old Layout component

### Phase 2: Extract and Refactor Layouts

- [ ] **Extract TopNav** from current main layout
- [ ] **Create new root layout** with only TopNav
- [ ] **Create with-sidebar layout** (TopNav + LeftNav + content)
- [ ] **Create full-width layout** (TopNav + full-width content)

### Phase 3: Configure Layout-Specific Features

- [ ] **Configurable Headers**: Update header components to take full width when no sidebar
- [ ] **Chat Functionality**: Ensure chat works appropriately in each layout type
- [ ] **Companies-specific Features**: Keep filters and company context in companies layout

### Phase 4: Update Navigation and Routes

- [ ] **Update route configuration** in `src/config/routes.ts`
- [ ] **Update LeftNav active state logic** for new structure
- [ ] **Test navigation** between different layout types

### Phase 5: Move Existing Pages

- [x] Move `/companies` page to `(with-sidebar)/companies/`
- [x] Move `/notifications` page to `(with-sidebar)/notifications/`
- [x] Move `/companies/[uuid-companyname]` to `(full-width)/companies/[uuid-companyname]/`
- [x] Move `/upload` page to `(full-width)/upload/` (if exists)

### Phase 6: Testing and Validation

- [ ] **Test all navigation flows**
- [ ] **Verify URL structure unchanged**
- [ ] **Test responsive behavior**
- [ ] **Validate chat functionality across layouts**
- [ ] **Test company page navigation from list**

## Technical Considerations

### Layout Components to Modify

1. **src/app/layout.tsx** - ✅ Simplified to basic HTML structure
2. **src/components/layout/Layout.tsx** - Split functionality into route groups
3. **src/app/companies/layout.tsx** - ✅ Moved to with-sidebar route group
4. **src/components/pageHeader/CompaniesPageHeader.tsx** - Make width configurable

### Key Files to Update

- `src/config/routes.ts` - Update route definitions if needed
- `src/components/layout/LeftNav.tsx` - Ensure active states work
- `src/lib/utils.ts` - Update `generateCompanyUrl` if needed
- All page components using navigation

### Chat Integration

- Ensure chat functionality works in both layout types
- May need to extract chat logic to higher level context
- Consider different chat positioning for full-width pages

## Future Enhancements

- [ ] Add breadcrumb navigation for individual company pages
- [ ] Consider adding back/close buttons for full-width pages
- [ ] Implement page transitions between layout types
- [ ] Add layout-specific meta tags and SEO optimization

## Dependencies

- Next.js Route Groups (already available in Next.js 13+)
- react-resizable-panels (already in use)
- Existing component library

## Timeline Estimate

- **Phase 1-2**: 2-3 hours (Structure setup and layout extraction) ✅ PHASE 1 COMPLETE
- **Phase 3-4**: 2-3 hours (Configuration and navigation updates)
- **Phase 5-6**: 1-2 hours (Page migration and testing)
- **Total**: 5-8 hours

## Notes

- Route groups use parentheses `()` and don't affect URL structure
- This is a Next.js 13+ app directory feature
- Existing functionality should be preserved during migration
- Consider creating a migration script for moving files

## Progress Log

### 2024-12-19 - Phase 1 Completed

- ✅ Created route group directories `(with-sidebar)` and `(full-width)`
- ✅ Moved all existing pages to appropriate route groups
- ✅ Created basic layout files for each route group
- ✅ Simplified root layout to remove old Layout component
- ✅ Verified new directory structure maintains URL compatibility

**Current Status**: Phase 1 Complete - Ready for Phase 2

---

**Status**: Phase 1 Complete  
**Priority**: High  
**Assigned**: -  
**Created**: 2024-12-19
