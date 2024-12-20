export const requestUrls = {
	getAllLenses: "/lenses",
	createLense: "/lenses",
	editLense: (id: number) => `/lenses/${id}`,
	deleteLense: (id: number) => `/lenses/${id}`,
};
