import { NextRequest } from 'next/server';
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from 'next/server';

const handler = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
	// TODO: transaction not yet in db, commented out for now
    // const transactions = await prisma.transaction.findMany({
    //   where: {
    //     userEmail: id, 
    //   },
    // });

    // if (transactions.length === 0) {
    //   return NextResponse.json("No transactions found for the user", { status: 404 });
    // }

    // return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};

export { handler as GET };
