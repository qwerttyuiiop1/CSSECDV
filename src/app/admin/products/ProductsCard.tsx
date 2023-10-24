"use client";
import React, { useState } from "react";
import {
	HeaderButton,
	Card,
	HeaderRow,
	AddButton,
	RefreshButton
} from "./components/Components";
import styles from "./components/products.module.css"

import BrandProducts from "./components/BrandProducts";
import { Brand } from "../../../components/Providers/Products/Brand";
import { AnimatePresence } from "framer-motion";
import { SlideDown } from "@/components/Animations/Animations";
import { Options, OptionsDivider } from "@/components/Dropdown/Options";
import CreateBrandModal from "./modals/CreateBrandModal";
import CreateProductModal from "./modals/CreateProductModal";
import { toast } from "react-toastify";
import { useBrands, useProducts } from "@/components/Providers/Products/Products";

const ProductsCard = () => {
  const { data: brands } = useBrands();
  const { selectedProduct, setSelectedProduct: onSelectProduct } = useProducts();
  const [ isExpanded, setIsExpanded ] = useState<boolean[]>(brands.map(() => false))
  const handleExpand = (index: number) => {
	const arr = [...isExpanded]
	arr[index] = !arr[index]
	setIsExpanded(arr)
  };
  const openAll = () => setIsExpanded(brands.map(() => true))
  const collapseAll = () => setIsExpanded(brands.map(() => false))
  const log = async (data: any) => console.log(data)
  const handleCreateBrand = () => brandModal[1](true)
  const handleCreateProduct = () => productModal[1](true)
  const brandModal = useState(false);
  const productModal = useState(false);

  return (
  	<div className={styles.products_container}>
		<CreateBrandModal state={brandModal} />
		<CreateProductModal state={productModal} />
		<div className={styles.title_container}>
			<span className={styles.title}> Product Management </span>
		</div>
		<Card header={
			<HeaderRow>
				<HeaderButton onClick={openAll}>Open All</HeaderButton>
				<HeaderButton onClick={collapseAll}>Collapse All</HeaderButton>
				<div className={styles.spacer} />
				<Options 
					button={<AddButton/>}
					content={<>
						<span onClick={handleCreateBrand}> Create Brand </span>
						<OptionsDivider />
						<span onClick={handleCreateProduct}> Create Product </span>
					</>}/>
				<RefreshButton onClick={()=>toast.info("refreshed")}/>
			</HeaderRow>
		} body= {
			<div className={styles.table}>
				<div className={styles.header_row}>
					<span className={styles.brand}>Brand</span>
					<span className={styles.product}>Product</span>
					<span className={styles.price}>Price</span>
					<span className={styles.stock}>Stock</span>
					<span className={styles.actions}>Actions</span>
				</div>
				<AnimatePresence>{
					brands.map((brand, i) => {
						return (
							<SlideDown key={i}>
							<BrandProducts 
								brandId={i}
								brand={brand}
								selectedProduct={selectedProduct[0] === i ? selectedProduct[1] : -1}
								onSelectProduct={(n) => onSelectProduct([i, n])}
								isExpanded={isExpanded[i]}
								onToggle={() => handleExpand(i)}/>
							</SlideDown>
						)
					})
				}</AnimatePresence>
			</div>
		} />
	</div>
  );
};

export default ProductsCard;