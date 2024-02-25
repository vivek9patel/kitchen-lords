import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ChefDB from "./firebase/models/Chef";
import md5 from "md5";

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
if (!currentUser) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const user = JSON.parse(currentUser);
  if(!user.email){
    return NextResponse.redirect(new URL('/', request.url));
  }

  const chef = ChefDB.getInstance(user.email);
  // check if user has access to site
  const hasAccess = await chef.getIsAuthorized();
  if(!hasAccess){
    return NextResponse.redirect(new URL('/', request.url));
  }

  // check for /user
  if (request.nextUrl.pathname.startsWith('/user')) {
    // no user id
    if (request.nextUrl.pathname === '/user') {
      return NextResponse.redirect(new URL('/user/' + md5(user.email), request.url));
    }
    // user id but not the same as current user
    if (request.nextUrl.pathname !== '/user/' + md5(user.email)) {
      return NextResponse.redirect(new URL('/user/' + md5(user.email), request.url));
    }
    return NextResponse.next();
  }
  // check for /kitchen
  if (request.nextUrl.pathname.startsWith('/kitchen')) {
    // no kitchen id
    if (request.nextUrl.pathname === '/kitchen') {
      return NextResponse.redirect(new URL('/user/' + md5(user.email), request.url));
    }
    // kitchen id but not accessible by logged in user
    const kitchens = await chef.getKitchens();
    if (!kitchens[request.nextUrl.pathname.split('/')[2]]) {
      return NextResponse.redirect(new URL('/user/' + md5(user.email), request.url));
    }
    return NextResponse.next();
  }
}

// protected routes
export const config = {
  matcher: ['/user/:path*', '/kitchen/:path*'],
}