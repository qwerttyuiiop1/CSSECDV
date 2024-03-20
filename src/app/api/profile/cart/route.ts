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
	const { cartId } = req.user;
	await prisma.cartItem.deleteMany({
		where: { cartId }
	});
	return NextResponse.json({ success: true });
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