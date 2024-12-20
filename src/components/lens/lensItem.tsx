"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { lensValidationSchema } from "@/constants/schema";
import type { IlensItem } from "@/types";
import { CirclePlay, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import LensForm from "./lensForm";

interface IlentsItemProps extends IlensItem {
	editLense: (id: number, newLense: IlensItem) => void;
	deleteLense: (id: number) => void;
}

export default function LensItem({ id, name, desc, iconUrl, location, editLense, deleteLense }: IlentsItemProps) {
	const [editable, setEditable] = useState(false);

	const handleEditLensSubmit = (formData: IlensItem) => {
		// Prevent submit if no values were changed
		if (formData.name !== name || formData.desc !== desc || formData.iconUrl !== iconUrl) {
			editLense(formData.id, formData);
		}
	};

	return (
		<div>
			{editable ? (
				<LensForm
					initialValues={{ id, name, desc, iconUrl, location }}
					onSubmit={handleEditLensSubmit}
					validationSchema={lensValidationSchema}
					setEditable={setEditable}
				/>
			) : (
				<Card className="sm:w-lens-card">
					<CardHeader className="overflow-y-auto h-32">
						<CardTitle className="text-lg md:text-base">{name}</CardTitle>
						<CardDescription className="text-lg md:text-sm">{desc}</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center h-20">
						<Avatar>
							<AvatarImage src={iconUrl} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</CardContent>
					<CardFooter className="flex justify-between h-14">
						<Button className="w-form-button" onClick={() => setEditable(!editable)}>
							<Pencil />
						</Button>
						<Button className="w-form-button" variant="destructive" size="icon" onClick={() => deleteLense(id)}>
							<Trash2 />
						</Button>
						<a target="_blank" rel="noreferrer" href={location}>
							<Button className="w-form-button" variant="secondary">
								<CirclePlay />
							</Button>
						</a>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
