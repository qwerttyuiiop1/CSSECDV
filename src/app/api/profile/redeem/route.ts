import { withUser } from "@/lib/session/withUser";
import { NextResponse } from "next/server";
import prisma from '@prisma';
import { RedeemCode, mapRedeemCode, redeemCodeSelection } from "@type/RedeemCode";

export const POST = withUser(async (req) => {
  let error = ''
  try {
	throw new Error("Not implemented");
	const { amount } = await req.json();
	if (typeof amount !== 'number' || amount <= 0)
		return NextResponse.json({error: "invalid request"}, {status: 400})
	const res = await prisma.$transaction(async (prisma) => {
		const code = '' // TODO: generate code
		const user = await prisma.user.update({
			where: { email: req.user.email },
			data: {
				points: { decrement: amount }
			},
			select: { points: true }
		})
		if (user.points < 0) {
			error = "Not enough points"
			throw new Error(error)
		}
		return await prisma.redeemCode.create({
			data: {
				amount,
				createdBy: req.user.email,
				code
			},
			...redeemCodeSelection
		})
	})
	const code: RedeemCode = mapRedeemCode(res)
	return NextResponse.json({code})
  } catch (e) {
	console.error(e)
	return NextResponse.json({error: error || "Something went wrong"}, {status: 400})
  }
})