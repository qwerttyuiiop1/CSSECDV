import { Shop as _Shop, Product as _Product, Code as _Code, ProductCategory } from '@prisma/client';

export type DBShop = _Shop
export type DBProduct = _Product
export type DBCode = _Code

export const shopSelection = {
	include: {
		products: {
			include: {
				codes: true
			}
		}
	}
}
export type Shop = _Shop & {
	products: Product[]
}
export const productSelection = {
	include: {
		codes: true
	}
}

export type ProductId = [shopName: string, productName: string];
export type Product = _Product & {
	codes: Code[]
}
export type Code = _Code

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
	UK: "Unknown"
}