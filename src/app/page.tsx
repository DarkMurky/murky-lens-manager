import LensAdd from "@/components/lens/lensAdd";
import LensItem from "@/components/lens/lensItem";
import { requestUrls } from "@/constants/request";
import type { IgetLensesResponse, IlensItem } from "@/types";
import { revalidatePath } from "next/cache";

export default async function Home() {
	const editLense = async (id: number, newLense: IlensItem) => {
		"use server";

		await fetch(`${process.env.DB_HOST}${requestUrls.editLense(id)}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newLense),
		});

		revalidatePath("/");
	};

	const addLense = async (newLense: IlensItem) => {
		"use server";

		await fetch(`${process.env.DB_HOST}${requestUrls.createLense}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newLense),
		});

		revalidatePath("/");
	};

	const deleteLense = async (id: number) => {
		"use server";

		await fetch(`${process.env.DB_HOST}${requestUrls.deleteLense(id)}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		revalidatePath("/");
	};

	const res = await fetch(`${process.env.DB_HOST}${requestUrls.getAllLenses}`);
	const lenses: IgetLensesResponse = await res.json();

	return (
		<div className="container mx-auto p-2 overflow-auto mb-main-offset">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
				{lenses.payload
					.sort((a, b) => a.id - b.id)
					.map((lensItem) => (
						<LensItem editLense={editLense} deleteLense={deleteLense} {...lensItem} key={lensItem.id} />
					))}
				<LensAdd addLense={addLense} />
			</div>
		</div>
	);
}
