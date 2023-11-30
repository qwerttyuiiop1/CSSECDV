import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { withAnyUser } from "@/lib/session/withUser";
import { userDetailSelection, userSelection } from "@/lib/types/User";
import { validatePatch, validateSignup, validUser } from "./validate";
import bcrypt from 'bcrypt';
import { UserRole } from "@prisma/client";


export const POST = async (req: NextRequest) => {
  try {
    const data = validateSignup(await req.json());
    if (typeof data === 'string')
	  return NextResponse.json({ error: data }, { status: 400 });
	data.password = bcrypt.hashSync(data.password!, 10);
	(data as any).role = UserRole.USER;
	const detail = req.nextUrl.searchParams.get('detail') === 'true';
  	const user = await prisma.user.create({ 
		data,
		select: detail ? userDetailSelection : userSelection
	});
	return NextResponse.json(user);
  } catch (error) {
	console.error(error);
  	return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export const GET = withAnyUser(async (req) => {
	const detail = req.nextUrl.searchParams.get('detail') === 'true';
	const res = await prisma.user.findUnique({
		where: { email: req.user.email },
		select: detail ? userDetailSelection : userSelection
	});
	return NextResponse.json(res);
})


export const PATCH = withAnyUser(async (req) => {
  try {
	const data = validatePatch(await req.json());
	if (typeof data === 'string')
		return NextResponse.json({ error: data }, { status: 400 });
	const user = await prisma.user.findUnique({
		where: { email: req.user.email },
		select: { password: true }
	});
	if (!user)
		return NextResponse.json({ error: 'User not found' }, { status: 400 });
	if (user.password) {
		if (data.oldPassword === undefined)
			return NextResponse.json({ error: 'Old password is required' }, { status: 400 });
		if (bcrypt.compareSync(data.oldPassword, user.password) === false)
			return NextResponse.json({ error: 'Old password is incorrect' }, { status: 400 });
		if (bcrypt.compareSync(data.password!, user.password) === true)
			return NextResponse.json({ error: 'New password must be different from old password' }, { status: 400 });
		data.password = bcrypt.hashSync(data.password!, 10);
		delete data.oldPassword;
	}
	
	const res = await prisma.user.update({
		where: { email: req.user.email },
		data: data,
		select: userDetailSelection
	});
	if (res.role === UserRole.UNVERIFIED && validUser(res) === true) {
		await prisma.user.update({
			where: { email: req.user.email },
			data: { role: UserRole.USER }
		});
		res.role = UserRole.USER;
	}
	return NextResponse.json(res);
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
})