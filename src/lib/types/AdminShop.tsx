import { Code, Product, Shop, mapProduct, mapShop } from "./Shop"


export const adminCodeSelection = {
  select: {
	productName: true,
	shopName: true,
	code: true,
	isUsed: { select: {} },
  }
}
export type AdminCode = Code & {
	isUsed: {} | null
}
export type AdminProduct = Product & {
	codes: AdminCode[]
}
export type _DBAdminProduct = {
	product: Omit<Product, 'stock' | 'sales'> & {
		_count: { purchasedCodes: number }
	}
	_count: { codes: number }
	codes: AdminCode[]
}

export const adminProductSelection = {
  select: {
	product: {
	  select: {
		name: true,
		shopName: true,
		price: true,
		tos: true,
		details: true,
		category: true,
		_count: {
		  select: {
			purchasedCodes: true
		  }
		}
	  },
	},
	codes: adminCodeSelection,
	_count: {
	  select: {
		codes: {
		  where: {
			isUsed: null
		  }
		}
	  }
	}
  }
}
export const adminShopSelection = {
  select: {
	name: true,
	products: adminProductSelection
  }
}

export type AdminShop = Omit<Shop, 'products'> & {
	products: AdminProduct[]
}
export type _DBAdminShop = {
	name: string,
	products: _DBAdminProduct[]
}
export {
  mapProduct,
  mapShop
}