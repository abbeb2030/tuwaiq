import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCurrentUser } from "./lib/auth"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check if the request is for an admin page
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      // Get the current user
      const user = await getCurrentUser()

      // If no user is logged in, redirect to login
      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // In a real app, you would check if the user has admin privileges
      // For now, we'll check if the email is admin@example.com
      if (user.email !== "admin@example.com") {
        // Redirect to home page if not an admin
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      // If there's an error, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Continue with the request
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}

