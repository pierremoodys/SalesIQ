/**
 * Application route definitions and helper functions
 */

// Route path definitions
export const ROUTES = {
  HOME: '/',
  COMPANIES: {
    LIST: '/companies',
    DETAIL: (companyName: string) => `/companies/${companyName}`,
  },
  NOTIFICATIONS: '/notifications',
  UPLOAD: '/upload',
  CONNECT: '/connect',
} as const;

// Type for route parameters
export interface RouteParams {
  companyName?: string;
}

/**
 * Type-safe route generator
 * @param route - The route path from ROUTES
 * @param params - Optional parameters for dynamic routes
 * @returns The complete route path
 */
export function generateRoute(route: string | ((param: string) => string), params?: RouteParams): string {
  if (typeof route === 'function' && params?.companyName) {
    return route(params.companyName);
  }
  return route as string;
}

/**
 * Navigation helper - returns true if the current path matches the given route
 * @param currentPath - Current browser path
 * @param route - Route to check against
 * @returns boolean indicating if the route is active
 */
export function isActiveRoute(currentPath: string, route: string): boolean {
  if (route === ROUTES.HOME) {
    return currentPath === route;
  }
  return currentPath.startsWith(route);
}

// Navigation items type definition
export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

// Main navigation items
export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    path: ROUTES.HOME,
  },
  {
    label: 'Companies',
    path: ROUTES.COMPANIES.LIST,
  },
  {
    label: 'Notifications',
    path: ROUTES.NOTIFICATIONS,
  },
  {
    label: 'Upload',
    path: ROUTES.UPLOAD,
  },
];