import { FieldValues, RegisterOptions, UseFormReturn, UseFormWatch } from "react-hook-form";

const username: RegisterOptions<FieldValues, string> = {
	required: "Username is required.",
	minLength: {
		value: 5,
		message: "Username must be at least 5 characters."
	},
	maxLength: {
		value: 20,
		message: "Username can only be at most 20 characters."
	},
}

const email: RegisterOptions<FieldValues, string> = {
	required: "Email is required.",
	pattern: {
		value: /^(\([^\n]+\))?([a-zA-Z\d]+([!#$%&'*+\-/=?^_'{|}~.][a-zA-Z\d]+)*|\"([^\"\\\n]|\\\\|\\\")+\")(\([^\n]+\))?@[a-zA-Z\d]+([-.][a-zA-Z\d]+)*\.[a-zA-Z]{2,}$/,
		message: "Please enter a valid Email."
	}
}
const password: RegisterOptions<FieldValues, string> = {
	required: "Password is required.",
	minLength: {
		value: 12,
		message: "Password must be at least 12 characters."
	},
	maxLength: {
		value: 64,
		message: "Password can only be at most 64 characters."
	},
	pattern: {
		value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{12,64}$/,
		message: "Password must contain at least 1 digit, 1 upper case, 1 lower case, and 1 special character."
	}
}
const address: RegisterOptions<FieldValues, string> = {
	required: "Address Line 1 is required."
}
const phone_code: RegisterOptions<FieldValues, string> = {
	required: "Phone Country Code is required.",
	min: {
		value: 1,
		message: "Please enter a valid Phone Country Code."
	},
}
const phone_number: RegisterOptions<FieldValues, string> = {
	required: "Phone Number is required.",
	min: {
		value: 1000000000,
		message: "Please enter a valid Phone Number."
	},
	max: {
		value: 9999999999,
		message: "Please enter a valid Phone Number."
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