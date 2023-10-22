import React, { ReactNode } from "react";
import { Card } from "../CardPage/CardPage";
import styles from "./modal.module.css";

export interface BaseModalProps {
	isOpen: boolean;
	onClose: () => void;
}
const BaseModal: React.FC<BaseModalProps & { children: ReactNode }> = ({ 
	children, isOpen, onClose
}) => {
	if (!isOpen) return null;
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
	}
	return (
		<div className={styles.modal_overlay} onClick={onClose}>
			<Card style={{display: 'relative'}} onClick={handleOverlayClick}>
				{children}
			</Card>
		</div>
	);
}

export default BaseModal;