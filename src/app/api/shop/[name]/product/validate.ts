
export type ProductBody = {
	name: string;
	details: string;
	tos: string;
	price: number;
}
export const validate = (body: any): string | ProductBody => {
	const { name, details, tos, price } = body as ProductBody;
	if (!name || !details || !tos)
		return 'Missing fields';
	if (typeof name !== 'string' || typeof details !== 'string' || typeof tos !== 'string')
		return 'Invalid fields';
	if (typeof price !== 'number' || price < 0)
		return 'Invalid price';
	if (name.length < 3)
		return 'Product name too short';
	if (details.length < 3)
		return 'Product details too short';
	if (tos.length < 3)
		return 'Product tos too short';
	return { name, details, tos, price };
}