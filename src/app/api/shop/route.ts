import prisma from '@/lib/prisma/prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { mapAdminShop, adminShopSelection } from '@/lib/types/AdminShop';
import { Shop, mapShop, shopSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withOptionalUser(async (req) => {
	const all = req.nextUrl.searchParams.get('full') !== 'false';
	if (all) {
		if (req.isAdmin === true) {
			const shops = await prisma.shop.findMany(adminShopSelection);
			const test = shops.map(mapAdminShop);
			test[0].products[0].codes[0].isUsed = {
				userEmail: "aljenslknflke"
			}
			return NextResponse.json({ shops: test });
		}
		const shops = await prisma.shop.findMany(shopSelection);
		return NextResponse.json({ shops: shops.map(mapShop) });
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
	const shop = await prisma.shopH.create({
	  data: {
		name,
		isActive: { create: {} }
	  },
	  select: { name: true }
	});
	(shop as Shop).products = [];
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});