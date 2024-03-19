import { 
	Transaction as _Transaction, 
	CodeH as _TransactionItem, 
	TransactionType as _TransactionType 
} from '@prisma/client';
import prisma from '@prisma';
import { productSelection, Product } from './Shop';
async function errors() {
	const res1: DBTransaction = await prisma.transaction.findFirstOrThrow({
		include: {
			items: {
				select: {
					code: true,
					rel_product: {
						select: {
							...productSelection.select.product.select,
							_count: undefined,
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
	})
}

type DBTransaction = _Transaction & {
	items: {
		code: string;
		rel_product: Omit<Product, 'stock' | 'sales' | 'shopName'> & {
			shop: {
				name: string;
				img_src: string;
			}
		}
	}[]
}
export type Transaction = _Transaction & {
	items: TransactionItem[];
};
export const transactionSelection = {
  include: {
	items: {
	  select: {
		code: true,
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
	shopName: string;
	img: string;
	product: Product;
};
export type TransactionType = _TransactionType;