import type { IuserForm } from "@/types/user";

export const FormConfig: IuserForm = {
	register: {
		fields: [
			{ id: "username", name: "username", label: "Username", placeholder: "Enter username" },
			{ id: "email", name: "email", label: "Email", placeholder: "Enter email" },
			{ id: "password", name: "password", label: "Password", placeholder: "Enter Password" },
			{ id: "confirmPassword", name: "confirmPassword", label: "Confirm password", placeholder: "Confirm Password " },
		],
	},
	login: {
		fields: [
			{ id: "username", name: "username", label: "Username", placeholder: "Enter username" },
			{ id: "email", name: "email", label: "Email", placeholder: "Enter email" },
			{ id: "password", name: "password", label: "Password", placeholder: "Enter Password" },
		],
	},
};
