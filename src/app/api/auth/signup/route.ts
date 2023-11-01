// api/auth/signup/route.ts

import prisma from "@/lib/prisma/prisma";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

type SignupBody = {
	name: string,
	email: string,
	password: string,

	address1: string,
	city: string,
	country: string,
	mobileno: string,

	address2?: string,
}
const validate = (body: any): string | SignupBody => {
	const { 
		username,
		email,
		password,
	
		address1,
		city,
		country,
		phone_code,
		phone,
	
		address2,
	} = body;
	if (!(username && email && password && 
		address1 && city && country && phone_code && phone))
		return 'Missing required fields';
	if (username.length < 8 || username.length > 20)
		return 'Username must be between 8 and 20 characters';
	if (password.length < 8)
		return 'Password must be at least 8 characters long';
	if (phone.length < 10)
		return 'Invalid phone number';

	return {
		name: username,
		email,
		password: bcrypt.hashSync(password, 10),
		address1,
		city,
		country,
		mobileno: phone_code + phone,
		address2
	};
}
const handler = async (req: Request) => {
  try {
    const data = validate(await req.json());
    if (typeof data === 'string')
	  return new NextResponse(data, { status: 400 });
  	const user = await prisma.user.create({ data });
	return NextResponse.json(user);
  } catch (error) {
	console.error(error);
  	return new NextResponse("Something went wrong", { status: 500 });
  }
}

export { handler as POST };