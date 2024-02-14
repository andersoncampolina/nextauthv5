/**
 * Este arquivo contém um middleware personalizado que é executado antes de cada solicitação de API ou Rotas.
*/
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
// Importa configurações de rotas, incluindo rotas públicas, rotas de autenticação e prefixos.
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"

// Inicializa o NextAuth com as configurações de autenticação personalizadas.
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    // Verifica se o usuário está logado com base na existência do objeto `req.auth`.
    const isLoggedIn = !!req.auth

    // Determina se a URL atual é uma rota de API de autenticação, uma rota pública ou uma rota de autenticação.
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    
    // Interrompe o middleware para rotas de API de autenticação, evitando processamento adicional.
    if (isApiAuthRoute) {
        return; 
    }

    // Redireciona usuários logados tentando acessar rotas de autenticação para a página padrão pós-login.
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return; 
    }

    // Para usuários não logados tentando acessar rotas não públicas, redireciona para a página de login.
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }
})

// Configuração opcional para especificar quais rotas o middleware de autenticação deve ignorar.
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
