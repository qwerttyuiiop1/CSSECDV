import { 
	Shop as _Shop, 
	ProductH as _Product, 
	Code as _Code,
	ProductCategory 
} from '@prisma/client';
import { AdminProduct, AdminShop, _DBAdminProduct, _DBAdminShop } from './AdminShop';
import prisma from '@prisma';
async function errors() {
	const res1: DBShop = await prisma.shop.findFirstOrThrow({
		...shopSelection,
	})
	const shop: Shop = mapShop(res1)
	const res2: _DBProduct = await prisma.product.findFirstOrThrow({
		...productSelection,
	})
	const product: Product = mapProduct(res2)
	const res3: Code = await prisma.code.findFirstOrThrow({
		...codeSelection,
	})
	const code: Code = res3
}

export const codeSelection = {
  select: {
	productName: true,
	shopName: true,
	code: true
  }
}
export type CodeId = [shopName: string, codeName: string];
export type Code = Pick<_Code, "productName" | "shopName" | "code">

export type ProductId = [shopName: string, productName: string];
export type Product = Pick<_Product, "name" | "price" | "tos" | "details" | "category" | "id"> & {
	stock: number,
	sales: number,
	shopName: string
}
export type _DBProduct = {
  product: Omit<Product, 'stock' | 'sales' | 'shopName'> & {
	_count: { purchasedCodes: number }
  }
  _count: { codes: number },
  shopName: string
}

export const productSelection = {
  select: {
	shopName: true,
	product: {
	  select: {
		id: true,
		name: true,
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
export const shopSelection = {
  select: {
	name: true,
	id: true,
	products: productSelection,
	shop: {
	  select: {
		img_src: true
	  }
	}
  }
}
export type Shop = Pick<_Shop, "name" | "id"> & {
	products: Product[],
	img_src: string
}
type DBShop = {
	name: string,
	products: _DBProduct[],
	shop: {
	  img_src: string
	}
}

type mapProductInput = _DBProduct | _DBAdminProduct
type mapProductOutput<T extends mapProductInput> = T extends _DBAdminProduct ? AdminProduct : Product
export const mapProduct = <T extends mapProductInput>(product: T): mapProductOutput<T> => {
	if ('codes' in product)
		return {
			...product.product,
			codes: product.codes,
			stock: product._count.codes,
			sales: product.product._count.purchasedCodes,
			shopName: product.shopName
		} as AdminProduct
	return {
		...product.product,
		stock: product._count.codes,
		sales: product.product._count.purchasedCodes,
		shopName: product.shopName
	} as Product as mapProductOutput<T>
}

type mapShopInput = DBShop | _DBAdminShop
type mapShopOutput<T extends mapShopInput> = T extends _DBAdminShop ? AdminShop : Shop
export const mapShop = <T extends mapShopInput>(shop: T): mapShopOutput<T> => {
	return {
		name: shop.name,
		products: shop.products.map(mapProduct),
		img_src: shop.shop.img_src
	} as mapShopOutput<T>
}

export const CategoryMap: Record<ProductCategory, string> = {
	BF: "Beauty & Fashion",
	DS: "Department Stores",
	EL: "Electronics",
	FD: "Food & Drinks",
	GM: "Gaming",
	HB: "Hobbies",
	LS: "Lifestyle",
	TR: "Travel",
	OS: "Online Shopping",
}