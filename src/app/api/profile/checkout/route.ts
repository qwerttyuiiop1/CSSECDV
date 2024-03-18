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
		cart.items = cart.items.filter(item => item.quantity > 0);
		if (cart.items.length === 0) {
			error = "Cart is empty";
			throw new Error(error);
		}
		
		const res_codes = (await Promise.all(
			cart.items.map(item => {
			  return prisma.code.findMany({
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
		let total = 0;
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
			total += product.price * codes.length;
			return codes.map(code => ({
				shopId: product.shopId,
				productId: product.id,
				productVersion: product.version,
				code: code.code
			}))
		}).flat();
		if (codes.length === 0) {
			error = "No codes found";
			throw new Error(error);
		}
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
		const items = cart.items.map(item => {
			const count = transaction.items.filter(code => 
			  code.productId === item.product.product.id).length;
			return {
				quantity: item.quantity - count,
				productId: item.product.product.id,
			}
		}).filter(item => item.quantity > 0)
		if (items.length === 0)
			return;
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
		isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
		timeout: 10 * 1000
	})
	return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: error || "Something went wrong" }, { status: 500 });
  }
});