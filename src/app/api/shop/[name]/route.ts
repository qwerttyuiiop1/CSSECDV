// api/shop/[id]/route.ts
import prisma from '@/lib/prisma/prisma';
import { shopSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, {params: { name }}: {params: {name: string}}) => {
	const all = req.nextUrl.searchParams.get('all') === 'true';
	const options = all ? {
		where: { name },
		...shopSelection
	} : {
		where: { name },
	};
	const shop = await prisma.shop.findUnique(options);
	if (!shop) 
		return NextResponse.json({ message: 'Shop not found' }, {status: 404});
	return NextResponse.json({ shop });
}