export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/routes/:path*"], // Protects /dashboard and all its sub-routes, and /admin
};