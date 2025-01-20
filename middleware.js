import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export async function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === "/login" || path === '/register' || path === "/";

    const token = request.cookies.get("token");

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }


    if (token) {
        try {
            const secretKey = new TextEncoder().encode("next-ecommrece");

            await jwtVerify(token.value, secretKey, {
                algorithms: ['HS512'],
            });

            if (isPublicPath) {
                return NextResponse.next();
            }

            return NextResponse.next();
        } catch (error) {
            Cookies.remove("token")
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}

export const config = {
    matcher: [
        "/admin-dashboard/:path*",
        "/login",
        "/",
        "/register",
        "/account",
        "/cart",
        "/checkout",
        "/order",
    ],
};
