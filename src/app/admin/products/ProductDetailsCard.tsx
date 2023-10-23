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
import { AnimatePresence } from "framer-motion";
import { SlideDown } from "@/components/Animations/Animations";
import CreateCodeModal from "./modals/CreateCodeModal";
import { modalHandler } from "@/components/Modal/BaseModal";
import { toast } from "react-toastify";
import DeleteCodesModal from "./modals/DeleteCodesModal";
import EditCodeModal from "./modals/EditCodeModal";
import { Options, OptionsDivider } from "@/components/Dropdown/Options";

const Row: React.FC<{
	isSelected: boolean;
	onSelect: () => void;
	code: string;
}> = ({ isSelected, onSelect, code }) => {
	const editCodeModal = useState(false);
	return (
		<div className={`${styles.row} ${isSelected ? styles.delete : ''}`}>
			{isSelected ? (
				<DeleteButton onClick={onSelect} />
			) : (
				<div className={ComponentStyles.delete_icon} onClick={onSelect}/>
			)}
			<span className={styles.code}>{code}</span>
			<EditButton onClick={modalHandler(editCodeModal)}/>
			<EditCodeModal onSubmit={console.log} state={editCodeModal} code={code} />
		</div>
	)
}

interface ProductDetailsCardProps {
  product?: Product;
}
const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
	const [ filter, setFilter ] = useState<string>("");
	const [ isSelected, setIsSelected ] = useState<boolean[]>(product?.activeCodes.map(() => false) || []);
	const deleteCodes =  product?.activeCodes.filter((v, i) => isSelected[i] && v.includes(filter));
	const handleSelect = (index: number) => {
		const arr = [...isSelected];
		arr[index] = !arr[index];
		setIsSelected(arr);
	}
	const creteCodeModal = useState(false);
	const deleteCodesModal = useState(false);
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
					<Options 
						button={<AddButton />}
						content={<>
							<span> Create Product </span>
							<OptionsDivider />
							<span onClick={modalHandler(creteCodeModal)}> Add Single Code </span>
							<CreateCodeModal onSubmit={console.log} state={creteCodeModal} />
						</>}/>
					<RefreshButton onClick={()=>toast.info("refreshed")}/>
					{deleteCodes?.length ? (<>
						<MinusButton onClick={modalHandler(deleteCodesModal)}
							color="#FF4A4A" style={{borderColor: '#FF4A4A'}}
							/>
						<DeleteCodesModal 
							state={deleteCodesModal}
							onSubmit={console.log}
							codes={deleteCodes}
							product={product!} />
					</>) : (
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