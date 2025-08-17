// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/utils";

export async function middleware(req: any) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const { pathname } = req.nextUrl

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    //   matcher: ["/books/new/:path*", "/books/:path/quote"], // korunan rotalar
    matcher: ["/books/new", "/books/:path*/edit", "/books/:path*/edit/quote"],
};
