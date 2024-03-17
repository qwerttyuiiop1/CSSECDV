import React from "react";
import { 
	Title,
	CardRow,
	SideButton,
	Card,
	Separator,
} from "@/components/CardPage/CardPage";
import styles from "./modal.module.css"
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useProducts } from "@/components/Providers/Products/Products";
import { ProductId } from "@type/Shop";

interface DeleteProductProps extends BaseModalProps {
	id: ProductId;
}

const DeleteProductModal: React.FC<DeleteProductProps> = ({
	state, id
}) => {
	const { findProduct, deleteProduct } = useProducts();
	const product = findProduct(id)!;
	const close = () => state[1](false);
	const handleSubmit = async () => {
		await deleteProduct(id);
		close();
	};
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<Card>
			<Title>Delete Brand</Title>
			<Separator />
			<div className={styles.modal_description}>
				Delete <strong>{product.name}</strong> from {product.shopName}?
				<br />
				This action CANNOT be undone.
			</div>
			<CardRow>
				<SideButton onClick={close} color="gray">
					Cancel
				</SideButton>
				<SideButton onClick={handleSubmit} color="red">
					Delete
				</SideButton>
			</CardRow>
		</Card>
		</BaseModal>
	);
}

export default DeleteProductModal;