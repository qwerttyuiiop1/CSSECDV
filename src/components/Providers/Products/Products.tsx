import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Brand, Product, data } from './Brand';
import { toast } from 'react-toastify';


export type ProductId = [number, number];
export type BrandId = {
  brand?: string;
  brandId?: number;
};
type CodeId = number;

interface ProductsContext {
  data: Brand[];
  setData: (data: Brand[]) => void;
  selectedProduct: ProductId;
  setSelectedProduct: (data: ProductId) => void;
}
const productsContext = createContext<ProductsContext | undefined>(undefined);

export interface useBrandsReturn {
  data: Brand[];
  createBrand: (brand: string) => Promise<void>;
  findBrand: (a: BrandId) => Brand | undefined;
  updateBrand: (a: BrandId & { name: string }) => Promise<void>;
  deleteBrand: (a: BrandId) => Promise<void>;
}
export interface useProductsReturn {
	setSelectedProduct: (data: ProductId) => void;
	selectedProduct: ProductId;
	createProduct: (brand: BrandId, p: Product) => Promise<void>;
	findProduct: (id: ProductId) => Product | undefined;
	updateProduct: (id: ProductId, p: Product) => Promise<void>;
	deleteProduct: (id: ProductId) => Promise<void>;
}
export interface useSelectedProductReturn {
  selectedProduct: Product | undefined;
  productId: ProductId;
  createCode: (code: string) => Promise<void>;
  findCode: (id: CodeId) => string | undefined;
  updateCode: (id: CodeId, code: string) => Promise<void>;
  deleteCode: (id: CodeId) => Promise<void>;
  deleteCodes: (codes: string[]) => Promise<void>;
}


export function useBrands(): useBrandsReturn {
  const context = useContext(productsContext);
  if (context === undefined)
    throw new Error('useBrands must be used within a ProductsProviderProps');
  const { data, setData: updateData } = context;

  const findBrand = useCallback(({ brand, brandId }: BrandId) => {
	if (brandId !== undefined)
	  return data[brandId];
	return data.find(b => b.name === brand);
  }, [data]);

  const createBrand = useCallback(async (brand: string) => {
	if (findBrand({ brand })) {
	  toast.error("Brand already exists");
	  return;
	}
	updateData([...data, { name: brand, products: [] }]);
  }, [data, findBrand, updateData]);

  const updateBrand = useCallback(async (id: BrandId & { name: string }) => {
	try {
		const brand = findBrand(id);
		if (!brand) {
			toast.error("Unable to find brand");
			return;
		}
		brand.name = id.name;
		updateData([...data]);
	} catch (e) {
		
	}
  }, [data, findBrand, updateData]);

  const deleteBrand = useCallback(async ({ brand, brandId: i }: BrandId) => {
	if (i !== undefined)
	  updateData([...data].splice(i, 1));
	else
	  updateData(data.filter(b => b.name !== brand));
  }, [data, updateData]);

  return {
	data,
	createBrand,
	findBrand,
	updateBrand,
	deleteBrand,
  };
}
export function useProducts(): useProductsReturn {
  const context = useContext(productsContext);
  if (context === undefined)
	throw new Error('useProducts must be used within a ProductsProviderProps');
  const { 
	setSelectedProduct, data, setData: updateData, selectedProduct
  } = context;
  const { findBrand } = useBrands();

  const findProduct = useCallback(
	(id: ProductId) => data[id[0]]?.products[id[1]],
	[data]
  );

  const createProduct = useCallback(async (id: BrandId, p: Product) => {
	const brand = findBrand(id);
	if (!brand) {
		toast.error("Unable to find brand");
		return;
	}
	if (brand.products.find(pr => pr.name === p.name)) {
		toast.error("Product already exists");
		return;
	}
	brand.products.push(p);
	updateData([...data]);
  }, [data, findBrand, updateData]);

  const updateProduct = useCallback(async (id: ProductId, p: Product) => {
	try {
	  data[id[0]].products[id[1]] = p;
	  updateData([...data]);
	} catch (e) {
	  toast.error("Unable to find product");
	}
  }, [data, updateData]);

  const deleteProduct = useCallback(async (id: ProductId) => {
	try {
	  data[id[0]].products.splice(id[1], 1);
	  updateData([...data]);
	} catch (e) {
	  toast.error("Unable to find product");
	}
  }, [data, updateData]);
  return {
	setSelectedProduct,
	selectedProduct,
	createProduct,
	findProduct,
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
	const product = findProduct(productId);

	const findCode = useCallback((code: CodeId) => {
		return product?.activeCodes[code]
	}, [product]);

	const createCode = useCallback(async (code: string) => {
		if (product?.activeCodes.find(c => c === code)) {
			toast.error("Code already exists");
			return;
		}
		product?.activeCodes.push(code);
		updateData([...data]);
	}, [data, product, updateData]);

	const updateCode = useCallback(async (id: CodeId, code: string) => {
		try {
			product!.activeCodes[id] = code;
			updateData([...data]);
		} catch (e) {
			toast.error("Unable to find code");
		}
	}, [data, product, updateData]);

	const deleteCode = useCallback(async (id: CodeId) => {
		try {
			product!.activeCodes.splice(id, 1);
			updateData([...data]);
		} catch (e) {
			toast.error("Unable to find code");
		}
	}, [data, product, updateData]);

	const deleteCodes = useCallback(async (codes: string[]) => {
		try {
			product!.activeCodes = product!.activeCodes.filter(c => !codes.includes(c));
			updateData([...data]);
		} catch (e) {
			toast.error("Unable to find code");
		}
	}, [data, product, updateData]);

	return {
		selectedProduct: product,
		productId,
		createCode,
		findCode,
		updateCode,
		deleteCode,
		deleteCodes,
	};
};

interface ProductsProviderProps {
  children: ReactNode;
}
export function ProductsProvider({ children }: ProductsProviderProps) {
  const [brands, setData] = useState<Brand[]>(data);
  const [selectedProduct, setSelectedProduct] = useState<ProductId>([-1, -1]);

  const contextValue: ProductsContext = {
    data: brands,
	selectedProduct,
    setData,
	setSelectedProduct,
  };
  return <productsContext.Provider value={contextValue}>{children}</productsContext.Provider>;
}
