import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { withAnyUser } from "@/lib/session/withUser";
import { userDetailSelection } from "@/lib/types/User";
import { validatePatch } from "../validate";
import bcrypt from 'bcrypt';
export const GET = withAnyUser(async (req) => {
	const detail = req.nextUrl.searchParams.get('detail') === 'true';
	if (!detail)
		return NextResponse.json(req.user);
	const res = await prisma.user.findUnique({
		where: { email: req.user.email },
		select: userDetailSelection
	});
	return NextResponse.json(res);
})
export const PATCH = withAnyUser(async (req) => {
	const data = validatePatch(await req.json());
	if (typeof data === 'string')
		return NextResponse.json({ message: data }, { status: 400 });
	const user = await prisma.user.findUnique({
		where: { email: req.user.email },
		select: { password: true }
	});
	if (!user)
		return NextResponse.json({ message: 'User not found' }, { status: 400 });
	if (user.password) {
		if (data.oldPassword === undefined)
			return NextResponse.json({ message: 'Old password is required' }, { status: 400 });
		if (bcrypt.compareSync(data.oldPassword, user.password) === false)
			return NextResponse.json({ message: 'Old password is incorrect' }, { status: 400 });
		if (bcrypt.compareSync(data.password!, user.password) === true)
			return NextResponse.json({ message: 'New password must be different from old password' }, { status: 400 });
		data.password = bcrypt.hashSync(data.password!, 10);
		delete data.oldPassword;
	}
	
	const res = await prisma.user.update({
		where: { email: req.user.email },
		data: data
	});
	return NextResponse.json(res);
})