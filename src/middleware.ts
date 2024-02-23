import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Chef from "./firebase/models/Chef";

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  if (!currentUser) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const user = JSON.parse(currentUser);
  if(!user.uid){
    return NextResponse.redirect(new URL('/', request.url));
  }

  // check for /user
  if (request.nextUrl.pathname.startsWith('/user')) {
    // no user id
    if (request.nextUrl.pathname === '/user') {
      return NextResponse.redirect(new URL('/user/' + user.uid, request.url));
    }
    // user id but not the same as current user
    if (request.nextUrl.pathname !== '/user/' + user.uid) {
      return NextResponse.redirect(new URL('/user/' + user.uid, request.url));
    }
    return NextResponse.next();
  }
  // check for /kitchen
  if (request.nextUrl.pathname.startsWith('/kitchen')) {
    // no kitchen id
    if (request.nextUrl.pathname === '/kitchen') {
      return NextResponse.redirect(new URL('/user/' + user.uid, request.url));
    }
    // kitchen id but not accessible by logged in user
    const chef = new Chef(user.uid);
    const kitchens = await chef.getKitchens();
    if (!kitchens[request.nextUrl.pathname.split('/')[2]]) {
      return NextResponse.redirect(new URL('/user/' + user.uid, request.url));
    }
    return NextResponse.next();
  }
}

// protected routes
export const config = {
  matcher: ['/user/:path*', '/kitchen/:path*'],
}