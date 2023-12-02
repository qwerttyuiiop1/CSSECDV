import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../types/User";
import { UserRole } from "@prisma/client";

type UserRequest = NextRequest & {
	user: User
	token: JWT
}
type OptionalRequest = NextRequest & {
	user?: User
	token?: JWT
	isAdmin?: boolean
}
export type UserHandler<T> = (req: UserRequest, params: T) => NextResponse | Promise<NextResponse>;
export type OptionalHandler<T> = (req: OptionalRequest, params: T) => NextResponse | Promise<NextResponse>;
const withOptionalUser = <T=undefined>(handler: OptionalHandler<T>) =>
	async (req: NextRequest, t: T) => {
		const token = await getToken({ req, secret: process.env.SECRET });
		const ureq = req as OptionalRequest;
		if (token) {
			ureq.user = token.user as User;
			ureq.token = token;
			ureq.isAdmin = ureq.user.role === UserRole.ADMIN || ureq.user.role === UserRole.SUPERADMIN;
		}
		return handler(ureq, t);
	}
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
	withOptionalUser,
	withAnyUser,
	withUser,
	withAdmin,
	withSuperAdmin,
}