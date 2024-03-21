import { withUser } from '@/lib/session/withUser'
import { Report, mapReport, reportSelection } from '@/lib/types/Transaction'
import prisma from '@prisma'
import { NextResponse } from 'next/server'

type Params = {
	params: {
		reportId: string
	}
}

export const GET = withUser<Params>(async (req, { params: { reportId } }) => {
	const res = await prisma.productReport.findUnique({
		where: {
			id: parseInt(reportId),
			userEmail: req.user.email
		},
		...reportSelection
	})
	if (!res)
		return NextResponse.json({ error: 'Report not found' }, { status: 404 })
	const report: Report = mapReport(res)
	return NextResponse.json({ report })
})

export const POST = withUser<Params>(async (req, { params: { reportId } }) => {
	try {
		const { comment } = await req.json()
		if (typeof comment !== 'string' || comment.length < 1 || comment.length > 500)
			return NextResponse.json({ error: 'Invalid comment' }, { status: 400 })
		const res = await prisma.productReport.update({
			where: {
				id: parseInt(reportId),
				userEmail: req.user.email
			},
			data: { comment },
			...reportSelection
		})
		const report: Report = mapReport(res)
		return NextResponse.json({ report })
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })
	}
});