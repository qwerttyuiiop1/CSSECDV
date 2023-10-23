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
import { Product } from "../Brand";
import { toast } from "react-toastify";

interface DeleteBrandProps extends BaseModalProps {
	onSubmit: () => Promise<void> | void; 
	product: Product;
}

const DeleteBrandModal: React.FC<DeleteBrandProps> = ({
	state, onSubmit, product
}) => {
	const close = () => state[1](false);
	const handleSubmit = async () => {
		await onSubmit();
		toast.success("Product deleted: " + product.name);
		close();
	};
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<Card>
			<Title>Delete Brand</Title>
			<Separator />
			<div className={styles.modal_description}>
				Delete <strong>{product.name}</strong> from {product.brand}?
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

export default DeleteBrandModal;