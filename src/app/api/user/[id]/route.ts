import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { withAnyUser } from "@/lib/session/withUser";
import { userDetailSelection } from "@/lib/types/User";
import { validatePatch } from "../validate";
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
		if (user.password !== data.oldPassword)
			return NextResponse.json({ message: 'Old password is incorrect' }, { status: 400 });
		if (user.password === data.password)
			return NextResponse.json({ message: 'New password must be different from old password' }, { status: 400 });
		delete data.oldPassword;
	}
	
	const res = await prisma.user.update({
		where: { email: req.user.email },
		data: data
	});
	return NextResponse.json(res);
})