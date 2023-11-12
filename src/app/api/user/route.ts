import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { withSuperAdmin } from "@/lib/session/withUser";
import { userDetailSelection, userSelection } from "@/lib/types/User";
import { validateSignup } from "./validate";
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
  try {
    const data = validateSignup(await req.json());
    if (typeof data === 'string')
	  return new NextResponse(data, { status: 400 });
	data.password = bcrypt.hashSync(data.password!, 10);
  	const user = await prisma.user.create({ data });
	return NextResponse.json(user);
  } catch (error) {
	console.error(error);
  	return new NextResponse("Something went wrong", { status: 500 });
  }
}

export const GET = withSuperAdmin(async (req) => {
	const detail = req.nextUrl.searchParams.get('detail') === 'true';
	const users = await prisma.user.findMany({
		select: detail ? userDetailSelection : userSelection
	});
	return NextResponse.json({ users });
})