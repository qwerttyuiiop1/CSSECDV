import { 
	Cart as _Cart,
	CartItem as _CartItem,
} from "@prisma/client";
import { Product, _DBProduct, mapProduct, productSelection } from "./Shop";

export const cartItemSelection = {
  select: {
	quantity: true,
	product: {
	  ...productSelection
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
  quantity: number
  product: _DBProduct
}
type DBCart = _Cart & {
	items: DBCartItem[]
}
export type CartItem = Pick<_CartItem, 'quantity'> & {
	product: Product
};

export type Cart = _Cart & {
	items: CartItem[]
};

export const mapCartItem = (item: DBCartItem): CartItem => ({
  quantity: item.quantity,
  product: mapProduct(item.product)
})
export const mapCart = (cart: DBCart): Cart => ({
  id: cart.id,
  items: cart.items.map(mapCartItem)
})