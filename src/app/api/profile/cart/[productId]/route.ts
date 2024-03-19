import prisma from '@prisma';
import { withUser } from '@/lib/session/withUser';
import { NextResponse } from 'next/server';
type Params = {
	params: {
		productId: string
	}
}

export const DELETE = withUser(async (req, { params }: Params) => {
	const { cartId } = req.user;
	const { productId } = params;
	await prisma.cartItem.delete({
		where: { 
			cartId_productId: { 
				cartId, 
				productId: parseInt(productId)
			}
		}
	});
	return NextResponse.json({ success: true });
})