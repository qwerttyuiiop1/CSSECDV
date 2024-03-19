import { 
	Transaction as _Transaction, 
	CodeH as _TransactionItem, 
	TransactionType as _TransactionType 
} from '@prisma/client';
import prisma from '@prisma';
async function errors() {
	const res1: Transaction = await prisma.transaction.findFirstOrThrow({
		...transactionSelection,
	})
}

export type DBTransaction = _Transaction;
export type Transaction = _Transaction & {
	items: TransactionItem[];
};
export const transactionSelection = {
	include: {
		items: true
	}
}
export type TransactionItem = _TransactionItem;
export type TransactionType = _TransactionType;