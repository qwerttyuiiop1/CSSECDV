import bcrypt from 'bcrypt';
import { DBUser } from "@/lib/types/User";
type Data = Pick<DBUser, 'name' | 'password' | 'address1' | 'address2' | 'city' | 'country' | 'mobileno'>
type PatchBody = Partial<Data> & { image?: string; oldPassword?: string; }
type SignupBody = Required<Data> & { email: string; address2?: string; }

export const validateSignup = (body: any): string | SignupBody => {
	const { 
		name,
		email,
		password,
	
		address1,
		city,
		country,
		phone_code,
		phone,
	
		address2,
	} = body;
	if (!(name && email && password && 
		address1 && city && country && phone_code && phone))
		return 'Missing required fields';

	if (typeof name !== 'string' || name.length < 5 || name.length > 20)
		return 'Username must be between 5 and 20 characters';
	if (/\S+@\S+\.\S+/i.test(email) === false)
		return 'Invalid email';
	if (typeof password !== 'string' || password.length < 8)
		return 'Password must be at least 8 characters long';
	if (typeof address1 !== 'string' || address1.length < 5 || address1.length > 100)
		return 'Address must be between 5 and 100 characters';
	if (typeof city !== 'string' || city.length < 3 || city.length > 100)
		return 'City must be between 3 and 100 characters';
	if (typeof country !== 'string' || country.length < 3 || country.length > 100)
		return 'Country must be between 3 and 100 characters';
	if (address2 && (typeof address2 !== 'string' || address2.length < 5 || address2.length > 100))
		return 'Address must be between 5 and 100 characters';

	// TODO: validate phone
	return {
		name,
		email,
		password: bcrypt.hashSync(password, 10),
		address1,
		city,
		country,
		mobileno: phone_code + phone,
		address2
	};
}

export const validatePatch = (body: PatchBody): string | PatchBody => {
	const ret = {} as PatchBody;
	const { name, password, oldPassword, address1, address2, city, country, mobileno, image } = body;

	if (name) {
		if (typeof name !== 'string' || name.length < 5 || name.length > 20)
			return 'Username must be between 5 and 20 characters';
		ret.name = name;
	}
	if (password) {
		if (typeof password !== 'string' || password.length < 8)
			return 'Password must be at least 8 characters long';
		ret.password = bcrypt.hashSync(password, 10);
		if (oldPassword)
			ret.oldPassword = bcrypt.hashSync(oldPassword, 10);
	}
	if (address1) {
		if (typeof address1 !== 'string' || address1.length < 5 || address1.length > 100)
			return 'Address must be between 5 and 100 characters';
		ret.address1 = address1;
	}
	if (address2) {
		if (typeof address2 !== 'string' || address2.length < 5 || address2.length > 100)
			return 'Address must be between 5 and 100 characters';
		ret.address2 = address2;
	}
	if (city) {
		if (typeof city !== 'string' || city.length < 3 || city.length > 100)
			return 'City must be between 3 and 100 characters';
		ret.city = city;
	}
	if (country) {
		if (typeof country !== 'string' || country.length < 3 || country.length > 100)
			return 'Country must be between 3 and 100 characters';
		ret.country = country;
	}
	// TODO: validate phone
	if (mobileno) {
		if (typeof mobileno !== 'string')
			return 'Phone must be a string';
		ret.mobileno = mobileno;
	}
	if (image) {
		if (typeof image !== 'string')
			return 'Image must be a string';
		ret.image = image;
	}
	// TODO: validate phone
	return ret;
}