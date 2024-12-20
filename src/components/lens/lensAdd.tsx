"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { lensValidationSchema } from "@/constants/schema";
import type { IlensItem } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import LensForm from "./lensForm";

interface IlensAddProps {
	addLense: (newLense: IlensItem) => void;
}

export default function LensAdd({ addLense }: IlensAddProps) {
	const [openLensAdd, setOpenLensAdd] = useState(false);

	const handleEditLensAdd = (formData: IlensItem) => {
		addLense(formData);
	};

	return (
		<>
			{openLensAdd ? (
				<LensForm
					initialValues={{ id: 0, name: "", desc: "", iconUrl: "", location: "" }}
					onSubmit={handleEditLensAdd}
					validationSchema={lensValidationSchema}
					setOpenLensAdd={setOpenLensAdd}
				/>
			) : (
				<Card className="sm:w-lens-card relative">
					<CardHeader className="h-32" />
					<CardContent className="h-20 " />
					<CardFooter className="flex justify-between h-14" />
					<div className="absolute inset-0 flex items-center justify-center">
						<Plus className="h-16 w-16" onClick={() => setOpenLensAdd(true)} />
					</div>
				</Card>
			)}
		</>
	);
}
