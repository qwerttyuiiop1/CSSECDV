import React, { createContext, useContext, ReactNode, useState, useCallback, use, useEffect } from 'react';
import { AdminCode, AdminProduct, AdminShop } from '@type/AdminShop';
import { ProductId } from '@type/Shop';
import { toast } from 'react-toastify';

interface ProductsContext {
  data: AdminShop[];
  setData: (data: AdminShop[]) => void;
  selectedProduct: ProductId | null;
  setSelectedProduct: (data: ProductId) => void;
  refresh: () => Promise<void>;
}
const productsContext = createContext<ProductsContext | undefined>(undefined);

export interface useShopsReturn {
  data: AdminShop[];
  createShop: (name: string, img: File) => Promise<void>;
  findShop: (name: string) => AdminShop | undefined;
  findShopi: (name: string) => number;
  updateShop: (name: string, newName: string, image: File | null) => Promise<void>;
  deleteShop: (name: string) => Promise<void>;
  refresh: () => Promise<void>;
  uploadcsv: (file: File) => Promise<void>;
}
export interface useProductsReturn {
	setSelectedProduct: (data: ProductId) => void;
	selectedProduct: ProductId | null;
	createProduct: (shop: string, p: AdminProduct) => Promise<void>;
	findProduct: (id: ProductId) => AdminProduct | undefined;
	findProducti: (id: ProductId) => [number, number];
	updateProduct: (id: ProductId, p: AdminProduct) => Promise<void>;
	deleteProduct: (id: ProductId) => Promise<void>;
}
export interface useCodeReturn {
  product: AdminProduct | undefined;
  productId: ProductId | null;
  createCode: (code: string, productId: ProductId) => Promise<void>;
  findCode: (code: string) => AdminCode | undefined;
  findCodei: (code: string) => number;
  updateCode: (code: string, newCode: string, productId: ProductId) => Promise<void>;
  deleteCode: (code: string, productId: ProductId) => Promise<void>;
  deleteCodes: (codes: string[],productId: ProductId) => Promise<void>;
}


export function useShops(): useShopsReturn {
  const context = useContext(productsContext);
  if (context === undefined)
    throw new Error('useBrands must be used within a ProductsProviderProps');
  const { data, setData: updateData, refresh: _refresh } = context;

  const findShopi = useCallback((name: string) => {
	return data.findIndex(b => b.name === name);
  }, [data]);
  const findShop = useCallback((name: string) => {
	return data.find(b => b.name === name);
  }, [data]);

  const createShop = useCallback(async (name: string, img: File) => {
	const form = new FormData();
	form.append('img', img);
	form.append('name', name);
	const res = await fetch('/api/shop', {
	  method: 'POST',
	  body: form,
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	} else {
	  toast.success("Created brand: " + json.shop.name);
	  updateData([...data, json.shop]);
	}
  }, [data, updateData]);

  const updateShop = useCallback(async (name: string, newName: string, image: File | null) => {
	const form = new FormData();
	if (image) form.append('img', image);
	form.append('name', newName);
	const res = await fetch('/api/shop/' + name, {
	  method: 'PATCH',
	  body: form,
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	} else {
	  const shopi = findShopi(name)!;
	  const newData = [...data];
	  newData[shopi] = json.shop;
	  toast.success("Edited brand: " + json.shop.name);
	  updateData(newData);
	}
  }, [data, findShopi, updateData]);

  const deleteShop = useCallback(async (name: string) => {
	const res = await fetch('/api/shop/' + name, {
	  method: 'DELETE',
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	} else {
	  toast.success("Deleted brand: " + name);
	  const i = findShopi(name);
	  data.splice(i, 1);
	  updateData([...data]);
	}
  }, [data, findShopi, updateData]);

  const refresh = useCallback(async () => {
	await _refresh();
	toast.info("Refreshed");
  }, [_refresh])

  const uploadcsv = useCallback(async (file: File) => {
	const data = new FormData();
	data.append('file', file);
	const res = await fetch('/api/shop/$_csv', {
	  method: 'POST',
	  body: data,
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	}
	await _refresh();
	toast.success("Uploaded csv");
  }, [_refresh]);

  return {
	data,
	createShop,
	findShop,
	findShopi,
	updateShop,
	deleteShop,
	refresh,
	uploadcsv,
  };
}
export function useProducts(): useProductsReturn {
  const context = useContext(productsContext);
  if (context === undefined)
	throw new Error('useProducts must be used within a ProductsProviderProps');
  const { 
	setSelectedProduct, data, setData: updateData, selectedProduct
  } = context;
  const { findShopi, findShop } = useShops();

  const findProducti = useCallback((id: ProductId): [number, number] => {
	const shopI = findShopi(id[0]);
	if (shopI === -1) return [-1, -1];
	return [shopI, data[shopI].products.findIndex(p => p.name === id[1])];
  }, [findShopi, data]);
  const findProduct = useCallback((id: ProductId) => {
	return findShop(id[0])?.products.find(p => p.name === id[1]);
  }, [findShop]);

  const createProduct = useCallback(async (shopName: string, p: AdminProduct) => {
	const res = await fetch('/api/shop/' + shopName + '/product', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(p),
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	} else {
		const prod = json.product as AdminProduct;
		const shop = findShop(prod.shopName)!;
		shop.products.push(prod);
		toast.success("Created product: " + prod.name);
	}
  }, [findShop]);

  const updateProduct = useCallback(async (id: ProductId, p: AdminProduct) => {
	const res = await fetch('/api/shop/' + id[0] + '/product/' + id[1], {
	  method: 'PATCH',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(p),
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	} else {
		const prod = json.product as AdminProduct;
		const [shopI, prodI] = findProducti(id);
		data[shopI].products[prodI] = prod;
		toast.success("Edited product: " + prod.name);
		updateData([...data]);
	}
  }, [data, findProducti, updateData]);

  const deleteProduct = useCallback(async (id: ProductId) => {
	const res = await fetch('/api/shop/' + id[0] + '/product/' + id[1], {
	  method: 'DELETE',
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return
	} else {
		const [shopI, prodI] = findProducti(id);
		const shop = data[shopI];
		const prod = shop.products[prodI];
		shop.products.splice(prodI, 1);
		toast.success("Deleted product: " + prod.name);
		updateData([...data]);
	}
  }, [data, findProducti, updateData]);
  return {
	setSelectedProduct,
	selectedProduct,
	createProduct,
	findProduct,
	findProducti,
	updateProduct,
	deleteProduct,
  };
}

export function useCode(): useCodeReturn {
	const context = useContext(productsContext);
	if (context === undefined)
	  throw new Error('useSelectedProduct must be used within a ProductsProviderProps');
	const { selectedProduct: productId, data, setData: updateData } = context;
	const { findProduct } = useProducts();
	const product = productId ? findProduct(productId) : undefined;

	const findCode = useCallback((code: string) => {
		return product?.codes.find(c => c.code === code);
	}, [product]);
	const findCodei = useCallback((code: string) => {
		return product?.codes.findIndex(c => c.code === code) ?? -1;
	}, [product]);

	const createCode = useCallback(async (code: string, productId: ProductId) => {
		const res = await fetch('/api/shop/' + productId[0] + '/code', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code, productName: productId[1] }),
		});
		const json = await res.json()
		if (!res.ok) {
			toast.error(json.error);
			return 
		} else {
			const code = json.code as AdminCode;
			findProduct(productId)!.codes.push(code);
			toast.success("Created code: " + code.code);
			updateData([...data]);
		}
	}, [data, findProduct, updateData]);

	const updateCode = useCallback(async (code: string, newCode: string, productId: ProductId) => {
		const res = await fetch('/api/shop/' + productId[0] + '/code/' + code, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code: newCode }),
		});
		const json = await res.json()
		if (!res.ok) {
			toast.error(json.error);
			return 
		} else {
			const newCode = json.code as AdminCode;
			const i = findCodei(code);
			findProduct(productId)!.codes[i] = newCode;
			toast.success("Edited code: " + newCode.code);
			updateData([...data]);
		}
	}, [data, findCodei, findProduct, updateData]);

	const deleteCode = useCallback(async (code: string, productId: ProductId) => {
		const res = await fetch('/api/shop/' + productId[0] + '/code/' + code, {
			method: 'DELETE',
		});
		const json = await res.json()
		if (!res.ok) {
			toast.error(json.error);
			return 
		} else {
			const i = findCodei(code);
			findProduct(productId)!.codes.splice(i, 1);
			toast.success("Deleted code: " + code);
			updateData([...data]);
		}
	}, [data, findCodei, findProduct, updateData]);

	const deleteCodes = useCallback(async (codes: string[], productId: ProductId) => {
		const res = await fetch('/api/shop/' + productId[0] + '/code', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ codes }),
		});
		const json = await res.json()
		if (!res.ok) {
			toast.error(json.error);
			return 
		} else {
			const product = findProduct(productId)!;
			const newCodes = product.codes.filter(c => !codes.includes(c.code));
			product.codes = newCodes;
			toast.success("Deleted codes: " + codes.join(', '));
			updateData([...data]);
		}
	}, [data, findProduct, updateData]);

	return {
		product,
		productId,
		createCode,
		findCode,
		findCodei,
		updateCode,
		deleteCode,
		deleteCodes,
	};
};

interface ProductsProviderProps {
  children: ReactNode;
}
export function ProductsProvider({ children }: ProductsProviderProps) {
  const [brands, setData] = useState<AdminShop[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductId | null>(null);
  const refresh = useCallback(async () => {
	const res = await fetch('/api/shop')
	if (res.status !== 200) {
	  console.error(res);
	  return;
	}
	const data = await res.json();
	setData(data.shops);
  }, []);
  useEffect(() => {
	refresh();
  }, [refresh]);

  const contextValue: ProductsContext = {
    data: brands,
	selectedProduct,
    setData,
	setSelectedProduct,
	refresh,
  };
  return <productsContext.Provider value={contextValue}>{children}</productsContext.Provider>;
}
