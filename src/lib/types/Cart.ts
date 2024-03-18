import { 
	Cart as _Cart,
	CartItem as _CartItem,
} from "@prisma/client";
import { Product, _DBProduct, mapProduct, productSelection } from "./Shop";

export const CartSelection = {
  select: {
	id: true,
	  items: {
	  select: {
		quantity: true,
		product: {
		  ...productSelection
		}
	  }
	}
  }
}
type DBCart = _Cart & {
	items: {
		quantity: number
		product: _DBProduct
	}[]
}
export type CartItem = Pick<_CartItem, 'quantity'> & {
	product: Product
};

export type Cart = _Cart & {
	items: CartItem[]
};

export const mapCart = (cart: DBCart): Cart => ({
  id: cart.id,
  items: cart.items.map(item => ({
	quantity: item.quantity,
	product: mapProduct(item.product)
  }))
})