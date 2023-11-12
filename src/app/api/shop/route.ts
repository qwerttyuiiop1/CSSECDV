import prisma from '@/lib/prisma/prisma';
import { shopSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
	const all = req.nextUrl.searchParams.get('all') === 'true';
	const options = all ? shopSelection : undefined;
	const shops = await prisma.shop.findMany(options);
	return NextResponse.json({ shops });
}