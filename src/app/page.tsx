"use client";
import LensAdd from "@/components/lens/lensAdd";
import LensItem from "@/components/lens/lensItem";
import LenseError from "@/components/lens/lenseError";
import LenseLoading from "@/components/lens/lenseLoading";
// import { addLense, deleteLense, editLense, fetchLenses } from "@/services/lensService"; // Import the functions
import type { IlensItem } from "@/types/lens";
import { useEffect, useState } from "react";
import { addLenseAction, deleteLenseAction, editLenseAction, getLensesAction } from "../actions/lensActions";

export default function Home() {
	const [lenses, setLenses] = useState<IlensItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	const handleEditLense = async (id: number, newLense: IlensItem) => {
		try {
			const data = editLenseAction(id, newLense);
			setLenses((prevLenses) => prevLenses.map((lens) => (lens.id === id ? { ...lens, ...newLense } : lens)));
		} catch (err: unknown) {
			setError(true);
		}
	};

	const handleAddLense = async (newLense: IlensItem) => {
		try {
			const data = await await addLenseAction(newLense);
			setLenses((prevLenses) => [...prevLenses, newLense]);
		} catch (err: unknown) {
			setError(true);
		}
	};

	const handleDeleteLense = async (id: number) => {
		try {
			const data = await deleteLenseAction(id);
			setLenses((prevLenses) => prevLenses.filter((lens) => lens.id !== id));
		} catch (err: unknown) {
			setError(true);
		}
	};

	useEffect(() => {
		const fetchLensesData = async () => {
			setLoading(true);
			setError(false);
			try {
				const data = await getLensesAction();
				if (data.payload) setLenses(data.payload);
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
