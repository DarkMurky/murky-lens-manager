"use client";
import LenseError from "@/components/lens/lenseError";
import LensAdd from "@/components/lens/lensAdd";
import LensItem from "@/components/lens/lensItem";
import LenseLoading from "@/components/lens/lenseLoading";
import { fetchLenses, editLense, addLense, deleteLense } from "@/services/lensService"; // Import the functions
import type { IgetLensesResponse, IlensItem } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
	const [lenses, setLenses] = useState<IlensItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	const handleEditLense = async (id: number, newLense: IlensItem) => {
		await editLense(id, newLense);
		setLenses((prevLenses) => prevLenses.map((lens) => (lens.id === id ? { ...lens, ...newLense } : lens)));
	};

	const handleAddLense = async (newLense: IlensItem) => {
		await addLense(newLense);
		setLenses((prevLenses) => [...prevLenses, newLense]);
	};

	const handleDeleteLense = async (id: number) => {
		await deleteLense(id);
		setLenses((prevLenses) => prevLenses.filter((lens) => lens.id !== id));
	};

	useEffect(() => {
		console.log("URL1", process.env.NEXT_PUBLIC_DB_HOST)
		const fetchLensesData = async () => {
			setLoading(true);
			setError(false);
			try {
				const data: IgetLensesResponse = await fetchLenses();
				setLenses(data.payload);
			} catch (err: unknown) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchLensesData();
	}, []);

	if (loading) {
		return <LenseLoading />;
	}

	if (error) {
		return <LenseError />;
	}

	return (
		<div className="container mx-auto p-2 overflow-auto mb-main-offset">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
				{lenses.map((lensItem) => (
					<LensItem editLense={handleEditLense} deleteLense={handleDeleteLense} {...lensItem} key={lensItem.id} />
				))}
				<LensAdd addLense={handleAddLense} />
			</div>
		</div>
	);
}
