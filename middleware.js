import { NextResponse } from 'next/server';
import { verifyToken } from './app/utils/auth';
import { redirect } from 'next/navigation';

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    if (path.startsWith("/api/")) {
        return NextResponse.next();
    }

    const publicRoutes = ["/login", "/register"];
    const clientRoutes = ["/checkout", "/cart", "/account", "/order"];
    const adminRoutes = ["/admin-dashboard"];

    const token = request.cookies.get("authToken")?.value;
    const existingUserData = request.cookies.get("userData")?.value;

    if (!token) {
        if (![...publicRoutes, ...clientRoutes, "/"].includes(path)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    try {
        const decode = await verifyToken(token);
        const isAdmin = decode.role === true;

        if (isAdmin && path === "/") {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }

        if (publicRoutes.includes(path)) {
            return NextResponse.redirect(new URL(isAdmin ? "/admin-dashboard" : "/", request.url));
        }

        if (!isAdmin && adminRoutes.includes(path)) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        if (!existingUserData || JSON.parse(existingUserData).id !== decode.id) {
            const response = NextResponse.next();
            response.cookies.set("userData", JSON.stringify(decode), { httpOnly: true });
            return response;
        }

    } catch (error) {
        console.log("Token verification failed:", error.message);
        redirect('/login')
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin-dashboard/:path*",
        "/login",
        "/",
        "/register",
        "/account",
        "/cart",
        "/checkout/:path*",
        "/order",
    ],
};
