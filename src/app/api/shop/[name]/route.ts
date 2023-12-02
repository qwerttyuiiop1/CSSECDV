// api/shop/[id]/route.ts
import prisma from '@/lib/prisma/prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { mapAdminShop, adminShopSelection } from '@/lib/types/AdminShop';
import { mapShop, shopSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
	params: {
		name: string
	}
}
export const GET = withOptionalUser(async (req, {params: { name }}: Params) => {
	try {
		if (req.isAdmin === true) {
			const shop = await prisma.shop.findUniqueOrThrow({
				where: { name },
				...adminShopSelection
			});
			return NextResponse.json({ shop: mapAdminShop(shop) });
		}
		const shop = await prisma.shop.findUniqueOrThrow({
			where: { name },
			...shopSelection
		});
		return NextResponse.json({ shop: mapShop(shop) });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Shop not found' }, {status: 404});
	}
})

export const PATCH = withAdmin(async (req: NextRequest, {params: { name }}: Params) => {
  try {
	const { name: newName } = await req.json();
	if (!newName || newName.length < 3) {
		return NextResponse.json({ error: 'Name must be at least 3 characters long' }, { status: 400 });
	}
	const shop = await prisma.shop.update({
		where: { name },
		data: { name: newName },
		...adminShopSelection
	});
	return NextResponse.json({ shop: mapAdminShop(shop) });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
})

export const DELETE = withAdmin(async (req: NextRequest, {params: { name }}: Params) => {
  try {
	const shop = await prisma.shop.delete({
		where: { name },
		...adminShopSelection
	});
	return NextResponse.json({ shop: mapAdminShop(shop) });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});