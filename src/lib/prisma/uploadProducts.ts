import prisma from './prisma'
import { AdminShop, AdminProduct, AdminCode } from '@type/AdminShop'

const getDummy = (numShops = 4, productsPerShop = 4, codesPerProduct = 4): AdminShop[] => {
	const shops = []
	for (let i = 0; i < numShops; i++) {
		const shop: AdminShop = {
			name: `Brand ${i + 1}`,
			products: [],
			// ignored
			id: -1
		}
		for (let j = 0; j < productsPerShop; j++) {
			const product: AdminProduct = {
				name: `Product ${i * productsPerShop + j + 1}`,
				price: (i * productsPerShop + j + 1) * 100,
				details: `Details ${i * productsPerShop + j + 1}`,
				tos: `TOS ${i * productsPerShop + j + 1}`,
				codes: [],
				shopName: shop.name,
				// ignored
				category: null,
				stock: -1,
				sales: -1,
				id: -1
			}
			for (let k = 0; k < codesPerProduct; k++) {
				const code: AdminCode = {
					code: `code ${i * productsPerShop * codesPerProduct + j * codesPerProduct + k + 1}`,
					productName: product.name,
					shopName: shop.name,
					// ignored
					isUsed: null
				}
				product.codes.push(code)
			}
			shop.products.push(product)
		}
		shops.push(shop)
	}
	return shops
}
export const uploadDummyProducts = async () => {
	await prisma.shop.deleteMany();
	console.log('shops deleted')
	const data = getDummy();
	await prisma.shopH.createMany({
		data: data.map(shop => ({
			name: shop.name,
			isActive: { create: {} }
		}))
	})
	console.log('shops created')
	const shopMap = new Map<string, number>()
	for (const shop of await prisma.shop.findMany())
		shopMap.set(shop.name, shop.id)
	await prisma.productH.createMany({
		data: data.flatMap(shop => shop.products.map(product => ({
			name: product.name,
			price: product.price,
			details: product.details,
			tos: product.tos,
			shopId: shopMap.get(shop.name)!,
			isActive: { create: { connect: { id: shopMap.get(shop.name)! } } }
		})))
	})
	console.log('products created')
	const productMap = new Map<string, number>()
	for (const product of await prisma.product.findMany())
		productMap.set(product.name, product.id)
	await prisma.code.createMany({
		data: data.flatMap(shop => shop.products.flatMap(product => product.codes.map(code => ({
			code: code.code,
			productId: productMap.get(product.name)!,
			productName: product.name,
			shopId: shopMap.get(shop.name)!,
			shopName: shop.name
		}))))
	})
	console.log('codes created')
}