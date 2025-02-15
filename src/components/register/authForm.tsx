import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FORM_CONFIG } from "@/constants/forms";
import type { Ilogin, IloginUserFormField, Iregister, IregisterUserFormField } from "@/types/user";
import { useFormik } from "formik";
import { LogIn } from "lucide-react";

import Link from "next/link";
import type { FormEvent } from "react";
import type * as yup from "yup";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface IuserFormRegisterSchema extends Omit<Iregister, "id"> {}
interface IuserFormLoginSchema extends Omit<Ilogin, "id"> {}

interface IlensFormProps {
	type: "login" | "register";
	initialValues: Iregister | Ilogin; // Allow initialValues to be either type
	onSubmit: (formData: Iregister | Ilogin) => void; // Allow onSubmit to accept either type
	validationSchema: yup.ObjectSchema<IuserFormRegisterSchema | IuserFormLoginSchema>;
	setEditable?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthForm({ type, initialValues, onSubmit, validationSchema }: IlensFormProps) {
	const formik = useFormik<Iregister | Ilogin>({
		initialValues,
		onSubmit: (values) => {
			onSubmit(values);
		},
		validationSchema,
	});

	const fields: IloginUserFormField[] | IregisterUserFormField[] =
		type === "login" ? FORM_CONFIG.login.fields : FORM_CONFIG.register.fields;

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formik.handleSubmit();
	};

	return (
		<Card>
			<form onSubmit={handleFormSubmit}>
				<CardContent className="pt-2">
					{fields.map((itemField) => (
						<div key={itemField.id}>
							<Label htmlFor={itemField.name}>{itemField.label}</Label>
							<Input
								className="h-8"
								id={itemField.name}
								name={itemField.name}
								value={formik.values[itemField.name as keyof typeof formik.values]}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								type={itemField.name === "password" ? "password" : "text"}
							/>
							<div className="text-destructive text-input-error h-5">
								{formik.errors[itemField.name as keyof typeof formik.errors] &&
									formik.errors[itemField.name as keyof typeof formik.errors]}
							</div>
						</div>
					))}
				</CardContent>
				<CardFooter className="flex justify-between">
					{type === "login" ? (
						<Link href="/register" className="text-sm font-bold tracking-tight">
							Don't have an account?
						</Link>
					) : (
						<Link href="/login" className="text-sm font-bold tracking-tight">
							Already have an account?
						</Link>
					)}
					<Button className="w-form-button" type="submit">
						<LogIn />
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
