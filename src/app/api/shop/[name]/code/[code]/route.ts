import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
import { NextRequest, NextResponse } from 'next/server';
type Params = {
	params: {
		name: string;
		code: string;
	}
}

export const GET = async (_: NextRequest, {params: { name, code }}: Params) => {
	const a = await prisma.code.findUnique({
		where: {
			code_shopName: {
				code: code,
				shopName: name
			},
		},
	});
	if (!a) 
		return NextResponse.json({ error: 'Code not found' }, {status: 404});
	return NextResponse.json({ a });
}

export const PATCH = withAdmin(async (req: NextRequest, {params: { name, code }}: Params) => {
  try {
	const { code: newCode } = await req.json();
	const a = await prisma.code.update({
		where: {
			code_shopName: {
				code: code,
				shopName: name
			},
		},
		data: {
			code: newCode
		}
	});
	return NextResponse.json({ code: a });
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