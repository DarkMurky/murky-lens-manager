"use server";

import { cookies } from "next/headers";

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants/cookies";
import { REQUEST_MESSAGES, REQUEST_PATHS } from "@/constants/requests";
import { BASE_URL } from "@/constants/routes";
import type { IlensItem } from "@/types/lens";
import type { IgetResponse } from "@/types/response";
import handleUnexpectedError from "@/utils/handleUnexpectedError";

export const getLensesAction = async (): Promise<IgetResponse> => {
	const cookieStore = await cookies();

	const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || "";
	const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || "";
	try {
		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.getAllLenses}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				[ACCESS_TOKEN_COOKIE]: accessToken,
				[REFRESH_TOKEN_COOKIE]: refreshToken,
			},
			credentials: "include",
		});
		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.getLense.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.getLense.error };
		}

		const data = await res.json();

		return { ...data, message: REQUEST_MESSAGES.getLense.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};

export const deleteLenseAction = async (id: number): Promise<IgetResponse> => {
	const cookieStore = await cookies();

	const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || "";
	const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || "";
	try {
		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.deleteLense(id)}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				[ACCESS_TOKEN_COOKIE]: accessToken,
				[REFRESH_TOKEN_COOKIE]: refreshToken,
			},
			credentials: "include",
		});
		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.deleteLense.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.deleteLense.error };
		}

		const data = await res.json();

		return { ...data, message: REQUEST_MESSAGES.deleteLense.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};

export const editLenseAction = async (id: number, newLense: IlensItem): Promise<IgetResponse> => {
	const cookieStore = await cookies();

	const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || "";
	const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || "";

	try {
		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.editLense(id)}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				[ACCESS_TOKEN_COOKIE]: accessToken,
				[REFRESH_TOKEN_COOKIE]: refreshToken,
			},
			body: JSON.stringify(newLense),
			credentials: "include",
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.updateLense.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.updateLense.error };
		}

		const data = await res.json();

		return { ...data, message: REQUEST_MESSAGES.updateLense.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};

export const createLenseAction = async (newLense: IlensItem): Promise<IgetResponse> => {
	const cookieStore = await cookies();

	const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || "";
	const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || "";
	try {
		const res = await fetch(`${BASE_URL}${REQUEST_PATHS.createLense}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				[ACCESS_TOKEN_COOKIE]: accessToken,
				[REFRESH_TOKEN_COOKIE]: refreshToken,
			},
			body: JSON.stringify(newLense),
			credentials: "include",
		});
		if (!res.ok) {
			const errorData = await res.json();
			console.error(REQUEST_MESSAGES.createLense.error, errorData);
			return { ...errorData, message: REQUEST_MESSAGES.createLense.error };
		}

		const data = await res.json();

		return { ...data, message: REQUEST_MESSAGES.createLense.success };
	} catch (error) {
		return handleUnexpectedError(error);
	}
};
