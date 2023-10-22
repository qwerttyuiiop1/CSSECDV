"use client"
import React from "react";
import styles from "./products.module.css";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";


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
export interface BrandProductsProps {
	brands: Brand;
	selectedProduct: number;
	isExpanded: boolean;
	onSelectProduct: (index: number) => void;
	onToggle: () => void;
}


const BrandProducts: React.FC<BrandProductsProps> = ({ 
	brands, selectedProduct, onSelectProduct, isExpanded, onToggle
}) => {
	return (
		<div className={`${styles.font_body} ${styles.flex_col}`}>
			<div className={styles.row}>
				<span className={styles.brand}>{brands.name}</span>
				<div className={styles.spacer} />
				<div className={`${styles.actions} ${styles.actions_container}`}>
					<BsFillPencilFill className={styles.edit_icon}/>
					<FaMinus className={styles.delete_icon}/>
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
					brands.products.map((product, i) => {
						return <div key={i} className={styles.flex_row}>
							<MdOutlineSubdirectoryArrowRight className={styles.arrow}/>
							<div className={styles.row}>
								<span className={styles.product}>{product.name}</span>
								<span className={styles.price}>{product.price}</span>
								<span className={styles.stock}>{product.activeCodes.length}</span>
								<div className={`${styles.actions} ${styles.actions_container}`}>
									<BsFillPencilFill className={styles.edit_icon}/>
									<FaMinus className={styles.delete_icon}/>
								</div>
							</div>
						</div>
					})} 
			</motion.div>}
			</AnimatePresence>
		</div>
	);
};

export default BrandProducts;