import type { IlenseForm } from "@/types/lens";
import type { IuserForm } from "@/types/user";

type IconfigForm = IlenseForm & IuserForm;

export const FORM_CONFIG: IconfigForm = {
	lens: {
		fields: [
			{ id: "name", name: "name", label: "Name", placeholder: "Enter name" },
			{ id: "desc", name: "desc", label: "Description", placeholder: "Enter description" },
			{ id: "iconUrl", name: "iconUrl", label: "Icon URL", placeholder: "Enter icon URL" },
			{ id: "location", name: "location", label: "location", placeholder: "Enter location" },
		],
	},
	register: {
		fields: [
			{ id: "email", name: "email", label: "Email", placeholder: "Enter email" },
			{ id: "password", name: "password", label: "Password", placeholder: "Enter Password" },
			{ id: "confirmPassword", name: "confirmPassword", label: "Confirm password", placeholder: "Confirm Password " },
		],
	},
	login: {
		fields: [
			{ id: "email", name: "email", label: "Email", placeholder: "Enter email" },
			{ id: "password", name: "password", label: "Password", placeholder: "Enter Password" },
		],
	},
};
