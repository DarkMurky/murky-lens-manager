import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { check } from "./actions/authActions";
import { PUBLIC_ROUTES } from "./constants/routes";

export default async function middleware(req: NextRequest) {
	const { nextUrl } = req;

	const session = await check();

	const isAuthenticated = session.success;

	const response = NextResponse.next();

	response.cookies.set("authenticated", JSON.stringify(isAuthenticated));

	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	if (isPublicRoute && isAuthenticated) return Response.redirect(new URL("/", nextUrl));

	if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL("/login", nextUrl));

	return response;
}

export const config = {
	matcher: ["/", "/login", "/register"],
};
