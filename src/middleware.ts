import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { check } from "./actions/authActions";
import { PUBLIC_ROUTES } from "./constants/routes";

export default async function middleware(req: NextRequest) {
	const { nextUrl } = req;

	const cookieStore = await cookies();
	const authenticatedCookie = cookieStore.get("authenticated")?.value || "";

	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	const session = await check();
	const isAuthenticated = session.success;

	if (authenticatedCookie) {
		if (isPublicRoute && isAuthenticated) return Response.redirect(new URL("/", nextUrl));
	} else {
		if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL("/login", nextUrl));
	}

	const response = NextResponse.next();

	return response;
}

export const config = {
	matcher: ["/", "/login", "/register"],
};
