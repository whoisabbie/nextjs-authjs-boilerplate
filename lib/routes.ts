const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  authError: "/auth/error",
  newVerification: "/auth/new-verification",
  settings: "/settings",
};

export default routes;

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [routes.home, routes.login, routes.register];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [routes.login, routes.register, routes.authError];

/**
 * The prefix for the API routes.
 * Routes that start with this prefix are used for API
 * authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default route to redirect to after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = routes.settings;
