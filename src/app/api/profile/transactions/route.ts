import prisma from "@prisma";
import { NextResponse } from 'next/server';
import { withUser } from '@/lib/session/withUser';
import { Transaction, mapTransaction, transactionSelection } from "@type/Transaction";

export const GET = withUser(async (req) => {
  try {
    const res = await prisma.transaction.findMany({
      where: { userEmail: req.user.email},
	  ...transactionSelection
    });
	const transactions: Transaction[] = res.map(mapTransaction);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});