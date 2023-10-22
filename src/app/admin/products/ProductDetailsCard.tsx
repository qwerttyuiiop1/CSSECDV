import React, { useState } from "react";
import { Product } from "./Brand";
import styles from "./components/products.module.css";
import { 
	AddButton, 
	Card, 
	HeaderRow, 
	MinusButton, 
	RefreshButton,
	DeleteButton,
	EditButton
} from "./components/Components";
import ComponentStyles from "./components/components.module.css";
import { BiSearch } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { SlideDown } from "@/components/Animations/Animations";

const Row: React.FC<{
	isSelected: boolean;
	onSelect: () => void;
	code: string;
}> = ({ isSelected, onSelect, code }) => {
	return (
		<div className={`${styles.row} ${isSelected ? styles.delete : ''}`}>
			{isSelected ? (
				<DeleteButton onClick={onSelect} />
			) : (
				<div className={ComponentStyles.delete_icon} onClick={onSelect}/>
			)}
			<span className={styles.code}>{code}</span>
			<EditButton />
		</div>
	)
}

interface ProductDetailsCardProps {
  product?: Product;
}
const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
	const [ filter, setFilter ] = useState<string>("");
	const [ isSelected, setIsSelected ] = useState<boolean[]>(product?.activeCodes.map(() => false) || []);
	const hasDelete = isSelected.some((value, i) => value && product?.activeCodes[i].includes(filter));
	const handleSelect = (index: number) => {
		const arr = [...isSelected];
		arr[index] = !arr[index];
		setIsSelected(arr);
	}
	return (
		<div className={styles.details_container}>
			<div className={styles.title_container}>
				{product && <>
					<span className={styles.title_product}> {product.name} </span>
					<span className={styles.title_stock}> {'Stock: ' + product.activeCodes.length} </span>
				</>}
			</div>
			<Card header={
				<HeaderRow>
					<div className={`${ComponentStyles.header_button} ${styles.search_container}`}>
						<BiSearch className={styles.search_icon} />
						<div className={styles.search_divider} />
						<input 
							className={`${ComponentStyles.header_button} ${styles.search}`} 
							placeholder="Search Code" 
							onChange={ (e) => setFilter(e.target.value) }/>
					</div>
					<div className={styles.spacer} />
					<AddButton />
					<RefreshButton />
					{hasDelete ? (
						<MinusButton 
							color="#FF4A4A" style={{borderColor: '#FF4A4A'}}
							/>
					) : (
						<MinusButton opacity='50%'/>
					)}
					
				</HeaderRow>
			} body={
				<div className={styles.table}>
					<div className={styles.header_row}>
						<DeleteButton visibility='hidden'/>
						<span className={styles.code}>Code</span>
						<span className={styles.actions}>Actions</span>
					</div>

					<AnimatePresence>{
						product?.activeCodes.map((code, i) => 
							code.includes(filter) && (
								<SlideDown key={i}>
									<Row
										code={code}
										onSelect={() => handleSelect(i)}
										isSelected={isSelected[i]}
									/>
								</SlideDown>
							)
						)
					}</AnimatePresence>
				</div>
			}/>
		</div>
	)
};

export default ProductDetailsCard;