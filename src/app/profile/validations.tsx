import { FieldValues, RegisterOptions, UseFormReturn, UseFormWatch } from "react-hook-form";

const username: RegisterOptions<FieldValues, string> = {
	required: "Username is required.",
	minLength: {
		value: 5,
		message: "Username must be at least 5 characters."
	}
}

const email: RegisterOptions<FieldValues, string> = {
	required: "Email is required.",
	pattern: {
		value: /\S+@\S+\.\S+/,
		message: "Email is invalid."
	}
}
const password: RegisterOptions<FieldValues, string> = {
	required: "Password is required.",
	minLength: {
		value: 8,
		message: "Password must be at least 8 characters."
	}
}
const address1: RegisterOptions<FieldValues, string> = {
	required: "Address Line 1 is required."
}
const phone_code: RegisterOptions<FieldValues, string> = {
	required: "Phone Code is required.",
	min: {
		value: 1,
		message: "Phone Code is invalid."
	},
}
const phone: RegisterOptions<FieldValues, string> = {
	required: "Phone is required.",
	min: {
		value: 1000000000,
		message: "Phone is invalid."
	},
}
const city: RegisterOptions<FieldValues, string> = {
	required: "City is required."
}
const country: RegisterOptions<FieldValues, string> = {
	required: "Country is required."
}

export {
	username,
	email,
	password,
	address1,
	phone_code,
	phone,
	city,
	country
}