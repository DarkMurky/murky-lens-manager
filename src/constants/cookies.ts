export const ACCESS_TOKEN_COOKIE = "access-token";
export const REFRESH_TOKEN_COOKIE = "refresh-token";
export const AUTHENTICATED_COOKIE = "authenticated";

export const COOKIE_SETTINGS = {
	httpOnly: true,
	secure: !!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"),
	maxAge: 2147483647 * 1000,
};
