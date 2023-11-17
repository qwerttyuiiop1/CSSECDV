import prisma from "@/lib/prisma/prisma";
import { withSuperAdmin } from "@/lib/session/withUser";
import { userDetailSelection } from "@/lib/types/User";
import { NextResponse } from "next/server";

export const GET = withSuperAdmin(async (req) => {
	const users = await prisma.user.findMany({
		select: userDetailSelection
	})
	return NextResponse.json(users, { status: 200 });
});