import { NextResponse } from "next/server";
import { withOptionalUser } from "@/lib/session/withUser";

export const GET = withOptionalUser(async (req) =>{
	try {
		// scripts here
		if (!req.user) return NextResponse.json({ error: "User not found" }, { status: 404 });
		return NextResponse.json(req.user)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
	}
})