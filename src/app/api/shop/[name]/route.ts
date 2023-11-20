// api/shop/[id]/route.ts
import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
import { shopSelection } from '@/lib/types/Shop';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
	params: {
		name: string
	}
}
export const GET = async (req: NextRequest, {params: { name }}: Params) => {
	const all = req.nextUrl.searchParams.get('full') === 'true';
	const options = all ? {
		where: { name },
		...shopSelection
	} : {
		where: { name },
	};
	const shop = await prisma.shop.findUnique(options);
	if (!shop) 
		return NextResponse.json({ error: 'Shop not found' }, {status: 404});
	return NextResponse.json({ shop });
}

export const PATCH = withAdmin(async (req: NextRequest, {params: { name }}: Params) => {
  try {
	const { name: newName } = await req.json();
	if (!newName || newName.length < 3) {
		return NextResponse.json({ error: 'Name must be at least 3 characters long' }, { status: 400 });
	}
	const shop = await prisma.shop.update({
		where: { name },
		data: { name: newName }
	});
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
})

export const DELETE = withAdmin(async (_: NextRequest, {params: { name }}: Params) => {
  try {
	const shop = await prisma.shop.delete({ where: { name } });
	return NextResponse.json({ shop });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});