"use client";

import RegisterForm from "@/components/register/registerForm";
import { registerValidationSchema } from "@/constants/schema";
import type { Iregister } from "@/types/user";

export default function Register() {
	const onSubmit = (values: Iregister) => {
		console.log("hello", values);
	};

	const initialValues: Iregister = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	return (
		<div className="container mx-auto p-2 overflow-auto mb-main-offset sm:w-form-card">
			<RegisterForm
				type="register"
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={registerValidationSchema}
			/>
		</div>
	);
}
