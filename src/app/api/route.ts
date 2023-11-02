import { NextResponse } from "next/server";
import { withAnyUser } from "@/lib/session/withUser";

export const GET = withAnyUser((req) => NextResponse.json(req.user))