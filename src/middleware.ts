import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  // Get hostname of request (e.g. demo.ekodine.com, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname

  // Check if it's the root domain (e.g. ekodine.com or localhost:3000)
  // we could define NEXT_PUBLIC_ROOT_DOMAIN in .env
  const isLocalHost = process.env.NODE_ENV === "development"
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || (isLocalHost ? "localhost:3000" : "ekodine.com")
  
  const isApp = hostname === rootDomain || hostname === `app.${rootDomain}` || hostname.startsWith("app.")
  const isDashboardRoute = path.startsWith('/dashboard') || path === '/login' || path === '/register'

  if (isApp || isLocalHost && !hostname.includes('.')) {
    // We are on the main app domain, handle auth and dashboard routing normally
    const session = await auth()
    
    // Protect dashboard routes
    if (path.startsWith("/dashboard")) {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    return NextResponse.next()
  }

  // Handle subdomain routing e.g. {slug}.ekodine.com
  const slug = hostname.split('.')[0]
  if (slug && slug !== 'app') {
    // Rewrite path to public storefront
    // /menu -> /[slug]/menu
    return NextResponse.rewrite(new URL(`/${slug}${path === "/" ? "" : path}`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
