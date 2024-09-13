import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./route";
import {getAuthUser} from "@/utils/action"
const middleware = async (req) => {
  const { nextUrl } = req;
  const session=await getAuthUser();
   const isLoggedIn = !!session;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  
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
