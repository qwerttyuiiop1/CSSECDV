import React from "react";
import { 
	Title,
	Input,
	Label,
	CardRow,
	SideButton,
	Card,
	FileInput
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { AdminShop } from "../../../../lib/types/AdminShop";
import { useShops } from "@/components/Providers/Products/Products";

interface EditShopProps extends BaseModalProps {
	shop: AdminShop;
}

const EditBrandModal: React.FC<EditShopProps> = ({
	state, shop: brand
}) => {
	const { updateShop: updateBrand } = useShops();
	const form = useForm({ values: { name: brand.name, image: null as FileList | null } });
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		const file = data.image?.[0] || null;
		await updateBrand(brand.name, data.name, file);
		close();
		form.reset();
	});
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Edit Brand</Title>
			<Label>
				Brand Name
				<Input placeholder="Brand Name" id="name" 
					options={{required: "Brand Name is required."}}/>
			</Label>
			<Label> Image </Label>
			<FileInput id="image" 
				accept="image/jpeg, image/png, image/webp"
				image imgsrc={brand.img_src}
				options={{
				validate: {
					isImage: (file) =>
					  !file?.[0] ||
					  file[0]?.type === "image/jpeg" ||
					  file[0]?.type === "image/png" ||
					  file[0]?.type === "image/webp" ||
					  "Please upload a .jpeg, .png or .webp file.",
					maxSize: (file) =>
					  !file?.[0] ||
					  file[0]?.size <= 10 * 1024 * 1024 ||
					  "File size exceeds the maximum allowed limit (10MB).",
				  },
				}}/>
			<CardRow>
				<SideButton onClick={close} color="gray">
					Cancel
				</SideButton>
				<SideButton onClick={handleSubmit} color="green">
					Save
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
		</BaseModal>
	);
}

export default EditBrandModal;