import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormConfig } from "@/constants/lensForm";
import type { IlensItem } from "@/types";
import { useFormik } from "formik";
import { PencilOff, Save } from "lucide-react";
import type * as yup from "yup";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface IlensFormSchema extends Omit<IlensItem, "id"> {}

interface IlensFormProps {
	initialValues: IlensItem;
	onSubmit: (formData: IlensItem) => void;
	validationSchema: yup.ObjectSchema<IlensFormSchema>;
	setEditable?: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenLensAdd?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LensForm({
	initialValues,
	onSubmit,
	validationSchema,
	setEditable,
	setOpenLensAdd,
}: IlensFormProps) {
	const formik = useFormik<IlensItem>({
		initialValues,
		onSubmit: (values) => {
			onSubmit(values);

			if (setEditable) setEditable(false);

			if (setOpenLensAdd) setOpenLensAdd(false);
		},
		validationSchema,
	});

	const cancelForm = () => {
		if (setOpenLensAdd) setOpenLensAdd(false);

		if (setEditable) setEditable(false);
	};

	return (
		<Card className="sm:w-lens-card">
			<CardContent className=" overflow-y-auto h-52 pt-2">
				{FormConfig.fields.map((itemField) => (
					<div key={itemField.id}>
						<Label htmlFor={itemField.name}>{itemField.label}</Label>
						<Input
							className="h-6"
							id={itemField.name}
							name={itemField.name}
							value={formik.values[itemField.name]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<div className="text-destructive text-input-error h-5">
							{formik.errors[itemField.name] && formik.errors[itemField.name]}
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter className="flex justify-between h-14">
				<Button className="w-form-button" type="button" variant="destructive" onClick={() => cancelForm()}>
					<PencilOff />
				</Button>
				<Button className="w-form-button" type="submit" onClick={() => formik.handleSubmit()}>
					<Save />
				</Button>
			</CardFooter>
		</Card>
	);
}
