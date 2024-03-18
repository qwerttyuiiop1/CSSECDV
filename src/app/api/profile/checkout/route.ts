import prisma from "@/lib/prisma/prisma";
import { NextResponse } from 'next/server';
import { withUser } from '@/lib/session/withUser';
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
		const res_codes = (await Promise.all(
			cart.items.map(async item => {
			  return await prisma.code.findMany({
				where: {
				  productId: item.product.product.id,
				  isUsed: null
				},
				take: item.quantity,
				select: {
				  code: true,
				  productId: true
				}
			  })
			})
		));
		const codes = res_codes.map(codes => {
			if (codes.length === 0)
				return [];
			const product = cart.items.find(item => 
				item.product.product.id === codes[0].productId)
				?.product.product;
			if (!product) {
				error = "Product not found";
				throw new Error(error);
			}
			return codes.map(code => ({
				shopId: product.shopId,
				productId: product.id,
				productVersion: product.version,
				code: code.code
			}))
		}).flat();
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
			  items: {
				createMany: {
				  data: codes
				}
			  }
			},
			include: {
				items: true
			}
		});
		await prisma.cartItem.deleteMany({
			where: {
			  cartId: req.user.cartId
			}
		});
		const items = cart.items.map((item, i) => {
			const count = transaction.items.filter(code => 
			  code.productId === item.product.product.id).length;
			return {
				quantity: item.quantity - count,
				productId: item.product.product.id,
				cartItemNo: i
			}
		}).filter(item => item.quantity > 0)
		await prisma.cart.update({
			where: {
			  id: req.user.cartId
			},
			data: {
			  items: {
				createMany: {
				  data: items
				}
			  }
			}
		});
	}, {
		isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead
	})
	return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: error || "Something went wrong" }, { status: 500 });
  }
});