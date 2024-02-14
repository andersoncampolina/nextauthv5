/**
 * Uma array das rotas com acesso publico (não precisa estar logado)
 * @type {string[]} */

export const publicRoutes = [
    "/"
]

/**
 * Array das rotas que lidam com a autenticação. 
 * Essas rotas vão redirecionar o usuario para a rota /settings.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/**
 * Prefixo para as rotas de autenticação.
 * Essa rota sempre será pública.
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Rota padrão que ira redirecionar o usuario apos o login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"