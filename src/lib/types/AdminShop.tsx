import { Code, Product, Shop } from "./Shop"

export const adminCodeSelection = {
  select: {
	productName: true,
	shopName: true,
	code: true,
	isUsed: {
	  select: {
		userEmail: true
	  }
	},
  }
}
export type AdminCode = Code & {
	isUsed: {
	  userEmail: string
	} | null
}
export type AdminProduct = Product & {
	codes: AdminCode[]
}
type DBAdminProduct = {
	product: Omit<Product, 'stock' | 'sales'> & {
		_count: { purchasedCodes: number }
	}
	_count: { codes: number }
	codes: AdminCode[]
}

export const mapAdminProduct = (product: DBAdminProduct): AdminProduct => ({
	...product.product,
	codes: product.codes,
	stock: product._count.codes,
	sales: product.product._count.purchasedCodes,
})

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
type AdminDBShop = {
	name: string,
	products: DBAdminProduct[]
}
export const mapAdminShop = (shop: AdminDBShop): AdminShop => ({
	name: shop.name,
	products: shop.products?.map(mapAdminProduct)
})