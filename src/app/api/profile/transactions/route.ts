import prisma from "@/lib/prisma/prisma";
import { NextResponse } from 'next/server';
import { withUser } from '@/lib/session/withUser';

export const GET = withUser(async (req) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userEmail: req.user.email},
    });

    if (transactions.length === 0) {
      return NextResponse.json("No transactions found for the user", { status: 404 });
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
});