# Table of Contents Implementation Plan

## 📋 Current Structure Analysis

### Layout Hierarchy (Current)

```
FullWidthLayout (h-screen, overflow-hidden)
├── TopNav (fixed)
└── Company Page (flex-1)
    ├── CompaniesPageHeader (company info, back button)
    └── PanelGroup (resizable: content + chat)
        ├── Panel: Company Content (overflow-auto) ❌ PROBLEM
        │   └── div (p-6)
        │       ├── Tab Navigation ❌ SCROLLS WITH CONTENT
        │       └── Tab Content
        │           └── Report Tab
        │               ├── TOC (sticky, w-64) ❌ INSIDE SCROLL AREA
        │               └── Report Content (overflow-y-auto)
        └── Panel: Chat (conditional)
```

### Key Issues Identified

1. **Tabs scroll with content** - Should be fixed at top
2. **TOC is inside scrollable area** - Should be truly fixed on left
3. **No nested scroll behavior** - Missing "exhaust inner scroll first" logic
4. **Single scroll context** - Everything scrolls together instead of layered scrolling

## 🎯 Requirements

### Fixed Elements (Never Scroll) ✅ **COMPLETED**

- [x] **TopNav** - Already fixed at top
- [x] **CompaniesPageHeader** - ✅ Stay fixed below TopNav
- [x] **Tab Navigation** - ✅ Stay fixed below header
- [x] **Table of Contents** - ✅ Stay fixed on left side
- [x] **Report Container** - ✅ Fixed-size container in center-right

### Core Scrolling Behavior ✅ **COMPLETED**

- [x] **Report content scrolls inside fixed container** ✅
- [x] **TOC highlights active section during scroll** ✅
- [x] **Click-to-scroll functionality works** ✅
- [x] **Intersection Observer works with inner scroll context** ✅

### Advanced Nested Scrolling (Originally Planned - May Not Be Needed)

- [ ] **Phase 2**: When inner content fully scrolled, page scrolls with 128px bottom margin
- [ ] **Smooth transitions** between inner and outer scroll

## 🎉 **CURRENT STATUS: CORE FUNCTIONALITY COMPLETE**

The table of contents implementation is **working as expected** with:

✅ **Fixed Layout Structure**

- Tabs stay fixed at top during all scrolling
- TOC stays fixed on left during all scrolling
- Report container is properly positioned
- Report content scrolls within its container

✅ **Interactive TOC Features**

- Automatically highlights current section while scrolling
- Click any TOC item to scroll to that section
- Smooth scrolling animations
- Proper visual hierarchy (h2 vs h3 styling)

✅ **Performance & UX**

- Intersection Observer optimized for nested scroll
- No scroll jank or layout jumps
- Works seamlessly with chat panel resizing
- Clean separation between fixed and scrollable areas

## 🏗️ New Structure Design

### Target Layout Hierarchy

```
FullWidthLayout (h-screen, overflow-hidden)
├── TopNav (fixed)
└── Company Page (flex-1, flex-col)
    ├── CompaniesPageHeader (fixed, flex-shrink-0)
    ├── Tab Navigation (fixed, flex-shrink-0)
    └── Main Content Area (flex-1, min-h-0)
        └── PanelGroup (resizable: main + chat)
            ├── Panel: Main Content (flex layout)
            │   ├── TOC (fixed left, w-64)
            │   └── Report Container (fixed size + nested scroll)
            │       └── Report Content (inner scroll logic)
            └── Panel: Chat (conditional)
```

### Scroll Behavior Logic

1. **Inner Scroll Phase**:

   - Report content scrolls within fixed container
   - TOC updates based on inner scroll position
   - Page scroll is locked/disabled

2. **Transition Detection**:

   - Detect when inner content reaches bottom
   - Switch from inner scroll to page scroll
   - Handle scroll direction changes

3. **Outer Scroll Phase**:
   - Page scrolls normally
   - Maintain 128px bottom margin
   - TOC remains fixed during page scroll

## 🔧 Implementation Plan

### Phase 1: Layout Restructure ✅ **COMPLETED**

- [x] **Move tabs outside scrollable area**

  - ✅ Extracted tab navigation from Panel content
  - ✅ Positioned tabs as fixed element below header
  - ✅ Updated tab styling for new position

- [x] **Restructure main content area**

  - ✅ Removed overflow-auto from Panel
  - ✅ Created fixed-height main content container
  - ✅ Separated TOC and report into proper layout

- [x] **Fix TOC positioning**
  - ✅ Moved TOC outside of any scrollable containers
  - ✅ Made truly fixed on left side with dedicated column
  - ✅ Updated styling for fixed position

**Phase 1 Results:**

- Tabs now stay fixed at top ✅
- TOC is in dedicated fixed left column ✅
- Report content has its own scrollable area ✅
- Layout is properly structured for next phases ✅

### Phase 2: Nested Scroll Implementation

- [ ] **Create report container component**

  - Fixed height container with controlled overflow
  - Inner scroll detection logic
  - Scroll state management

- [ ] **Implement scroll behavior logic**

  - Track inner scroll position
  - Detect scroll boundaries (top/bottom)
  - Switch between inner and outer scroll modes

- [ ] **Add page scroll handling**
  - Control page scroll based on inner scroll state
  - Implement 128px bottom margin logic
  - Handle scroll direction changes

### Phase 3: Integration & Polish

- [ ] **Update intersection observer**

  - Work with nested scroll context
  - Track active headings in inner scroll
  - Handle transitions between scroll modes

- [ ] **Update click-to-scroll**

  - Scroll within inner container when active
  - Handle edge cases near boundaries
  - Smooth transitions

- [ ] **Testing & refinement**
  - Test all scroll scenarios
  - Verify TOC accuracy
  - Polish animations and transitions

## 📝 Technical Implementation Details

### Key Components to Modify

1. **`src/app/(full-width)/companies/[uuid-companyname]/page.tsx`**

   - Restructure layout hierarchy
   - Move tabs to fixed position
   - Implement new content structure

2. **`src/components/TableOfContents.tsx`**

   - Remove sticky positioning
   - Update for truly fixed position
   - Adjust styling for new layout

3. **`src/hooks/useTableOfContents.ts`**

   - Update intersection observer for nested scroll
   - Handle multiple scroll contexts
   - Improve scroll-to-heading logic

4. **New Component: `src/components/ReportContainer.tsx`**
   - Manage nested scroll behavior
   - Handle scroll state transitions
   - Control inner/outer scroll logic

### CSS Classes & Positioning

- **Fixed Elements**: Use proper fixed/sticky positioning
- **Scroll Containers**: Controlled overflow and height
- **Transitions**: Smooth scroll behavior between modes
- **Z-index Management**: Proper layering for fixed elements

### Event Handling

- **Scroll Event Listeners**: Track scroll position and direction
- **Scroll State**: Manage transitions between inner/outer scroll
- **Intersection Observer**: Update for nested scroll context
- **Resize Handling**: Maintain layout on window resize

## 🎯 Success Criteria

### Functional Requirements

- [ ] Tabs stay fixed at top during all scrolling
- [ ] TOC stays fixed on left during all scrolling
- [ ] Report content scrolls in fixed container first
- [ ] Page scrolls only after inner content exhausted
- [ ] 128px bottom margin maintained
- [ ] Smooth transitions between scroll modes

### UX Requirements

- [ ] TOC highlights correct active section
- [ ] Click-to-scroll works in all modes
- [ ] No scroll jank or jumping
- [ ] Consistent behavior across browsers
- [ ] Responsive on different screen sizes

### Technical Requirements

- [ ] Performance optimized (no excessive re-renders)
- [ ] Accessible (keyboard navigation works)
- [ ] Clean code structure and separation of concerns
- [ ] Proper error handling and edge cases
- [ ] TypeScript compliance

## 🔄 Phase Breakdown

### Phase 1: Structure (Priority: High)

**Goal**: Fix layout hierarchy and positioning
**Time Estimate**: 2-3 hours
**Deliverables**: Fixed tabs, fixed TOC, proper layout structure

### Phase 2: Scroll Logic (Priority: High)

**Goal**: Implement nested scroll behavior
**Time Estimate**: 4-5 hours
**Deliverables**: Working inner/outer scroll transitions

### Phase 3: Integration (Priority: Medium)

**Goal**: TOC integration with new scroll system
**Time Estimate**: 2-3 hours  
**Deliverables**: Accurate scroll spy, smooth click-to-scroll

### Phase 4: Polish (Priority: Low)

**Goal**: Refinements and edge cases
**Time Estimate**: 1-2 hours
**Deliverables**: Smooth animations, responsive design

## 📋 Next Steps

1. **Start with Phase 1**: Layout restructure
2. **Get approval on structure** before proceeding to scroll logic
3. **Implement incrementally** with testing at each step
4. **Document edge cases** as they're discovered
5. **Optimize performance** in final phase

---

**Created**: [Current Date]  
**Status**: Planning Phase  
**Assignee**: AI Assistant  
**Priority**: High
