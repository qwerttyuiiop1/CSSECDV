"use client"
import React from "react";
import styles from "./products.module.css";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { EditButton, DeleteButton } from "./Components";
import { AnimatePresence, motion } from "framer-motion";
import { Brand, Product } from "../Brand";

export interface BrandProductsProps {
	brands: Brand;
	selectedProduct: number;
	isExpanded: boolean;
	onSelectProduct: (index: number) => void;
	onToggle: () => void;
}
const Subrow: React.FC<{
	product: Product,
	onSelect: () => void,
	selected: boolean,
}> = ({ product, onSelect, selected }) => {
	return (
		<div 
			className={styles.flex_row}
			onClick={onSelect}>
			<MdOutlineSubdirectoryArrowRight className={styles.arrow}/>
			<div className={`${styles.row} ${selected ? styles.selected : ''}`}>
				<span className={styles.product}>{product.name}</span>
				<span className={styles.price}>{product.price}</span>
				<span className={styles.stock}>{product.activeCodes.length}</span>
				<div className={`${styles.actions} ${styles.actions_container}`}>
					<EditButton/>
					<DeleteButton/>
				</div>
			</div>
		</div>
	);
};
const BrandProducts: React.FC<BrandProductsProps> = ({ 
	brands, selectedProduct, onSelectProduct, isExpanded, onToggle
}) => {
	return (
		<div className={`${styles.font_body} ${styles.flex_col}`}>
			<div className={styles.row} onClick={onToggle}>
				<span className={styles.brand}>{brands.name}</span>
				<div className={styles.spacer} />
				<div className={`${styles.actions} ${styles.actions_container}`}>
					<EditButton />
					<DeleteButton />
					{ isExpanded ? (
						<AiFillCaretUp className={styles.expand_icon} onClick={onToggle}/> 
					) : (
						<AiFillCaretDown className={styles.expand_icon} onClick={onToggle}/>
					)}
				</div>
			</div>
			<AnimatePresence>{ isExpanded && <motion.div
				initial={{ opacity: 0, height: 0, y: -20 }}
				animate={{ opacity: 1, height: 'auto', y: 0 }}
				exit={{ opacity: 0, height: 0, y: -20 }}
				transition={{ duration: 0.3 }}> {
					brands.products.map((product, i) => (<Subrow
						key={i}
						product={product}
						onSelect={() => onSelectProduct(i)}
						selected={i === selectedProduct}
					/>))
				} 
			</motion.div>}
			</AnimatePresence>
		</div>
	);
};

export default BrandProducts;