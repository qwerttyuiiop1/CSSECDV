import { withUser } from "@/lib/session/withUser";
import prisma from "@prisma";
import { NextResponse } from 'next/server';

export const POST = withUser(async (req) => {
	try {
		const { code, productId, isRedeemed } = await req.json();
		if (typeof code !== 'string' || typeof productId !== 'number' || typeof isRedeemed !== 'boolean') {
			return NextResponse.json({error: 'Invalid request'}, {status: 400});
		}
		await prisma.codeH.update({
			where: {
				code_productId: {
					productId,
					code
				},
				isVerified: false
			},
			data: { isRedeemed },
			select: { isRedeemed: true }
		})
		return NextResponse.json({success: true})
	} catch (error) {
		console.error(error)
		return NextResponse.json({error: "Something went wrong"}, {status: 500})
	}
})