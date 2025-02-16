import type { IlensItem } from "./lens";

export interface IgetResponse {
	success: boolean;
	message: string;
	payload?: IlensItem[];
}
