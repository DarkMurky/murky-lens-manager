const handleUnexpectedError = (error: unknown) => {
	console.error("Unexcpected error occured:", error);
	return {
		success: false,
		message: "Unexcpected error occured, try again later.",
	};
};

export default handleUnexpectedError;
