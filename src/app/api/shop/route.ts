import prisma from '@prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { AdminShop, adminShopSelection } from '@type/AdminShop';
import { Shop, mapShop, shopSelection } from '@type/Shop';
import { NextRequest, NextResponse } from 'next/server';
import { validateImage } from '@/lib/types/Image';

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
	const form = await req.formData();
	const name = form.get('name');
	const img = form.get('img') as File;
	if (typeof name !== 'string' || name.length < 3 || name.length > 100) {
		return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
	}
	const buffer = await validateImage(img);
	if (typeof buffer === 'string')
		return NextResponse.json({ error: buffer }, { status: 400 });

	const res = await prisma.shopH.create({
	  data: {
		name,
		isActive: { create: {} },
		image: { create: { file: buffer, isPublic: true } }
	  },
	  select: {
		name: true,
		imageid: true,
		id: true,
	  }
	});
	const shop: AdminShop = mapShop({
	  name: res.name,
	  id: res.id,
	  products: [],
	  shop: { imageid: res.imageid }
	});
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});