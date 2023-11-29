import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
import { productSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';
import { validate } from '../validate';
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
		return NextResponse.json({ error: 'Product not found' }, {status: 404});
	return NextResponse.json({ product });
}

export const PATCH = withAdmin(async (req: NextRequest, {params: { name, productName }}: Params) => {
  try {
	const data = validate(await req.json());
	if (typeof data === 'string')
		return NextResponse.json({ error: data }, {status: 400});
	const product = await prisma.product.update({
		where: {
			name_shopName: {
				name: productName,
				shopName: name
			},
		},
		...productSelection,
		data
	});
	return NextResponse.json({ product });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});

export const DELETE = withAdmin(async (_: NextRequest, {params: { name, productName }}: Params) => {
  try {
	await prisma.product.delete({
		where: {
			name_shopName: {
				name: productName,
				shopName: name
			},
		}
	});
	return NextResponse.json({ success: true });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});