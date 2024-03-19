import prisma from '@prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { AdminShop, adminShopSelection } from '@type/AdminShop';
import { Shop, mapShop, shopSelection } from '@type/Shop';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withOptionalUser(async (req) => {
	const all = req.nextUrl.searchParams.get('names') !== 'true';
	if (all) {
		const res = await prisma.shop.findMany(req.isAdmin ? adminShopSelection : shopSelection);
		const shops: AdminShop[] | Shop[] = res.map(mapShop);
		return NextResponse.json({ shops });
	}
	const shops = await prisma.shop.findMany({ select: { name: true } })
	return NextResponse.json({ shops });
});

export const POST = withAdmin(async (req: NextRequest) => {
  try {
	const { name } = await req.json()
	if (!name || name.length < 3) {
		return NextResponse.json({ error: 'Name must be at least 3 characters long' }, { status: 400 });
	}
	const res = await prisma.shopH.create({
	  data: {
		name,
		isActive: { create: {} }
	  },
	  select: { name: true, id: true }
	});
	const shop: Shop = { name: res.name, id: res.id, products: [] };
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});