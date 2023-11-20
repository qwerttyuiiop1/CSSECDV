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
import { Product } from "../../../../lib/types/Shop";
import { useCode } from "@/components/Providers/Products/Products";

interface DeleteCodesProps extends BaseModalProps {
	codes: string[];
	product: Product;
}

const DeleteCodesModal: React.FC<DeleteCodesProps> = ({
	state, codes, product
}) => {
	const { deleteCodes, productId } = useCode();
	const close = () => state[1](false);
	const handleSubmit = async () => {
		await deleteCodes(codes, productId!);
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