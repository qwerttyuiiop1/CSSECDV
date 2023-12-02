import prisma from "@/lib/prisma/prisma";
import { NextResponse } from 'next/server';
import { withUser } from '@/lib/session/withUser';
import { Transaction, transactionSelection } from "@/lib/types/Transaction";
import { Prisma, TransactionType } from "@prisma/client";

const validateTransaction = (transaction: any): Transaction | string => {
	throw new Error("Not implemented");
}
export const POST = withUser(async (req) => {
  try {
	const transaction = validateTransaction(await req.json())
	if (typeof transaction === "string") {
		return NextResponse.json({ error: transaction }, { status: 400 });
	}
	await prisma.$transaction(async (prisma) => {
		const user = await prisma.user.update({
			where: { email: req.user.email },
			data: {
				points: {
					decrement: transaction.total
				}
			}
		})
		if (user.points < 0)
			throw new Error("Not enough points");
	}, {
		isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted
	})
	return NextResponse.json(transaction);
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});