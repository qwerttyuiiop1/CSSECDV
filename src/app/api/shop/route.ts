import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
import { shopSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
	const all = req.nextUrl.searchParams.get('full') === 'true';
	const options = all ? shopSelection : undefined;
	const shops = await prisma.shop.findMany(options);
	return NextResponse.json({ shops });
}

export const POST = withAdmin(async (req: NextRequest) => {
  try {
	const { name } = await req.json()
	if (!name || name.length < 3) {
		return NextResponse.json({ error: 'Name must be at least 3 characters long' }, { status: 400 });
	}
	const shop = await prisma.shop.create({ data: { name } });
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});