import React, { ReactNode, useEffect, useRef } from "react";
import { ToastContainer, ToastContainerProps, toast } from "react-toastify";
import { FormProvider, UseFormReturn } from "react-hook-form";

const FormContainer: React.FC<{
	form: UseFormReturn<any>, children: ReactNode
}> = ({ form, children }) => (
	<FormProvider {...form}>
		<form onSubmit={e=>e.preventDefault()} noValidate>
			{children}
		</form>
	</FormProvider>
)
const DefaultToastContainer: React.FC<ToastContainerProps> = (props) => (
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
		theme="dark"/>
)
const useFormError = (form: UseFormReturn<any>) => {
	const {
		submitCount,
		errors
	} = form.formState;
	const count = useRef(submitCount);
	useEffect(() => {
		if (count.current === submitCount) return;
		count.current = submitCount;
		for (const error in errors) {
			const message = errors[error]!.message?.toString();
			if (!message) continue;
			toast.error(message);
		}
	}, [submitCount, errors]);
	return toast;
};

const ErrorContainer: React.FC<ToastContainerProps & { form: UseFormReturn<any> }> = ({form, ...props}) => {
	useFormError(form);
	return <DefaultToastContainer {...props} />;
};

export {
	ErrorContainer,
	useFormError,
	DefaultToastContainer,
	FormContainer
}