"use client";
import { loginAction } from "@/actions/authActions";
import AuthForm from "@/components/register/authForm";
import { AUTHENTICATED_COOKIE } from "@/constants/cookies";
import { ROOT } from "@/constants/routes";
import { LOGIN_VALIDATION_SCHEMA } from "@/constants/schema";
import { useToast } from "@/hooks/use-toast";
import type { Ilogin } from "@/types/user";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function Login() {
	const { toast } = useToast();

	const onSubmit = async (values: Ilogin) => {
		const data = await loginAction(values);

		toast({
			title: data.message,
			variant: data.success ? "default" : "destructive",
		});

		if (data.success) {
			Cookies.set(AUTHENTICATED_COOKIE, "true");
			redirect(ROOT);
		}
	};

	const initialValues: Ilogin = {
		email: "",
		password: "",
	};

	return (
		<div className="page-container sm:w-form-card">
			<AuthForm
				type="login"
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={LOGIN_VALIDATION_SCHEMA}
			/>
		</div>
	);
}
