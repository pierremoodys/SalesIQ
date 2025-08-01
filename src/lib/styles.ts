// Reusable Tailwind class constants for consistent styling

// Theme-aware CSS Variables for inline styles
export const THEME_COLORS = {
  // Primary colors
  primary: "var(--color-primary)",
  primaryHover: "var(--color-primary-hover)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",

  // Background colors
  background: "var(--color-background)",
  backgroundSecondary: "var(--color-background-secondary)",
  backgroundTertiary: "var(--color-background-tertiary)",

  // Surface colors
  surface: "var(--color-surface)",
  surfaceHover: "var(--color-surface-hover)",
  surfaceActive: "var(--color-surface-active)",

  // Text colors
  text: "var(--color-text)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
  textInverse: "var(--color-text-inverse)",

  // Border colors
  border: "var(--color-border)",
  borderLight: "var(--color-border-light)",
  borderStrong: "var(--color-border-strong)",

  // Status colors
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  info: "var(--color-info)",
} as const;

// Theme-aware style utility functions
export const themeStyle = {
  // Background styles
  primaryBg: { backgroundColor: THEME_COLORS.primary },
  secondaryBg: { backgroundColor: THEME_COLORS.secondary },
  surfaceBg: { backgroundColor: THEME_COLORS.surface },

  // Text styles
  primaryText: { color: THEME_COLORS.text },
  secondaryText: { color: THEME_COLORS.textSecondary },
  mutedText: { color: THEME_COLORS.textMuted },

  // Border styles
  border: { borderColor: THEME_COLORS.border },
  borderLight: { borderColor: THEME_COLORS.borderLight },
  borderStrong: { borderColor: THEME_COLORS.borderStrong },
} as const;

// Hover Transitions
export const HOVER_TRANSITIONS = {
  // Smooth general hover transition
  smooth: "transition-all duration-300 ease-in-out",

  // Fast hover transition
  fast: "transition-all duration-200 ease-in-out",

  // Slow hover transition
  slow: "transition-all duration-500 ease-in-out",

  // Transform only (for buttons, icons)
  transform: "transition-transform duration-200 ease-in-out",

  // Colors only (for text, backgrounds)
  colors: "transition-colors duration-200 ease-in-out",

  // Opacity only
  opacity: "transition-opacity duration-200 ease-in-out",
} as const;

// CSS Transition Classes (from globals.css)
export const TRANSITION_CLASSES = {
  // Smooth transitions for UI elements that should animate
  ui: "ui-transition",

  // Fast transitions for interactive elements
  interactive: "interactive-transition",

  // No transition - for instant changes
  none: "no-transition",

  // Legacy panel transition
  panel: "panel-transition",
} as const;

// Company Item Specific Styles (Theme-aware)
export const COMPANY_STYLES = {
  // Company card hover effect (theme-aware background)
  cardHover: `${HOVER_TRANSITIONS.smooth} hover:shadow-lg hover:scale-[1.01]`,

  // Company item row hover (uses semantic colors)
  rowHover: `${HOVER_TRANSITIONS.smooth}`,

  // Button hover effects
  buttonHover: `${HOVER_TRANSITIONS.transform} hover:scale-110`,

  // Icon hover effects (theme-aware)
  iconHover: `${HOVER_TRANSITIONS.colors}`,

  // Instant content resize (no animation)
  instantResize: TRANSITION_CLASSES.none,
} as const;

// Theme-aware CSS classes for common patterns
export const THEME_CLASSES = {
  // Cards and surfaces
  card: "transition-colors duration-300",
  surface: "transition-colors duration-300",

  // Interactive elements
  button: "transition-all duration-200 ease-in-out",
  link: "transition-colors duration-200 ease-in-out",

  // Text elements
  heading: "transition-colors duration-300",
  body: "transition-colors duration-300",

  // Borders and dividers
  border: "transition-colors duration-300",
  divider: "transition-colors duration-300",
} as const;

// Layout Transitions
export const LAYOUT_TRANSITIONS = {
  // Panel animations
  panelSlide: "transition-all duration-300 ease-in-out",

  // Modal animations
  modalFade: "transition-opacity duration-200 ease-in-out",

  // Chat slide animations (CSS keyframes)
  chatSlideIn: "slide-in-right",
  chatSlideOut: "slide-out-right",
} as const;
