import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import bcrypt from 'bcrypt';
import { withSuperAdmin } from "@/lib/session/withUser";
import { userSelection } from "@/lib/types/User";

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
	if (username.length < 5 || username.length > 20)
		return 'Username must be between 5 and 20 characters';
	if (/\S+@\S+\.\S+/i.test(email) === false)
		return 'Invalid email';
	if (password.length < 8)
		return 'Password must be at least 8 characters long';
	
	// TODO: validate phone, city, country, address1, address2
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
export const POST = async (req: Request) => {
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
export const GET = withSuperAdmin(async () => {
	const users = await prisma.user.findMany({
		select: userSelection
	});
	return NextResponse.json({ users });
})