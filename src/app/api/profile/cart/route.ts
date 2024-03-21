import prisma from '@prisma';
import { withUser } from '@/lib/session/withUser';
import { NextResponse } from 'next/server';
import { Cart, cartItemSelection, cartSelection, mapCart, mapCartItem, CartItem } from '@type/Cart';

export const GET = withUser(async (req) => {
	const { cartId } = req.user;
	const res = await prisma.cart.findUniqueOrThrow({
		where: { id: cartId },
		...cartSelection
	});
	const cart: Cart = mapCart(res);
	return NextResponse.json({ cart });
});

export const DELETE = withUser(async (req) => {
  try {
	const { cartId } = req.user;
	let { productId, code, list } = await req.json();
	
	if (productId) list = [{productId}]
	if (code) list = [{code}]
	if (!list || !list.length)
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });

	await prisma.$transaction(list.map(({ productId, code }: any) => {
		if (productId && typeof productId === "number") {
			return prisma.cartItem.delete({
				where: {
					cartId_productId: { cartId, productId }
				}
			});
		}
		if (code && typeof code === "string") {
			return prisma.cartItem.delete({
				where: {
					cartId_code: { cartId, code }
				}
			});
		}
	}))
	return NextResponse.json({ success: true });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong.' }, { status: 400 });
  }
});

export const POST = withUser(async (req) => {
	const { cartId } = req.user;
	const { productId, quantity, method } = await req.json();
	if (quantity < 0)
		return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
	const res =  await prisma.cartItem.upsert({
		update: method === "add" ? { quantity: { increment: quantity } } : { quantity },
		create: { cartId, productId, quantity },
		where: { cartId_productId: { cartId, productId } },
		...cartItemSelection
	});
	const item: CartItem = mapCartItem(res);
	return NextResponse.json({ item });
});