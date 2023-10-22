import React, { useEffect } from "react";
import { ToastContainer, ToastContainerProps, toast } from "react-toastify";
import { UseFormReturn } from "react-hook-form";

const Toast: React.FC<ToastContainerProps & React.RefAttributes<HTMLDivElement> & { form: UseFormReturn<any> }> = ({form, ...props}) => {

	const formState = form.formState;
	useEffect(() => {
		if (formState.isSubmitting) return;
		const errors = formState.errors;
		if (errors == null) return;
		for (const error in errors) {
			const message = errors[error]?.message?.toString();
			if (!message) continue;
			toast.error(message);
		}
	}, [formState.isSubmitting, formState.errors]);
	return (
		<ToastContainer
			{...props}
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			draggable
			pauseOnHover
			theme="dark"
		/>
	);
}

export default Toast;