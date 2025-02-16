import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { check } from "./actions/authActions";
import { AUTHENTICATED_COOKIE } from "./constants/cookies";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "./constants/routes";

export default async function middleware(req: NextRequest) {
	const { nextUrl } = req;

	const cookieStore = await cookies();
	const authenticatedCookie = cookieStore.get(AUTHENTICATED_COOKIE)?.value || "";

	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	const session = await check();
	const isAuthenticated = session.success;

	if (isAuthenticated) {
		cookieStore.set(AUTHENTICATED_COOKIE, "true");
	}

	if (authenticatedCookie) {
		if (isPublicRoute && isAuthenticated) return Response.redirect(new URL(ROOT, nextUrl));
	} else {
		if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
	}

	const response = NextResponse.next();

	return response;
}

export const config = {
	matcher: ["/", "/login", "/register"],
};
