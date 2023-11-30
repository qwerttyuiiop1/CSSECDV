import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
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
	/**
	 * code has primary key of [code, shopId]
	 * the shopId is in the same row as the shopName = name and isActive = true
	 */
	const a = await prisma.code.updateMany({
		where: {
			code: code,
			shop: {
				name: name,
				isActive: true
			}
		},
		data: {
			code: newCode
		}
	});
	if (a.count !== 1)
		return NextResponse.json({ error: "Something went wrong" }, {status: 500});
	return NextResponse.json({ code: newCode });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, {status: 500});
  }
});

export const DELETE = withAdmin(async (_: NextRequest, {params: { name, code }}: Params) => {
  try {
	const a = await prisma.code.delete({
		where: {
			code_shopName: {
				code: code,
				shopName: name
			},
		},
	});
	return NextResponse.json({ code: a });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, {status: 500});
  }
});