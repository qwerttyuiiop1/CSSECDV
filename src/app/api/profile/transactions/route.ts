import prisma from "@/lib/prisma/prisma";
import { NextResponse } from 'next/server';
import { withUser } from '@/lib/session/withUser';
import { transactionSelection } from "@/lib/types/Transaction";

export const GET = withUser(async (req) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userEmail: req.user.email},
	  ...transactionSelection
    });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});