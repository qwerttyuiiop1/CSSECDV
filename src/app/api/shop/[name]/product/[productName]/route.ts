import prisma from '@/lib/prisma/prisma';
import { productSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';
type Params = {
	params: {
		name: string;
		productName: string;
	}
}

export const GET = async (_: NextRequest, {params: { name, productName }}: Params) => {
	const product = await prisma.product.findUnique({
		where: {
			name_shopName: {
				name: productName,
				shopName: name
			},
		},
		...productSelection
	});
	if (!product) 
		return NextResponse.json({ message: 'Product not found' }, {status: 404});
	return NextResponse.json({ product });
}