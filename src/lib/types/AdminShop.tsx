import { Code, Product, Shop, mapProduct, mapShop } from "./Shop"
import prisma from "@prisma"

async function errors() {
  const res1 = await prisma.shop.findFirstOrThrow({
	...adminShopSelection
  });
  const shop: AdminShop = mapShop(res1);
  const res2 = await prisma.product.findFirstOrThrow({
	...adminProductSelection
  });
  const product: AdminProduct = mapProduct(res2);
  const res3 = await prisma.code.findFirstOrThrow({
	...adminCodeSelection
  });
  const code: AdminCode = res3;
}

export const adminCodeSelection = {
  select: {
	productName: true,
	shopName: true,
	code: true,
	isUsed: { select: { transactionId: true } },
  }
}
export type AdminCode = Code & {
	isUsed: {} | null
}
export type AdminProduct = Product & {
	codes: AdminCode[]
}
export type _DBAdminProduct = {
	product: Omit<Product, 'stock' | 'sales' | 'shopName'> & {
		_count: { purchasedCodes: number }
	}
	_count: { codes: number }
	codes: AdminCode[],
	shopName: string
}

export const adminProductSelection = {
  select: {
	shopName: true,
	product: {
	  select: {
		name: true,
		price: true,
		tos: true,
		details: true,
		category: true,
		id: true,
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
	products: adminProductSelection,
	id: true
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