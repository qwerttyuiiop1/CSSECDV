import { DBUser, UserDetail } from "@/lib/types/User";
import { validateBufferMIMEType } from 'validate-image-type';
type Data = Pick<DBUser, 'name' | 'password' | 'address1' | 'address2' | 'city' | 'country' | 'mobileno'>
export type PatchBody = Partial<Data> & { image?: string; oldPassword?: string; }
export type SignupBody = Required<Data> & { email: string; pfp: Buffer; }

export const validUser = (user: UserDetail): boolean => {
	if (user.address1 === null || user.city === null || user.country === null || user.mobileno === null)
		return false;
	return true;
}

export const validateSignup = async (body: FormData): Promise<string | SignupBody> => {
	const name = body.get('name');
	const email = body.get('email');
	const password = body.get('password');
	const address1 = body.get('address1');
	const city = body.get('city');
	const country = body.get('country');
	const phone_code = body.get('phone_code');
	const phone = body.get('phone');
	const address2 = body.get('address2');
	const pfp = body.get('pfp') as File;

	if (!(name && email && password && 
		address1 && city && country && phone_code && phone))
		return 'Missing required fields';

	if (typeof name !== 'string' || name.length < 5 || name.length > 20)
		return 'Username must be between 5 and 20 characters';
	if (typeof email !== 'string' || /\S+@\S+\.\S+/i.test(email) === false)
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


	if (!pfp)
		return 'Profile picture is required';
	if (pfp.size > 10 * 1024 * 1024)
		return 'Profile picture must be less than 10mb';

	const buffer = Buffer.from(await pfp.arrayBuffer());
	const res = await validateBufferMIMEType(buffer, {
		allowMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
	});
	if (!res.ok)
		return 'Invalid profile picture';

	// TODO: validate phone
	if (typeof phone_code !== 'string' || typeof phone !== 'string')
		return 'Invalid phone number';
	return {
		name,
		email,
		password,
		address1,
		city,
		country,
		mobileno: phone_code + phone,
		address2: address2 || null,
		pfp: buffer
	};
}

// TODO: patch for image
export const validatePatch = (body: any): string | PatchBody => {
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
		ret.password = password
		if (!oldPassword)
			return 'Old password is required';
		ret.oldPassword = oldPassword;
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