import { apiAuthPrefix, publicRoutes } from "./route";

const middleware = async (req) => {
  const { nextUrl } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdmin = process.env.ADMIN_USER_ID === session;
  const isPublicRoute = publicRoutes.some((route) =>
    new RegExp(`^${route}$`).test(nextUrl.pathname)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
 if (isApiAuthRoute) {
   return null;
 }
  if (isAuthRoute) {
   if (isLoggedIn) {
     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
   }
   return null;
 }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }
  return null;
};
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
export default middleware;
