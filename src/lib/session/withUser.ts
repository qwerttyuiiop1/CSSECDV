import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../types/User";
import { UserRole } from "@prisma/client";
import fs from 'fs'; // Import the fs module for file operations


type Extra = {
	user: User
	token: JWT
	isAdmin: boolean
}
type UserRequest = NextRequest & Extra
type OptionalRequest = NextRequest & (Extra | { [K in keyof Extra]: null | undefined })
export type UserHandler<T> = (req: UserRequest, params: T) => NextResponse | Promise<NextResponse>;
export type OptionalHandler<T> = (req: OptionalRequest, params: T) => NextResponse | Promise<NextResponse>;

const writeToLogFile = (message: string) => {
	const logFilePath = './app.log';
	fs.appendFileSync(logFilePath, `${message}\n`);
}

const withOptionalUser = <T=undefined>(handler: OptionalHandler<T>) =>
	async (req: NextRequest, t: T) => {
		const token = await getToken({ req, secret: process.env.SECRET });
		const ureq = req as OptionalRequest;
		if (token && token.expires >= Date.now()) {
			ureq.user = token.user;
			ureq.token = token;
			ureq.isAdmin = ureq.user.role === UserRole.ADMIN;
		}

	const logMessage = `Method: ${req.method}, URL: ${req.url}, User: ${ureq.user ? ureq.user.email : 'Not logged in'}`;
	writeToLogFile(logMessage);

		return handler(ureq, t);
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