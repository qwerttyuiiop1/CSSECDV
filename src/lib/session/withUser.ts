import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../types/User";
import { UserRole } from "@prisma/client";

type Extra = {
	user: User
	token: JWT
	isAdmin: boolean
}
type UserRequest = NextRequest & Extra
type OptionalRequest = NextRequest & (Extra | { [K in keyof Extra]: null | undefined })
export type UserHandler<T> = (req: UserRequest, params: T) => NextResponse | Promise<NextResponse>;
export type OptionalHandler<T> = (req: OptionalRequest, params: T) => NextResponse | Promise<NextResponse>;
const withOptionalUser = <T=undefined>(handler: OptionalHandler<T>) =>
	async (req: NextRequest, t: T) => {
	  try {
		const token = await getToken({ req, secret: process.env.SECRET });
		const ureq = req as OptionalRequest;
		if (token && token.expires >= Date.now()) {
			ureq.user = token.user;
			ureq.token = token;
			ureq.isAdmin = ureq.user.role === UserRole.ADMIN;
		}
		return handler(ureq, t);
	  } catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
	  }
	}
const withAnyUser = <T=undefined>(handler: UserHandler<T>) =>
	withOptionalUser((req, t: T) => {
		if (!req.user)
			return NextResponse.json({ error: "Not logged in" }, { status: 401 });
		return handler(req as UserRequest, t);
	})
const withUser = <T=undefined>(handler: UserHandler<T>) =>
	withAnyUser((req, t: T) => {
		if (req.user.role === UserRole.UNVERIFIED)
			return NextResponse.json({ error: "User not verified" }, { status: 401 });
		return handler(req, t);
	});
const withAdmin = <T=undefined>(handler: UserHandler<T>) =>
	withAnyUser((req, t: T) => {
		if (req.user.role !== UserRole.ADMIN)
			return NextResponse.json({ error: "User not admin" }, { status: 401 });
		return handler(req, t);
	});
export {
	withOptionalUser,
	withAnyUser,
	withUser,
	withAdmin
}