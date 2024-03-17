import prisma from "@prisma";
import { withAdmin } from "@/lib/session/withUser";
import { UserDetail, mapUser, userDetailSelection } from "@type/User";
import { NextResponse } from "next/server";

export const GET = withAdmin(async () => {
	const res = await prisma.user.findMany({
		select: userDetailSelection
	})
	const users: UserDetail[] = res.map(mapUser)
	return NextResponse.json(users, { status: 200 });
});