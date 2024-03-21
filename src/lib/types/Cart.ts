import { 
	Cart as _Cart,
	CartItem as _CartItem,
} from "@prisma/client";
import { Product, _DBProduct, mapProduct, productSelection } from "./Shop";
import prisma from '@prisma';
import { RedeemCode, _DBRedeemCode, mapRedeemCode, redeemCodeSelection } from "./RedeemCode";
async function errors() {
	const res1: DBCart = await prisma.cart.findFirstOrThrow({
		...cartSelection,
	})
	const cart: Cart = mapCart(res1)

	const res2: DBCartItem = await prisma.cartItem.findFirstOrThrow({
		...cartItemSelection,
	})
	const cartItem: CartItem = mapCartItem(res2)
}

export const cartItemSelection = {
  select: {
	quantity: true,
	product: {
	  ...productSelection
	},
	redeemCode: {
	  ...redeemCodeSelection
	}
  }
}
export const cartSelection = {
  select: {
	id: true,
	items: cartItemSelection
  }
}
type DBCartItem = {
  quantity: number | null
  product: _DBProduct | null
  redeemCode: _DBRedeemCode | null
}
type DBCart = _Cart & {
	items: DBCartItem[]
}
export type CartItem = {
	product: Product
	quantity: number
}
export type Cart = _Cart & {
	items: CartItem[]
	redeemCodes: RedeemCode[]
};

export const mapCartItem = (item: DBCartItem): CartItem => {
  return {
	  product: mapProduct(item.product!),
	  quantity: item.quantity!
  }
}
export const mapCart = (cart: DBCart): Cart => ({
  id: cart.id,
  items: cart.items.filter(item => !!item.product).map(mapCartItem),
  redeemCodes: cart.items.filter(item => !!item.redeemCode).map(e => mapRedeemCode(e.redeemCode!))
})