import { 
	Transaction as _Transaction, 
	CodeH as _TransactionItem, 
	TransactionType as _TransactionType 
} from '@prisma/client';

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