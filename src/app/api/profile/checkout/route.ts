import prisma from "@/lib/prisma/prisma";
import { NextResponse } from 'next/server';
import { withUser } from '@/lib/session/withUser';
import { Prisma } from "@prisma/client";

export const POST = withUser(async (req) => {
  let error = '';
  // what is happening
  try {
	await prisma.$transaction(async (prisma) => {
		const cart = await prisma.cart.findFirst({
			where: { id: req.user.cartId },
  ...{
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
		  quantity: true,
		  redeemCode: {
			select: { 
			  code: true,
			  amount: true,
			  transactionId: true
			}
		  }
		}
	  }
	}
  }
		});
		// console.log(cart)
		// throw new Error('test')
		if (!cart || cart.items.length === 0) {
			error = "Cart is empty";
			throw new Error(error);
		}

		type Req<T = typeof cart.items[0]> = { [K in keyof T]-?: NonNullable<T[K]> }
		const cartProducts = cart.items.filter(
			item => item.quantity && item.quantity > 0
		) as Pick<Req, 'product' | 'quantity'>[];
		const cartCodes = cart.items.filter(
			item => item.redeemCode && item.redeemCode.transactionId === null
		) as Pick<Req, 'redeemCode'>[];
		
		const res_codes = (await Promise.all(
			cartProducts.map(item => {
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
			const product = cartProducts.find(item => 
				item.product.product.id === codes[0].productId)!
				.product.product;
			total += product.price * codes.length;
			return codes.map(code => ({
				shopId: product.shopId,
				productId: product.id,
				productVersion: product.version,
				code: code.code
			}))
		}).flat();
		cartCodes.forEach(item => {
			total += item.redeemCode.amount;
		})
		if (codes.length === 0 && cartCodes.length === 0) {
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
			  total: total,
			  user: {
				connect: {
				  email: req.user.email
				}
			  },
			  pointsBalance: user.points,
			  items: codes.length ? {
				createMany: {
				  data: codes
				}
			  } : undefined,
			  redeemCodes: cartCodes.length ? {
				connect: cartCodes.map(item => {
				  return { code: item.redeemCode.code }
				})
			  } : undefined
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
		const remainingProducts = cartProducts.map(item => {
			const count = transaction.items.filter(code => 
			  code.productId === item.product.product.id).length;
			return {
				quantity: item.quantity - count,
				productId: item.product.product.id,
			}
		}).filter(item => item.quantity > 0)
		if (remainingProducts.length === 0)
			return;
		await prisma.cart.update({
			where: {
			  id: req.user.cartId
			},
			data: {
			  items: {
				createMany: {
				  data: remainingProducts
				}
			  }
			}
		});
	}, {
		isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
		timeout: 10 * 1000
	})
	return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (_error) {
	console.error(_error);
	if (error)
		return NextResponse.json({ error }, { status: 400 });
	return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});