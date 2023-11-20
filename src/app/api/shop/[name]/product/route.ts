import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
import { productSelection } from '@/lib/types/Shop';
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
	const product = await prisma.product.create({
		data: {
			...data,
			shop: {
				connect: { name }
			}
		},
		...productSelection
	});
	return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});