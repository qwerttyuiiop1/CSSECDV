"use client"
import React, { useState } from "react";
import styles from "./products.module.css";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { EditButton, DeleteButton } from "./Components";
import { AnimatePresence, motion } from "framer-motion";
import { AdminShop, AdminProduct } from "@type/AdminShop";
import EditBrandModal from "../modals/EditBrandModal";
import DeleteShopModal from "../modals/DeleteBrandModal";
import EditProductModal from "../modals/EditProductModal";
import DeleteProductModal from "../modals/DeleteProductModal";
import { modalHandler } from "@/components/Modal/BaseModal";
import { ProductId } from "@type/Shop";

export interface ShopProductsProps {
	shop: AdminShop;
	selectedProduct: ProductId | null;
	isExpanded: boolean;
	onSelectProduct: (a: ProductId) => void;
	onToggle: () => void;
}
const Subrow: React.FC<{
	product: AdminProduct,
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
				<span className={styles.stock}>{product.codes.length}</span>
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
const BrandProducts: React.FC<ShopProductsProps> = ({ 
	shop, selectedProduct, onSelectProduct, isExpanded, onToggle
}) => {
	const editModal = useState(false);
	const deleteModal = useState(false);
	return (
		<div className={`${styles.font_body} ${styles.flex_col}`}>
			<div className={styles.row} onClick={onToggle}>
				<span className={styles.brand}>{shop.name}</span>
				<div className={styles.spacer} />
				<div className={`${styles.actions} ${styles.actions_container}`}>
					<EditButton onClick={modalHandler(editModal)}/>
					<EditBrandModal state={editModal} shop={shop}/>
					<DeleteButton onClick={modalHandler(deleteModal)}/>
					<DeleteShopModal state={deleteModal} shop={shop}/>
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
					shop.products.map((product, i) => (<Subrow
						key={i}
						id={[shop.name, product.name]}
						product={product}
						onSelect={() => onSelectProduct([shop.name, product.name])}
						selected={selectedProduct?.[0] === shop.name && selectedProduct?.[1] === product.name}
					/>))
				} 
			</motion.div>}
			</AnimatePresence>
		</div>
	);
};

export default BrandProducts;