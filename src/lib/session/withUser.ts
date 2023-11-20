import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../types/User";
import { UserRole } from "@prisma/client";

type UserRequest = NextRequest & {
	user: User
	token: JWT
}
export type UserHandler<T> = (req: UserRequest, params: T) => NextResponse | Promise<NextResponse>;

const withAnyUser = <T=undefined>(handler: UserHandler<T>) => 
	async (req: NextRequest, t: T) => {
		const token = await getToken({ req, secret: process.env.SECRET });
		if (!token)
			return NextResponse.json({ error: "Not logged in" }, { status: 401 });
		const ureq = req as UserRequest;
		ureq.token = token;
		ureq.user = token.user as User;
		return handler(ureq, t);
	}
const withUser = <T=undefined>(handler: UserHandler<T>) =>
	withAnyUser((req, t: T) => {
		if (req.user.role === UserRole.UNVERIFIED)
			return NextResponse.json({ error: "User not verified" }, { status: 401 });
		return handler(req, t);
	});
const withAdmin = <T=undefined>(handler: UserHandler<T>) =>
	withAnyUser((req, t: T) => {
		if (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.SUPERADMIN)
			return NextResponse.json({ error: "User not admin" }, { status: 401 });
		return handler(req, t);
	});
const withSuperAdmin = <T=undefined>(handler: UserHandler<T>) =>
	withAnyUser((req, t: T) => {
		if (req.user.role !== UserRole.SUPERADMIN)
			return NextResponse.json({ error: "User not superadmin" }, { status: 401 });
		return handler(req, t);
	});
export {
	withAnyUser,
	withUser,
	withAdmin,
	withSuperAdmin,
}