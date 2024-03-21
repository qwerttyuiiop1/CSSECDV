import { withUser } from '@/lib/session/withUser'
import { Report, mapReport, reportSelection } from '@/lib/types/Transaction'
import prisma from '@prisma'
import { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server'

export const POST = withUser(async (req) => {
	try {
		const { comment, code, productId } = await req.json()
		if (typeof comment !== 'string' || comment.length < 1 || comment.length > 500)
			return NextResponse.json({ error: 'Invalid comment' }, { status: 400 })
		if (typeof code !== 'string' || typeof productId !== 'number')
			return NextResponse.json({ error: 'Invalid code or productId' }, { status: 400 })
		const ownerEmail = await prisma.codeH.findUnique({
			where: { 
				code_productId: { productId, code }
			},
			select: { transaction: { select: { userEmail: true } } }
		})
		if (!ownerEmail)
			return NextResponse.json({ error: 'Code not found' }, { status: 404 })
		if (ownerEmail.transaction.userEmail !== req.user.email && req.user.role !== UserRole.ADMIN)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		const res = await prisma.productReport.create({
			data: { 
				comment: comment,
				rel_code: {
					connect: {
						code_productId: {
							productId: productId,
							code: code
						}
					}
				},
				user: {
					connect: { email: req.user.email }
				}
			},
			...reportSelection
		})
		const report: Report = mapReport(res)
		return NextResponse.json({ report })
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })
	}
});