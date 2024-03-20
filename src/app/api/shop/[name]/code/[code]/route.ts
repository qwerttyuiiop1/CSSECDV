import prisma from '@prisma';
import { withAdmin } from '@/lib/session/withUser';
import { AdminCode, adminCodeSelection } from '@type/AdminShop';
import { NextRequest, NextResponse } from 'next/server';
type Params = {
	params: {
		name: string;
		code: string;
	}
}

export const PATCH = withAdmin(async (req: NextRequest, {params: { name, code }}: Params) => {
  try {
	const { code: newCode } = await req.json();
	const a: AdminCode = await prisma.code.update({
		where: {
			code_shopName: {
				code,
				shopName: name
			},
			isUsed: null
		},
		data: {
			code: newCode
		},
		select: adminCodeSelection.select
	});
	return NextResponse.json({ code: a });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, {status: 500});
  }
});

export const DELETE = withAdmin(async (_: NextRequest, {params: { name, code }}: Params) => {
  try {
	const a: AdminCode = await prisma.code.delete({
		where: {
			code_shopName: {
				code: code,
				shopName: name
			},
			isUsed: null
		},
		select: adminCodeSelection.select
	});
	return NextResponse.json({ code: a });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, {status: 500});
  }
});