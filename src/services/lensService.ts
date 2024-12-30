import { requestUrls } from "@/constants/request";
import type { IlensItem, IgetLensesResponse } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_DB_HOST;

export const fetchLenses = async (): Promise<IgetLensesResponse> => {
	const res = await fetch(`${baseUrl}${requestUrls.getAllLenses}`);
	if (!res.ok) {
		throw new Error("Failed to fetch lenses");
	}
	return res.json();
};

export const editLense = async (id: number, newLense: IlensItem) => {
	await fetch(`${baseUrl}${requestUrls.editLense(id)}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newLense),
	});
};

export const addLense = async (newLense: IlensItem) => {
	await fetch(`${baseUrl}${requestUrls.createLense}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newLense),
	});
};

export const deleteLense = async (id: number) => {
	await fetch(`${baseUrl}${requestUrls.deleteLense(id)}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
