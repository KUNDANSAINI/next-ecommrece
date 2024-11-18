import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    const path=request.nextUrl.pathname
    const isPublicPath= path === "/login" || path === '/register' || path === "/" ;

    const token = request.cookies.get("token");

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    

    if (token) {
        try {
            const secretKey = new TextEncoder().encode("next-ecommrece");
            
            await jwtVerify(token.value, secretKey);

            if (isPublicPath) {
                return NextResponse.next();
            }

            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin-dashboard/:path*",
        "/login",
        "/",
        "/register"
    ],
};
