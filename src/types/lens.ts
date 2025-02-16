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

export interface IlenseForm {
	lens: {
		fields: IlensFormField[];
	};
}
