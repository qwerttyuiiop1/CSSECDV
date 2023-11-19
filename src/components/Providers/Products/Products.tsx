import React, { createContext, useContext, ReactNode, useState, useCallback, use, useEffect } from 'react';
import { Product, Shop, ProductId, Code } from '../../../lib/types/Shop';
import { toast } from 'react-toastify';




interface ProductsContext {
  data: Shop[];
  setData: (data: Shop[]) => void;
  selectedProduct: ProductId | null;
  setSelectedProduct: (data: ProductId) => void;
}
const productsContext = createContext<ProductsContext | undefined>(undefined);

export interface useShopsReturn {
  data: Shop[];
  createShop: (name: string) => Promise<void>;
  findShop: (name: string) => Shop | undefined;
  findShopi: (name: string) => number;
  updateShop: (name: string, newName: string) => Promise<void>;
  deleteShop: (name: string) => Promise<void>;
}
export interface useProductsReturn {
	setSelectedProduct: (data: ProductId) => void;
	selectedProduct: ProductId | null;
	createProduct: (shop: string, p: Product) => Promise<void>;
	findProduct: (id: ProductId) => Product | undefined;
	findProducti: (id: ProductId) => [number, number];
	updateProduct: (id: ProductId, p: Product) => Promise<void>;
	deleteProduct: (id: ProductId) => Promise<void>;
}
export interface useSelectedProductReturn {
  product: Product | undefined;
  productId: ProductId | null;
  createCode: (code: string) => Promise<void>;
  findCode: (code: string) => Code | undefined;
  findCodei: (code: string) => number;
  updateCode: (code: string, newCode: string) => Promise<void>;
  deleteCode: (code: string) => Promise<void>;
  deleteCodes: (codes: string[]) => Promise<void>;
}


export function useShops(): useShopsReturn {
  const context = useContext(productsContext);
  if (context === undefined)
    throw new Error('useBrands must be used within a ProductsProviderProps');
  const { data, setData: updateData } = context;

  const findShopi = useCallback((name: string) => {
	return data.findIndex(b => b.name === name);
  }, [data]);
  const findShop = useCallback((name: string) => {
	return data.find(b => b.name === name);
  }, [data]);

  const createShop = useCallback(async (name: string) => {
	const res = await fetch('/api/shop', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ name }),
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	} else {
	  json.shop.products = [];
	  toast.success("Created brand: " + json.shop.name);
	  updateData([...data, json.shop]);
	}
  }, [data, updateData]);

  const updateShop = useCallback(async (name: string, newName: string) => {
	const shop = findShop(name);
	if (!shop) {
	  toast.error("Unable to find brand");
	  return;
	}
	const res = await fetch('/api/shop/' + name, {
	  method: 'PATCH',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ name: newName }),
	});
	const json = await res.json()
	if (!res.ok) {
	  toast.error(json.error);
	  return 
	} else {
	  shop.name = json.shop.name;
	  toast.success("Edited brand: " + json.shop.name);
	  updateData([...data]);
	}
  }, [data, findShop, updateData]);

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

  return {
	data,
	createShop,
	findShop,
	findShopi,
	updateShop,
	deleteShop,
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

  const createProduct = useCallback(async (shopName: string, p: Product) => {
	const prodI = findProducti([shopName, p.name]);
	if (prodI[1] !== -1) {
	  toast.error("Product already exists");
	} else if (prodI[0] === -1) {
	  toast.error("Brand does not exist");
	} else {
	  data[prodI[0]].products.push(p);
	  updateData([...data]);
	}
  }, [data, findProducti, updateData]);

  const updateProduct = useCallback(async (id: ProductId, p: Product) => {
	const prodI = findProducti(id);
	if (prodI[1] === -1) {
	  toast.error("Unable to find product");
	} else if (prodI[0] === -1) {
	  toast.error("Unable to find brand");
	} else {
	  data[prodI[0]].products[prodI[1]] = p;
	  updateData([...data]);
	}
  }, [data, findProducti, updateData]);

  const deleteProduct = useCallback(async (id: ProductId) => {
	const prodI = findProducti(id);
	if (prodI[1] === -1) {
	  toast.error("Unable to find product");
	} else if (prodI[0] === -1) {
	  toast.error("Unable to find brand");
	} else {
	  data[prodI[0]].products.splice(prodI[1], 1);
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

export function useSelectedProduct(): useSelectedProductReturn {
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

	const createCode = useCallback(async (code: string) => {
		if (!product) return
		if (findCode(code)) {
			toast.error("Code already exists");
			return;
		}
		product.codes.push({ code, productName: product.name, shopName: product.shopName });
		updateData([...data]);
	}, [data, findCode, product, updateData]);

	const updateCode = useCallback(async (code: string, newCode: string) => {
		if (!product) return
		const a = findCode(code);
		if (!a) {
			toast.error("Unable to find code");
			return;
		}
		a.code = newCode;
		updateData([...data]);
	}, [data, findCode, product, updateData]);

	const deleteCode = useCallback(async (code: string) => {
		if (!product) return
		const i = findCodei(code);
		product.codes.splice(i, 1);
		updateData([...data]);
	}, [data, findCodei, product, updateData]);

	const deleteCodes = useCallback(async (codes: string[]) => {
		if (!product) return
		product.codes = product.codes.filter(c => !codes.includes(c.code));
		updateData([...data]);
	}, [data, product, updateData]);

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
  const [brands, setData] = useState<Shop[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductId | null>(null);
  useEffect(() => {
	fetch('/api/shop?full=true').then(async res => {
	  if (res.status !== 200) {
		console.error(res);
		return;
	  }
	  const data = await res.json();
	  setData(data.shops);
	});
  }, []);

  const contextValue: ProductsContext = {
    data: brands,
	selectedProduct,
    setData,
	setSelectedProduct,
  };
  return <productsContext.Provider value={contextValue}>{children}</productsContext.Provider>;
}
