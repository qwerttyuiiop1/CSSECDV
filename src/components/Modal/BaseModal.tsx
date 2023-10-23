import React, { ReactNode } from "react";
import styles from "./modal.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOptions } from "../Animations/Animations";


export const modalHandler = ([_, b]: [boolean, (a:boolean)=>void]) => { 
	return (e: React.MouseEvent<Element, MouseEvent>) => {
		e.stopPropagation();
		b(true);
	}
}
export interface BaseModalProps {
	state: [boolean, (open: boolean) => void];
}
const BaseModal: React.FC<BaseModalProps & { children: ReactNode }> = ({ 
	children, state
}) => {
	return (
		<AnimatePresence>
			{state[0] && <motion.div {...fadeInOptions}
				className={styles.modal_overlay}
				onClick={()=>state[1](false)}>
				<div style={{display: 'relative'}} onClick={(e)=>e.stopPropagation()}>
					{children}
				</div>
			</motion.div>}
		</AnimatePresence>
	);
}

export default BaseModal;