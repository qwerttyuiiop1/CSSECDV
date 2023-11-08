import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../types/User";
import { UserRole } from "@prisma/client";

type UserRequest = NextRequest & {
	user: User
	token: JWT
}
export type UserHandler = (req: UserRequest) => NextResponse | Promise<NextResponse>;

const withAnyUser = (handler: UserHandler) => 
	async (req: NextRequest) => {
		const token = await getToken({ req, secret: process.env.SECRET });
		if (!token)
			return NextResponse.json({ message: "Not logged in" }, { status: 401 });
		const ureq = req as UserRequest;
		ureq.token = token;
		ureq.user = token.user as User;
		return handler(ureq);
	}
const withUser = (handler: UserHandler) =>
	withAnyUser((req) => {
		if (req.user.role === UserRole.UNVERIFIED)
			return NextResponse.json({ message: "User not verified" }, { status: 401 });
		return handler(req);
	});
const withAdmin = (handler: UserHandler) =>
	withAnyUser((req) => {
		if (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.SUPERADMIN)
			return NextResponse.json({ message: "User not admin" }, { status: 401 });
		return handler(req);
	});

export {
	withAnyUser,
	withUser,
	withAdmin
}