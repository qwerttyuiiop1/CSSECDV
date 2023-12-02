import { NextResponse } from "next/server";
import { withAnyUser } from "@/lib/session/withUser";

export const GET = withAnyUser(async (req) =>{
	try {
		// scripts here
		return NextResponse.json(req.user)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
	}
})