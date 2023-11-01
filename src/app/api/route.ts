import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextRequest) => {
	const session = await getToken({ req, secret: process.env.SECRET });
	if (!session)
		return NextResponse.json({ message: "Not logged in" }, { status: 401 });
	return NextResponse.json(session)
}

export { handler as GET }