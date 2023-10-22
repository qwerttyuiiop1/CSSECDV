import React from "react";
import { 
	Title,
	Input,
	Label
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { FormProvider, useForm } from "react-hook-form";
import FormError from "@/components/Providers/FormError";

interface CreateBrandProps extends BaseModalProps {
	onSubmit: (name: string) => void;
}

const CreateBrandModal: React.FC<CreateBrandProps> = ({
	isOpen, onClose, onSubmit
}) => {
	const form = useForm();
	const handleSubmit = form.handleSubmit((data) => {
		onSubmit(data.name);
		onClose();
	});
	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<FormProvider {...form}>
				<Title>Create Brand</Title>
				<Label>
					Brand Name
					<Input placeholder="Brand Name" id="name" />
				</Label>
			</FormProvider>
			<FormError form={form}/>
		</BaseModal>
	);
}

export default CreateBrandModal;