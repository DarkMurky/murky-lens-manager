import * as yup from "yup";

export const lensValidationSchema = yup.object({
	name: yup.string().trim().required("Name is required.").max(16),
	desc: yup.string().required("Description is required.").max(30),
	iconUrl: yup.string().required("IconUrl is required."),
	location: yup.string().required("Location is required."),
});

export const loginValidationSchema = yup.object({
	username: yup.string().trim().required("Username is required."),
	password: yup.string().required("Password is required."),
});

export const registerValidationSchema = yup.object({
	username: yup.string().trim().required("Username is required."),
	password: yup.string().required("Password is required."),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Confirm password is required."),
});
