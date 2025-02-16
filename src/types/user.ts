export interface Iregister {
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface Ilogin {
	email: string;
	password: string;
}

export interface IregisterUserFormField {
	name: keyof Iregister;
	id: string;
	label: string;
	placeholder: string;
}

export interface IloginUserFormField {
	name: keyof Ilogin;
	id: string;
	label: string;
	placeholder: string;
}

export interface IuserForm {
	register: {
		fields: IregisterUserFormField[];
	};
	login: {
		fields: IloginUserFormField[];
	};
}
