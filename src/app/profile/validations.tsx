import { FieldValues, RegisterOptions, UseFormReturn, UseFormWatch } from "react-hook-form";

const username: RegisterOptions<FieldValues, string> = {
	required: "Username is required.",
	minLength: {
		value: 5,
		message: "Username must be at least 5 characters."
	},
	maxLength: {
		value: 20,
		message: "Username must be at most 20 characters."
	},
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
const address: RegisterOptions<FieldValues, string> = {
	required: "Address Line 1 is required."
}
const phone_code: RegisterOptions<FieldValues, string> = {
	required: "Phone Code is required.",
	min: {
		value: 1,
		message: "Phone Code is invalid."
	},
}
const phone_number: RegisterOptions<FieldValues, string> = {
	required: "Phone is required.",
	min: {
		value: 1000000000,
		message: "Phone is invalid."
	},
	max: {
		value: 9999999999,
		message: "Phone is invalid."
	}
}
// format: (+XX) XXXXXXXXX
const phone: RegisterOptions<FieldValues, string> = {
	required: "Phone is required.",
	// pattern: {
	// 	value: /\(\+\d{2}\)\s?\d{10}/,
	// 	message: "Phone is invalid."
	// }
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
	address,
	phone,
	phone_code,
	phone_number,
	city,
	country
}