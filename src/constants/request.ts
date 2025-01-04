export const requestUrls = {
	getAllLenses: "/api/lenses",
	createLense: "/api/lenses",
	editLense: (id: number) => `/api/lenses/${id}`,
	deleteLense: (id: number) => `/api/lenses/${id}`,
};
