"use client";
import LensAdd from "@/components/lens/lensAdd";
import LensItem from "@/components/lens/lensItem";
import LenseError from "@/components/lens/lenseError";
import LenseLoading from "@/components/lens/lenseLoading";
import { useToast } from "@/hooks/use-toast";
import type { IlensItem } from "@/types/lens";
import { useEffect, useState } from "react";
import { createLenseAction, deleteLenseAction, editLenseAction, getLensesAction } from "../actions/lensActions";

export default function Home() {
	const { toast } = useToast();

	const [lenses, setLenses] = useState<IlensItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	const handleEditLense = async (id: number, newLense: IlensItem) => {
		const data = await editLenseAction(id, newLense);

		setLenses((prevLenses) => prevLenses.map((lens) => (lens.id === id ? { ...lens, ...newLense } : lens)));

		toast({
			title: data.message,
			variant: data.success ? "default" : "destructive",
		});
	};

	const handleCreateLense = async (newLense: IlensItem) => {
		const newLensId = lenses[lenses.length - 1] ? lenses[lenses.length - 1].id + 1 : lenses.length + 1;
		const newLensWithId: IlensItem = { ...newLense, id: newLensId };

		const data = await createLenseAction(newLensWithId);

		setLenses((prevLenses) => [...prevLenses, newLensWithId]);

		toast({
			title: data.message,
			variant: data.success ? "default" : "destructive",
		});
	};

	const handleDeleteLense = async (id: number) => {
		const data = await deleteLenseAction(id);
		setLenses((prevLenses) => prevLenses.filter((lens) => lens.id !== id));
		toast({
			title: data.message,
			variant: data.success ? "default" : "destructive",
		});
	};

	useEffect(() => {
		const getLenses = async () => {
			setLoading(true);
			setError(false);

			const data = await getLensesAction();

			if (data.payload) setLenses(data.payload);
			if (data.success) {
				setLoading(false);
			} else {
				setLoading(false);
				setError(true);
			}
		};

		getLenses();
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
				<LensAdd addLense={handleCreateLense} />
			</div>
		</div>
	);
}
