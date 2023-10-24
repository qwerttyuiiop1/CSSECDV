"use client"
import React, { useState } from "react";
import styles from "./products.module.css";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { EditButton, DeleteButton } from "./Components";
import { AnimatePresence, motion } from "framer-motion";
import { Brand, Product } from "../../../../components/Providers/Products/Brand";
import EditBrandModal from "../modals/EditBrandModal";
import DeleteBrandModal from "../modals/DeleteBrandModal";
import EditProductModal from "../modals/EditProductModal";
import DeleteProductModal from "../modals/DeleteProductModal";
import { modalHandler } from "@/components/Modal/BaseModal";
import { ProductId } from "@/components/Providers/Products/Products";

export interface BrandProductsProps {
	brand: Brand;
	brandId: number;
	selectedProduct: number;
	isExpanded: boolean;
	onSelectProduct: (index: number) => void;
	onToggle: () => void;
}
const Subrow: React.FC<{
	product: Product,
	id: ProductId,
	onSelect: () => void,
	selected: boolean,
}> = ({ product, onSelect, selected, id }) => {
	const editModal = useState(false);
	const deleteModal = useState(false);
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
					<EditButton onClick={modalHandler(editModal)}/>
					<EditProductModal state={editModal} id={id}/>
					<DeleteButton onClick={modalHandler(deleteModal)}/>
					<DeleteProductModal state={deleteModal} id={id}/>
				</div>
			</div>
		</div>
	);
};
const BrandProducts: React.FC<BrandProductsProps> = ({ 
	brand, selectedProduct, onSelectProduct, isExpanded, onToggle, brandId
}) => {
	const editModal = useState(false);
	const deleteModal = useState(false);
	return (
		<div className={`${styles.font_body} ${styles.flex_col}`}>
			<div className={styles.row} onClick={onToggle}>
				<span className={styles.brand}>{brand.name}</span>
				<div className={styles.spacer} />
				<div className={`${styles.actions} ${styles.actions_container}`}>
					<EditButton onClick={modalHandler(editModal)}/>
					<EditBrandModal state={editModal} brand={brand}/>
					<DeleteButton onClick={modalHandler(deleteModal)}/>
					<DeleteBrandModal state={deleteModal} brand={brand}/>
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
					brand.products.map((product, i) => (<Subrow
						key={i}
						id={[brandId, i]}
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