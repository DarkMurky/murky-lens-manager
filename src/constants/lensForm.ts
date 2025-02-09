import type { IformConfig } from "@/types/lens";

export const FormConfig: IformConfig = {
	fields: [
		{ id: "name", name: "name", label: "Name", placeholder: "Enter name" },
		{ id: "desc", name: "desc", label: "Description", placeholder: "Enter description" },
		{ id: "iconUrl", name: "iconUrl", label: "Icon URL", placeholder: "Enter icon URL" },
		{ id: "location", name: "location", label: "location", placeholder: "Enter location" },
	],
};
