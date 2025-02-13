"use client";

import { registerAction } from "@/actions/authActions";
import AuthForm from "@/components/register/authForm";
import { DEFAULT_REDIRECT } from "@/constants/routes";
import { REGISTER_VALIDATION_SCHEMA } from "@/constants/schema";
import { useToast } from "@/hooks/use-toast";
import type { Iregister } from "@/types/user";
import { redirect } from "next/navigation";

export default function Register() {
	const { toast } = useToast();

	const onSubmit = async (values: Iregister) => {
		const data = await registerAction(values);
		toast({
			title: data.message,
		});
		if (data.success) {
			redirect(DEFAULT_REDIRECT);
		}
	};

	const initialValues: Iregister = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	return (
		<div className="container mx-auto p-2 overflow-auto mb-main-offset sm:w-form-card">
			<AuthForm
				type="register"
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={REGISTER_VALIDATION_SCHEMA}
			/>
		</div>
	);
}
