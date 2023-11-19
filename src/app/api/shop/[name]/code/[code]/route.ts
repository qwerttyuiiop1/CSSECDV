import prisma from '@/lib/prisma/prisma';
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
		return NextResponse.json({ message: 'Code not found' }, {status: 404});
	return NextResponse.json({ a });
}