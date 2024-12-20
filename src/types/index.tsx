export interface IlensItem {
	id: number;
	name: string;
	desc: string;
	iconUrl: string;
	location: string;
}

export interface IlensFormField {
	name: keyof IlensItem;
	id: string;
	label: string;
	placeholder: string;
}

export interface IformConfig {
	fields: IlensFormField[];
}

export interface IaccountFormValues {
	username: string;
	password: string;
	confirmPassword?: string;
}

export interface IgetLensesResponse {
	success: true;
	message: string;
	payload: IlensItem[];
}
