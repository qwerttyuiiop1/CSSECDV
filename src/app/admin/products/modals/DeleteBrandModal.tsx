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
import { Brand } from "../../../../components/Providers/Products/Brand";
import { toast } from "react-toastify";
import { useBrands } from "@/components/Providers/Products/Products";

interface DeleteBrandProps extends BaseModalProps {
	brand: Brand;
}

const DeleteBrandModal: React.FC<DeleteBrandProps> = ({
	state, brand
}) => {
	const close = () => state[1](false);
	const { deleteBrand } = useBrands();
	const handleSubmit = async () => {
		await deleteBrand({ brand: brand.name });
		toast.success("Brand deleted: " + brand.name);
		close();
	};
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<Card>
			<Title>Delete Brand</Title>
			<Separator />
			<div className={styles.modal_description}>
				Delete <strong>{brand.name}</strong> brand? This will delte all its products.
				<br />
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