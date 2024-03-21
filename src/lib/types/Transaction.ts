import { 
	ProductReport,
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
				imageid: string;
			}
		},
		reports: DBReport[]
	}[]
}
export const mapTransaction = (transaction: DBTransaction): Transaction => {
	return {
		...transaction,
		items: transaction.items.map(item => ({
			code: item.code,
			isRedeemed: item.isRedeemed,
			reports: item.reports.map(mapReport),
			img: `/api/img/${item.rel_product.shop.imageid}`,
			product: {
				...item.rel_product,
				stock: -1,
				sales: -1,
				shopName: item.rel_product.shop.name
			}
		}))
	}
}
type DBReport = Pick<ProductReport, 'comment' | 'id' | 'updatedAt'> & {
	user: {
		name: string;
		imageid: string | null;
		email: string;
	}
}
export const reportSelection = {
	select: {
		comment: true,
		id: true,
		updatedAt: true,
		user: {
			select: {
				name: true,
				imageid: true,
				email: true
			}
		}
	}
}
export const mapReport = (report: DBReport): Report => {
	return {
		comment: report.comment,
		id: report.id,
		date: report.updatedAt,
		user: {
			name: report.user.name,
			email: report.user.email,
			image: `/api/img/${report.user.imageid || ''}`
		}
	}
}
export type Report = Pick<ProductReport, 'comment' | 'id'> & {
	user: {
		name: string;
		image: string;
		email: string;
	}
	date: Date;
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
		reports: {
		  ...reportSelection
		},
		rel_product: {
		  select: {
			...productSelection.select.product.select,
			shop: {
			  select: {
				name: true,
				imageid: true
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
	reports: Report[];
};
export type TransactionType = _TransactionType;