"use client";
import React from "react";
import {
	HeaderButton,
	Card,
	HeaderRow,
	AddButton,
	RefreshButton
} from "./components/Components";
import styles from "./components/products.module.css"

import BrandProducts from "./components/BrandProducts";
import { Brand } from "./Brand";
import { AnimatePresence } from "framer-motion";
import { SlideDown } from "@/components/Animations/Animations";
interface ProductsCardProps {
	brands: Brand[];
	selectedProduct: [number, number];
	onSelectProduct: (index: [number, number]) => void;
}
const ProductsCard = ({ brands, selectedProduct, onSelectProduct }: ProductsCardProps) => {
  const [ isExpanded, setIsExpanded ] = React.useState<boolean[]>(brands.map(() => false))
  const handleExpand = (index: number) => {
	const arr = [...isExpanded]
	arr[index] = !arr[index]
	setIsExpanded(arr)
  };
  const openAll = () => {
	setIsExpanded(brands.map(() => true))
  }
  const collapseAll = () => {
	setIsExpanded(brands.map(() => false))
  }
  return (
  	<div className={styles.products_container}>
		<div className={styles.title_container}>
			<span className={styles.title}> Product Management </span>
		</div>
		<Card header={
			<HeaderRow>
				<HeaderButton onClick={openAll}>Open All</HeaderButton>
				<HeaderButton onClick={collapseAll}>Collapse All</HeaderButton>
				<div className={styles.spacer} />
				<AddButton />
				<RefreshButton />
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
				<AnimatePresence>
				<SlideDown>{
					brands.map((brand, i) => {
						return (
							<BrandProducts 
								key={i}
								brands={brand}
								selectedProduct={selectedProduct[0] === i ? selectedProduct[1] : -1}
								onSelectProduct={(n) => onSelectProduct([i, n])}
								isExpanded={isExpanded[i]}
								onToggle={() => handleExpand(i)}
							/>
						)
					})
				}</SlideDown>
				</AnimatePresence>
			</div>
		} />
	</div>
  );
};

export default ProductsCard;