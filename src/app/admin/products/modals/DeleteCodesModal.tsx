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
import { toast } from "react-toastify";
import { Product } from "../Brand";

interface DeleteCodesProps extends BaseModalProps {
	onSubmit: () => Promise<void> | void; 
	codes: string[];
	product: Product;
}

const DeleteCodesModal: React.FC<DeleteCodesProps> = ({
	state, onSubmit, codes, product
}) => {
	const close = () => state[1](false);
	const handleSubmit = async () => {
		await onSubmit();
		toast.success("Codes deleted: " + codes.join(", "));
		close();
	};
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<Card>
			<Title>Delete Codes</Title>
			<Separator />
			<div className={styles.modal_description}>
				Delete <strong>{codes.length}x Codes</strong> from {product.name}?
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

export default DeleteCodesModal;