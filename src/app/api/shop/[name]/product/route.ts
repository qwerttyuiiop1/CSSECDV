import prisma from '@prisma';
import { withAdmin } from '@/lib/session/withUser';
import { mapProduct, adminProductSelection, AdminProduct } from '@type/AdminShop';
import { NextResponse } from 'next/server';
import { validate } from './validate';

type Params = {
	params: {
		name: string
	}
}
export const POST = withAdmin(async (req, {params:{name}}: Params) => {
  try {
	const data = validate(await req.json());
	if (typeof data === 'string')
		return NextResponse.json({ error: data }, { status: 400 });
	const { id: shopId } = await prisma.shop.findUniqueOrThrow({
		where: { name }
	});
	const res = await prisma.product.create({
		data: {
			product: {
				create: {
					...data,
					shop: { connect: { id: shopId } }
				}
			},
			shop: { connect: { name } }
		},
		...adminProductSelection
	});
	const product: AdminProduct = mapProduct(res);
	return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});