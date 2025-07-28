// Reusable Tailwind class constants for consistent styling

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

// Company Item Specific Styles
export const COMPANY_STYLES = {
  // Company card hover effect
  cardHover: `${HOVER_TRANSITIONS.smooth} hover:shadow-lg hover:scale-[1.01]`,

  // Company item row hover
  rowHover: `${HOVER_TRANSITIONS.smooth} hover:bg-gray-50 hover:border-gray-300`,

  // Button hover effects
  buttonHover: `${HOVER_TRANSITIONS.transform} hover:scale-110`,

  // Icon hover effects
  iconHover: `${HOVER_TRANSITIONS.colors} hover:text-blue-600`,

  // Instant content resize (no animation)
  instantResize: TRANSITION_CLASSES.none,
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
