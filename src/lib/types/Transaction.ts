import { 
	Transaction as _Transaction, 
	CodeH as _TransactionItem, 
	TransactionType as _TransactionType 
} from '@prisma/client';
import prisma from '@prisma';
import { productSelection, Product } from './Shop';
async function errors() {
	const res1: DBTransaction = await prisma.transaction.findFirstOrThrow(transactionSelection)
	const transaction: Transaction = mapTransaction(res1)
}

type DBTransaction = _Transaction & {
	items: {
		code: string;
		isRedeemed: boolean;
		rel_product: Omit<Product, 'stock' | 'sales' | 'shopName'> & {
			shop: {
				name: string;
				img_src: string;
			}
		}
	}[]
}
export const mapTransaction = (transaction: DBTransaction): Transaction => {
	return {
		...transaction,
		items: transaction.items.map(item => ({
			code: item.code,
			isRedeemed: item.isRedeemed,
			img: item.rel_product.shop.img_src,
			product: {
				...item.rel_product,
				stock: -1,
				sales: -1,
				shopName: item.rel_product.shop.name
			}
		}))
	}
}
export type Transaction = _Transaction & {
	items: TransactionItem[];
};
export const transactionSelection = {
  include: {
	items: {
	  select: {
		code: true,
		isRedeemed: true,
		rel_product: {
		  select: {
			...productSelection.select.product.select,
			shop: {
			  select: {
				name: true,
				img_src: true
			  }
			}
		  }
		}
	  }
	}
  }
}
export type TransactionItem = {
	code: string;
	img: string;
	product: Product;
	isRedeemed: boolean;
};
export type TransactionType = _TransactionType;