// pages/api/user/[email]/transactions/route.ts
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';

const handler = async (req: NextRequest, { params: { email } }: { params: { email: string } }) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userEmail: email, 
      },
    });

    if (transactions.length === 0) {
      return NextResponse.json("No transactions found for the user", { status: 404 });
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};

export { handler as GET };
