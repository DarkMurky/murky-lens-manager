export const REQUEST_PATHS = {
	getAllLenses: "/api/lenses",
	createLense: "/api/lenses",
	editLense: (id: number) => `/api/lenses/${id}`,
	deleteLense: (id: number) => `/api/lenses/${id}`,
	login: "/api/auth/login",
	register: "/api/auth/register",
	check: "/api/user/check",
	logout: "/api/auth/logout",
};

export const REQUEST_MESSAGES = {
	getLense: {
		success: "Successflly got all lenses",
		error: "Could not get lenses",
	},
	removeLense: {
		success: "Successflly removed the lense",
		error: "Could not remove the lense",
	},
	updateLense: {
		success: "Successflly updated the lense",
		error: "Could not updated the lense",
	},
	createLense: {
		success: "Successflly created a lense",
		error: "Could not create a lense",
	},
	login: {
		success: "Successflly logged in",
		error: "Wrong email or password",
	},
	check: {
		success: "User authorized",
		error: "Could not authorize user",
	},
	logout: {
		success: "Successflly logged out",
		error: "Could not log out",
	},
	register: {
		success: "Successflly created your new account",
		error: "Could not create an account",
	},
};
