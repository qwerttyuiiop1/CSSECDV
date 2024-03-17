// api/shop/[id]/route.ts
import prisma from '@prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { AdminShop, adminShopSelection } from '@type/AdminShop';
import { Shop, mapShop, shopSelection } from '@type/Shop';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
	params: {
		name: string
	}
}
export const GET = withOptionalUser(async (req, {params: { name }}: Params) => {
	try {
		const select = req.isAdmin ? adminShopSelection : shopSelection;
		const res = await prisma.shop.findUniqueOrThrow({
			where: { name },
			...select
		});
		const shop: AdminShop | Shop = mapShop(res);
		return NextResponse.json({ shop });
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
	const res = await prisma.shop.update({
		where: { name },
		data: { name: newName },
		...adminShopSelection
	});
	const shop: AdminShop = mapShop(res);
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
})

export const DELETE = withAdmin(async (req: NextRequest, {params: { name }}: Params) => {
  try {
	const res = await prisma.shop.delete({
		where: { name },
		...adminShopSelection
	});
	const shop: AdminShop = mapShop(res);
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});