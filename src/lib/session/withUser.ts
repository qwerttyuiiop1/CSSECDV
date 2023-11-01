import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type UserRequest = NextRequest & {
	// TODO: fix when user is typed
	token: JWT
}
export type UserHandler = (req: UserRequest) => NextResponse | Promise<NextResponse>;

const withUser = (handler: UserHandler) => 
	async (req: NextRequest) => {
		const token = await getToken({ req, secret: process.env.SECRET });
		if (!token)
			return NextResponse.json({ message: "Not logged in" }, { status: 401 });
		const ureq = req as UserRequest;
		ureq.token = token;
		return handler(ureq);
	}

export {
	withUser,
}