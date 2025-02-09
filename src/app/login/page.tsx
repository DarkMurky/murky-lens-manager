"use client";

import RegisterForm from "@/components/register/registerForm";
import { loginValidationSchema } from "@/constants/schema";
import type { Iregister } from "@/types/user";

export default function Login() {
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
				type="login"
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={loginValidationSchema}
			/>
		</div>
	);
}
