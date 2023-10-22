export interface Brand {
	name: string;
	products: Product[];
}
export interface Product {
	name: string;
	price: number;
	details: string;
	tos: string;
	activeCodes: string[];
}