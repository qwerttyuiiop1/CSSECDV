import React from "react";
import { 
	Card,
	Title,
	Input,
	Label,
	CardRow,
	SideButton
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { Report } from "@/lib/types/Transaction";

interface CreateReportModalProps extends BaseModalProps {
	code: string;
	productId: number;
	onCreate: (report: Report) => void;
}
export const CreateReportModal: React.FC<CreateReportModalProps> = ({
	state, code, productId, onCreate
}) => {
	const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		const res = await fetch(`/api/profile/report`, {
			method: "POST",
			body: JSON.stringify({ comment: data.comment, code, productId })
		});
		const json = await res.json();
		if (json.error) {
			toast.error(json.error);
			return;
		}
		toast.success("Report created");
		onCreate(json.report)
		close();
		form.reset();
	});
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Create Report</Title>
			<Label>
				Comment
				<Input placeholder="Comment" id="comment" 
					options={{required: "name is required"}}/>
			</Label>
			<CardRow>
				<SideButton onClick={close} color="gray">
					Cancel
				</SideButton>
				<SideButton onClick={handleSubmit} color="blue">
					Create
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
		</BaseModal>
	);
}

interface EditReportModalProps extends BaseModalProps {
	report: Report | null;
	onUpdate: (report: Report) => void;
}
export const EditReportModal: React.FC<EditReportModalProps> = ({
	state, report, onUpdate
}) => {
	const form = useForm({
		values: {
			comment: report?.comment
		}
	});
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		const res = await fetch(`/api/profile/report/${report?.id}`, {
			method: "POST",
			body: JSON.stringify(data)
		});
		const json = await res.json();
		if (json.error) {
			toast.error(json.error);
			return;
		}
		toast.success("Report updated");
		onUpdate(json.report)
		close();
		form.reset();
	});
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Edit Report</Title>
			<Label>
				Comment
				<Input placeholder="Comment" id="comment" 
					options={{required: "name is required"}}/>
			</Label>
			<CardRow>
				<SideButton onClick={close} color="gray">
					Cancel
				</SideButton>
				<SideButton onClick={handleSubmit} color="blue">
					Create
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
		</BaseModal>
	);
}