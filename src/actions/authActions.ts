"use server";

import { REQUEST_MESSAGES, REQUEST_PATHS } from "@/constants/requests";
import type { IgetResponse } from "@/types/response";
import type { Ilogin, Iregister } from "@/types/user";
import handleUnexpectedError from "@/utils/handleUnexpectedError";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_DB_HOST;

const ACCESS_TOKEN_COOKIE = "access-token";
const REFRESH_TOKEN_COOKIE = "refresh-token";

export const loginAction = async (credentials: Ilogin): Promise<IgetResponse> => {
	const cookieStore = await cookies();
	try {
		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.login}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.login.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.login.error };
		}

		const data = await res.json();
		const { payload } = data;

		cookieStore.set(ACCESS_TOKEN_COOKIE, payload[ACCESS_TOKEN_COOKIE], {
			httpOnly: true,
			secure: !!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"),
			maxAge: 2147483647 * 1000,
		});

		cookieStore.set(REFRESH_TOKEN_COOKIE, payload[REFRESH_TOKEN_COOKIE], {
			httpOnly: true,
			secure: !!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"),
			maxAge: 2147483647 * 1000,
		});

		return { ...data, message: REQUEST_MESSAGES.login.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};

export const registerAction = async (credentials: Iregister): Promise<IgetResponse> => {
	try {
		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.register}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.register.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.register.error };
		}

		const data = await res.json();

		return { ...data, message: REQUEST_MESSAGES.register.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};

export const check = async (): Promise<IgetResponse> => {
	try {
		const cookieStore = await cookies();

		const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
		const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.check}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"access-token": accessToken || "",
				"refresh-token": refreshToken || "",
			},
			credentials: "include",
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.check.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.check.error };
		}

		const data = await res.json();
		const { payload } = data;

		if (payload[ACCESS_TOKEN_COOKIE]) {
			cookieStore.set(ACCESS_TOKEN_COOKIE, payload[ACCESS_TOKEN_COOKIE], {
				httpOnly: true,
				secure: !!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"),
				maxAge: 2147483647 * 1000,
			});
		}

		return { ...data, message: REQUEST_MESSAGES.check.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};

export const logoutAction = async (): Promise<IgetResponse> => {
	try {
		const cookieStore = await cookies();

		const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || "";
		const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || "";

		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.logout}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"access-token": accessToken,
				"refresh-token": refreshToken,
			},
			credentials: "include",
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.logout.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.logout.error };
		}

		const data = await res.json();

		cookieStore.delete(ACCESS_TOKEN_COOKIE);
		cookieStore.delete(REFRESH_TOKEN_COOKIE);
		cookieStore.delete("authenticated");

		return { ...data, message: REQUEST_MESSAGES.logout.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};
