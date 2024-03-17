import prisma from '@prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { AdminProduct, adminProductSelection } from '@type/AdminShop';
import { NextRequest, NextResponse } from 'next/server';
import { validate } from '../validate';
import { Product, mapProduct, productSelection } from '@type/Shop';
type Params = {
	params: {
		name: string;
		productName: string;
	}
}

export const GET = withOptionalUser(async (req, {params: { name, productName }}: Params) => {
	try {
		const select = req.isAdmin ? adminProductSelection : productSelection;
		const res = await prisma.product.findUniqueOrThrow({
			where: {
				name_shopName: {
					name: productName,
					shopName: name
				},
			},
			...select
		});
		const product: AdminProduct | Product = mapProduct(res);
		return NextResponse.json({ product });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Product not found' }, {status: 404});
	}
})

export const PATCH = withAdmin(async (req, {params: { name: shopName, productName }}: Params) => {
  try {
	const data = validate(await req.json());
	if (typeof data === 'string')
		return NextResponse.json({ error: data }, {status: 400});
	const prod = await prisma.product.findUnique({
		where: {
			name_shopName: {
				name: productName,
				shopName: shopName
			},
		},
		select: {
			id: true,
			shopId: true,
			version: true
		}
	});
	if (!prod)
		return NextResponse.json({ error: 'Product not found' }, {status: 404});
	await prisma.product.update({
	  where: {
		name_shopName: {
		  name: productName,
		  shopName
		},
	  },
	  data: {
		product: {
		  create: {
			shop: {
			  connect: {
				id: prod.shopId
			  }
			},
			...data,
			version: prod.version + 1,
			id: prod.id
		  }
		}
	  }
	});
	// update returns null for some reason
	// query again to get the updated product
	const res = await prisma.product.findUniqueOrThrow({
		where: { id: prod.id },
		...adminProductSelection
	});
	const product: AdminProduct = mapProduct(res);
	return NextResponse.json({ product });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});

export const DELETE = withAdmin(async (_: NextRequest, {params: { name, productName }}: Params) => {
  try {
	const res = await prisma.product.delete({
		where: {
			name_shopName: {
				name: productName,
				shopName: name
			},
		},
		...adminProductSelection
	});
	const product: AdminProduct = mapProduct(res);
	return NextResponse.json({ product });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});