// api/shop/[id]/route.ts
import prisma from '@prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { AdminShop, adminShopSelection } from '@type/AdminShop';
import { Shop, mapShop, shopSelection } from '@type/Shop';
import { NextRequest, NextResponse } from 'next/server';
import { validateImage } from '@/lib/types/Image';

type Params = {
	params: {
		name: string
	}
}
export const GET = withOptionalUser(async (req, {params: { name }}: Params) => {
	try {
		const all = req.nextUrl.searchParams.get('all') !== 'false';
		if (!all) {
			const res = await prisma.shop.findUniqueOrThrow({
				where: { name },
				select: {
					...shopSelection.select,
					products: undefined
				}
			});
			(res as any).products = [];
			const shop: Shop = mapShop(res as typeof res & { products: [] });
			return NextResponse.json({ shop });
		}
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
	const form = await req.formData();
	const newName = form.get('name');
	const img = form.get('img') as File | null;
	if (typeof newName !== 'string' || newName.length < 3 || newName.length > 100) {
		return NextResponse.json({ error: 'Name must be at least 3 characters long' }, { status: 400 });
	}
	const buffer = img && await validateImage(img);
	if (img && typeof buffer === 'string')
		return NextResponse.json({ error: buffer }, { status: 400 });

	await prisma.shop.update({
		where: { name },
		data: { 
			shop: {
				update: {
					name: newName,
					image: img ? { update: { file: buffer as Buffer, isPublic: true } } : undefined
				}
			},
		},
		select: { id: true }
	});
	const res = await prisma.shop.findUniqueOrThrow({
		where: { name: newName },
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