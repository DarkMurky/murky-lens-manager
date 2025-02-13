import * as yup from "yup";

export const LENS_VALIDATION_SCHEMA = yup.object({
	name: yup.string().trim().required("Name is required").max(16),
	desc: yup.string().required("Description is required").max(30),
	iconUrl: yup.string().required("IconUrl is required"),
	location: yup.string().required("Location is required"),
});

export const LOGIN_VALIDATION_SCHEMA = yup.object({
	email: yup.string().trim().email("Invalid email format.").required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const REGISTER_VALIDATION_SCHEMA = yup.object({
	email: yup.string().trim().email("Invalid email format.").required("Email is required"),
	password: yup.string().required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Confirm password is required"),
});
