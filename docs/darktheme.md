# Dark Theme Implementation Guide

## Overview

This document outlines the implementation plan for adding dark theme support to the SalesIQ application. The implementation will include a theme toggle switch in the top navigation and system-wide dark mode support while maintaining Moody's brand consistency.

## Current State Analysis

### Existing Styling Architecture

- **Framework**: Tailwind CSS v4 with custom CSS variables
- **Brand Colors**: Well-defined Moody's color palette in `globals.css`
- **Component Styling**: Mix of utility classes and custom CSS variables
- **No Theme System**: Currently uses static color references

### Key Files to Modify

- `src/components/layout/TopNav.tsx` - Add theme toggle
- `src/app/globals.css` - Add dark theme CSS variables
- `src/lib/styles.ts` - Add theme-aware style utilities
- Various components - Update color references

## Implementation Plan

### Phase 1: Theme System Foundation

1. **Theme Context Setup**

   - Create theme context and provider
   - Add theme state management
   - Implement theme persistence (localStorage)

2. **CSS Variable System**
   - Define dark theme color variables
   - Create semantic color tokens
   - Ensure accessibility compliance

### Phase 2: Theme Toggle Component

1. **UI Component**

   - Design theme toggle switch for TopNav
   - Add smooth transition animations
   - Ensure proper accessibility (ARIA labels)

2. **Integration**
   - Add toggle to TopNav component
   - Connect to theme context
   - Handle theme switching logic

### Phase 3: Component Updates

1. **Systematic Color Updates**

   - Replace hardcoded colors with theme-aware variables
   - Update all components to use semantic tokens
   - Test component responsiveness to theme changes

2. **Brand Consistency**
   - Maintain Moody's brand colors in both themes
   - Ensure proper contrast ratios
   - Validate readability standards

### Phase 4: Testing & Polish

1. **Comprehensive Testing**

   - Test all components in both themes
   - Verify accessibility compliance
   - Check theme persistence across sessions

2. **Performance Optimization**
   - Minimize layout shifts during theme changes
   - Optimize CSS for theme switching
   - Ensure smooth transitions

## Design Considerations

### Color Strategy

- **Light Theme**: Current Moody's blue palette
- **Dark Theme**: Inverted palette maintaining brand colors
- **Semantic Tokens**: Abstract color meanings (primary, secondary, background, text)

### User Experience

- **System Preference Detection**: Respect user's OS theme preference
- **Smooth Transitions**: Animated theme switching
- **Persistence**: Remember user's theme choice
- **Accessibility**: WCAG AA compliance for both themes

### Technical Approach

- **CSS Variables**: Use CSS custom properties for theme switching
- **React Context**: Centralized theme state management
- **Local Storage**: Persist theme preference
- **SSR Compatibility**: Ensure Next.js SSR works correctly

## Success Criteria

1. ✅ Functional theme toggle in TopNav
2. ✅ All components support both light and dark themes
3. ✅ Theme preference is persisted across sessions
4. ✅ Smooth transitions between themes
5. ✅ Accessibility compliance (WCAG AA)
6. ✅ Brand consistency maintained
7. ✅ No layout shifts during theme changes
8. ✅ System preference detection working

## Future Enhancements

- High contrast mode support
- Custom theme colors for users
- Theme-aware component animations
- Advanced accessibility features
- Theme-based image/logo variations

---

_This implementation will enhance user experience while maintaining the professional Moody's brand identity across different viewing preferences._
