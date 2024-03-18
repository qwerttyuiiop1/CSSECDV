import prisma from "@/lib/prisma/prisma";
import { NextResponse } from 'next/server';
import { withUser } from '@/lib/session/withUser';
import { Transaction, transactionSelection } from "@/lib/types/Transaction";
import { Prisma, TransactionType } from "@prisma/client";

export const POST = withUser(async (req) => {
  let error = '';
  const cartSelection = {
	select: {
	  items: {
		select: {
		  product: {
			select: {
		  	  product: {
				select: {
				  shopId: true,
				  id: true,
				  version: true,
				  price: true,
				}
			  }
			}
		  },
		  quantity: true
		}
	  }
	}
  }
  try {
	await prisma.$transaction(async (prisma) => {
		const cart = await prisma.cart.findFirst({
			where: { id: req.user.cartId },
			...cartSelection
		});
		if (!cart) {
			error = "Cart not found";
			throw new Error(error);
		}
		if (cart.items.length === 0)
			error = "Cart is empty";
		if (cart.items.some(item => item.quantity < 1))
			error = "Invalid quantity";
		if (error)
			throw new Error(error);
		const total = cart.items.reduce((acc, item) => acc + item.product.product.price * item.quantity, 0);
		const user = await prisma.user.update({
			where: { email: req.user.email },
			data: {
			  points: {
				decrement: total
			  }
			},
			select: {
			  points: true
			}
		})
		if (user.points < 0) {
			error = "Insufficient points";
			throw new Error(error);
		}
		const transaction = await prisma.transaction.create({
			data: {
			  type: TransactionType.PURCHASE,
			  total: total,
			  user: {
				connect: {
				  email: req.user.email
				}
			  },
			  pointsBalance: user.points,
			}
		})
		const codes = (await Promise.all(
			cart.items.map(async item => {
			  return await prisma.code.findMany({
				where: {
				  productId: item.product.product.id,
				  isUsed: null
				},
				take: item.quantity
			  })
			})
		)).flat();
		if (codes.length === 0) {
			error = "No codes available";
			throw new Error(error);
		}
		const test = codes[0];
		await prisma.codeH.create({
		  data: {
			transactionItem: {
			  connect: { id: transaction.id }
			},
			rel_code: {
			  connect: {
				code_shopId: {
				  code: test.code,
				  shopId: test.shopId
				}
			  }
			},
			rel_product: {
			  connect: {
				id_version: {
				  id: test.productId,
				  version: 1
				}
			  }
			}
		  }
		})
	}, {
		isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead
	})
	//return NextResponse.json(transaction);
	return NextResponse.json({ error: error || "Success" }, { status: 200 });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: error || "Something went wrong" }, { status: 500 });
  }
});