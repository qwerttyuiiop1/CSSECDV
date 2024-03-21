import { Code, Product, Shop, mapProduct, mapShop, productSelection } from "./Shop"
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
	product: Omit<Product, 'stock' | 'sales' | 'shopName'>;
	_count: { 
		codes: number;
		purchasedCodes: number;
	};
	codes: AdminCode[];
	shopName: string;
}

export const adminProductSelection = {
  select: {
	codes: adminCodeSelection,
	...productSelection.select
  }
}
export const adminShopSelection = {
  select: {
	name: true,
	products: adminProductSelection,
	id: true,
	shop: {
	  select: {
		imageid: true
	  }
	}
  }
}

export type AdminShop = Omit<Shop, 'products'> & {
	products: AdminProduct[]
}
export type _DBAdminShop = {
	id: number,
	name: string,
	products: _DBAdminProduct[],
	shop: {
		imageid: string
	}
}
export {
  mapProduct,
  mapShop
}