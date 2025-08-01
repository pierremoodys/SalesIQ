# Skeleton Loading Implementation Guide

## Overview

This document outlines the implementation plan for skeleton loading screens across the SalesIQ application. We'll be using the already installed `react-loading-skeleton` package (v3.5.0) to create smooth loading experiences for all major pages.

## Package Information

- **Package**: `react-loading-skeleton` (already installed: v3.5.0)
- **Documentation**: [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)
- **Basic Usage**: Import `Skeleton` component and CSS styles

```tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
```

## Implementation Roadmap

### ✅ Prerequisites Completed

- [x] `react-loading-skeleton` package installed (v3.5.0)
- [x] Project uses React Query for data fetching with `isLoading` states
- [x] Existing loading states identified in components

---

## 📋 TO-DO: Skeleton Implementation Tasks

### 1. Companies Page (`/companies`)

**File**: `src/app/(with-sidebar)/companies/page.tsx`

**Current State**: Uses basic text "Loading companies..."

**Tasks**:

- [ ] Create `CompanyListSkeleton` component for list view
- [ ] Create `CompanyGridSkeleton` component for grid view
- [ ] Create `CompanyTableSkeleton` component for table view
- [ ] Replace loading state (lines 65-71) with appropriate skeleton
- [ ] Handle different view types (list/grid/table) with corresponding skeletons

**Components to Create**:

```
src/components/skeleton/
├── CompanyListSkeleton.tsx
├── CompanyGridSkeleton.tsx
└── CompanyTableSkeleton.tsx
```

**Implementation Details**:

- **List View**: Mimic `CompanyListItem` structure with avatar, title, tags, and description
- **Grid View**: Match `CompanyListGrid` card layout with image, title, and content areas
- **Table View**: Replicate `CompanyListTable` rows with columns for company data

---

### 2. Company Detail Page (`/companies/[uuid-companyname]`)

**File**: `src/app/(full-width)/companies/[uuid-companyname]/page.tsx`

**Current State**: Server-side rendered, may need loading states for client components

**Tasks**:

- [ ] Create `CompanyDetailSkeleton` component for main content area
- [ ] Create `CompanyTabsSkeleton` for tab navigation area
- [ ] Create `CompanyReportSkeleton` for markdown report content
- [ ] Add skeleton to `CompanyContentClient` component
- [ ] Handle different tab content types (report, sales-pitch, reach-out)

**Components to Create**:

```
src/components/skeleton/
├── CompanyDetailSkeleton.tsx
├── CompanyTabsSkeleton.tsx
├── CompanyReportSkeleton.tsx
└── CompanyContentSkeleton.tsx
```

**Implementation Details**:

- **Header Area**: Company name, tags, and action buttons
- **Tab Navigation**: Skeleton for tab buttons (notifications, report, sales-pitch, reach-out)
- **Content Area**: Different skeletons for markdown content vs notification lists
- **Markdown Content**: Paragraph and heading skeletons that match report structure

---

### 3. Notifications Page (`/notifications`)

**File**: `src/app/(with-sidebar)/notifications/page.tsx`

**Current State**: Uses basic text "Loading notifications..."

**Tasks**:

- [ ] Create `NotificationListSkeleton` component
- [ ] Create `NotificationItemSkeleton` for individual notification cards
- [ ] Replace loading state (lines 127-130) with skeleton
- [ ] Maintain tab structure while showing skeleton content

**Components to Create**:

```
src/components/skeleton/
├── NotificationListSkeleton.tsx
└── NotificationItemSkeleton.tsx
```

**Implementation Details**:

- **Tab Navigation**: Keep existing tabs visible, only skeleton the content area
- **Notification Items**: Mimic `NotificationListItem` with icon, title, description, and timestamp
- **Different Types**: Consider external vs internal notification styling
- **List Structure**: Show 8-10 skeleton items to fill viewport

---

### 4. Upload Page (`/upload`)

**File**: `src/app/(full-width)/upload/page.tsx` and `src/components/layout/UploadPageClient.tsx`

**Current State**: Server-side rendered, needs client-side loading states

**Tasks**:

- [ ] Analyze `UploadPageClient` for loading states
- [ ] Create `UploadAreaSkeleton` for file upload zone
- [ ] Create `UploadTableSkeleton` for file list/table
- [ ] Add skeleton states to upload progress tracking
- [ ] Handle different upload states (empty, uploading, completed)

**Components to Create**:

```
src/components/skeleton/
├── UploadAreaSkeleton.tsx
├── UploadTableSkeleton.tsx
└── UploadProgressSkeleton.tsx
```

**Implementation Details**:

- **Upload Zone**: Large dropzone area with upload icon and text placeholders
- **File Table**: Table rows showing filename, size, status, and progress columns
- **Progress Indicators**: Skeleton for upload progress bars and status indicators

---

## 🎨 Design Guidelines

### 1. Skeleton Component Structure

```tsx
// Example skeleton component structure
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ComponentNameSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height={40} width="60%" />
      <Skeleton count={3} />
      <Skeleton height={20} width="40%" />
    </div>
  );
}
```

### 2. Theming and Consistency

- Use consistent `baseColor` and `highlightColor` across all skeletons
- Match existing Tailwind design system colors
- Consider dark mode support if applicable

### 3. Animation and Timing

- Use default skeleton animation (shimmer effect)
- Ensure smooth transitions from skeleton to actual content
- Maintain loading time expectations (don't show skeleton for <200ms loads)

### 4. Responsive Design

- Ensure skeletons work across all screen sizes
- Match responsive behavior of actual components
- Test on mobile, tablet, and desktop viewports

---

## 🔧 Implementation Strategy

### Phase 1: Core Components (Priority 1)

1. **Companies Page Skeletons** - Most visible and frequently used
2. **Notifications Page Skeletons** - High user interaction area

### Phase 2: Detail Pages (Priority 2)

1. **Company Detail Skeletons** - Complex multi-tab interface
2. **Upload Page Skeletons** - File upload specific states

### Phase 3: Polish & Optimization (Priority 3)

1. Performance optimization
2. Animation fine-tuning
3. Accessibility improvements
4. Cross-browser testing

---

## 📝 Code Standards

### File Organization

```
src/components/skeleton/
├── index.ts                    # Export all skeleton components
├── CompanyListSkeleton.tsx     # Companies list view
├── CompanyGridSkeleton.tsx     # Companies grid view
├── CompanyTableSkeleton.tsx    # Companies table view
├── CompanyDetailSkeleton.tsx   # Company detail page
├── NotificationListSkeleton.tsx # Notifications list
├── UploadAreaSkeleton.tsx      # Upload dropzone
└── common/                     # Shared skeleton utilities
    ├── SkeletonCard.tsx        # Reusable card skeleton
    ├── SkeletonTable.tsx       # Reusable table skeleton
    └── SkeletonList.tsx        # Reusable list skeleton
```

### Naming Conventions

- Skeleton components: `[ComponentName]Skeleton.tsx`
- Follow existing component naming patterns
- Use descriptive names that match the content they represent

### TypeScript Requirements

- All skeleton components must be fully typed
- Props should include optional configuration options
- Support for className overrides and custom styling

---

## 🧪 Testing Checklist

### Visual Testing

- [ ] Skeleton matches actual component layout
- [ ] Smooth transition from skeleton to content
- [ ] Responsive behavior across screen sizes
- [ ] Animation performance (60fps)

### Functional Testing

- [ ] Skeleton shows during actual loading states
- [ ] Error states properly replace skeletons
- [ ] Multiple view types work correctly (list/grid/table)
- [ ] Tab switching maintains proper loading states

### Performance Testing

- [ ] No unnecessary re-renders
- [ ] Skeleton components are lightweight
- [ ] Minimal bundle size impact
- [ ] Smooth on low-end devices

---

## 📚 Resources

- [React Loading Skeleton Documentation](https://github.com/dvtng/react-loading-skeleton)
- [Skeleton UI Design Best Practices](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)
- [Next.js Loading UI Patterns](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

---

## 🔄 Progress Tracking

**Overall Progress**: 0/4 pages completed

- [ ] Companies Page (`/companies`)
- [ ] Company Detail Page (`/companies/[uuid-companyname]`)
- [ ] Notifications Page (`/notifications`)
- [ ] Upload Page (`/upload`)

---

_Last Updated: January 2025_
_Next Review: After Phase 1 completion_
