import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { withAnyUser } from "@/lib/session/withUser";
import { mapUser, userDetailSelection, userSelection } from "@/lib/types/User";
import { validatePatch, validateSignup, validUser } from "./validate";
import bcrypt from 'bcrypt';
import { UserRole } from "@prisma/client";


export const POST = async (req: NextRequest) => {
  try {
	const form = await req.formData();
	const recaptcha = form.get('recaptcha');
	if (!recaptcha) 
		return NextResponse.json({ error: 'No captcha token provided' }, { status: 400 });
	const response = await fetch('https://www.google.com/recaptcha/api/siteverify' + 
		`?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`, {
		method: 'POST'
	});
	const { success } = await response.json();
	if (!response.ok || success !== true) 
		return NextResponse.json({ error: 'Failed to verify captcha' }, { status: 400 });

    const res = await validateSignup(form);
    if (typeof res === 'string')
	  return NextResponse.json({ error: res }, { status: 400 });
	res.password = bcrypt.hashSync(res.password!, 10);
	const detail = req.nextUrl.searchParams.get('detail') === 'true';

	const data = { 
		...res, 
		pfp: undefined, 
		role: UserRole.USER
	};
	const user = await prisma.user.create({ 
		data: {
			...data,
			rel_image: {
				create: { file: res.pfp }
			}
		},
		select: detail ? userDetailSelection : userSelection
	});
	await prisma.image.update({
		where: { id: user.imageid! },
		data: { ownerEmail: user.email }
	});
	return NextResponse.json({ user: mapUser(user)});
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
	if (!res)
		return NextResponse.json({ error: 'User not found' }, { status: 400 });
	return NextResponse.json(mapUser(res));
})


export const PATCH = withAnyUser(async (req) => {
  try {
	const data = validatePatch(await req.json());
	if (typeof data === 'string')
		return NextResponse.json({ error: data }, { status: 400 });
	if (data.password) {
		const user = await prisma.user.findUnique({
			where: { email: req.user.email },
			select: { password: true }
		});
		if (!user || !user.password)
			return NextResponse.json({ error: 'User or password not found' }, { status: 400 })

		if (bcrypt.compareSync(data.oldPassword!, user.password) === false)
			return NextResponse.json({ error: 'Old password is incorrect' }, { status: 400 });
		if (bcrypt.compareSync(data.password!, user.password) === true)
			return NextResponse.json({ error: 'New password must be different from old password' }, { status: 400 });
		data.password = bcrypt.hashSync(data.password!, 10);
		delete data.oldPassword;
	}
	
	const res = mapUser(await prisma.user.update({
		where: { email: req.user.email },
		data: data,
		select: userDetailSelection
	}));
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